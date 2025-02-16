import React, { useEffect, useState } from "react";
import { Get, getTip } from "./api/REST";
import { Lilita, fredoka } from ".";
import Header from "./api/Header";
import { useDispatch, useSelector } from "react-redux";
import { HandleInput, OnClose, RootState } from "./api/Redux/MainSlice";
import { useRouter } from "next/router";
import { div, h1 } from "framer-motion/client";
import Link from "next/link";

interface User {
  profileimage?: string; 
  name: string;
  email: string;
}

interface tiptype {
  type: string;
  tip: string;
  by: string;
}

const Profile = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [tip, setTip] = useState<tiptype[]>([])
  const [loading, setLoading] = useState(true);
 

  const dispatch = useDispatch();
  const router = useRouter();

  const Dataemail = useSelector((state: RootState) => state.MainR.email);

  const [tipLoading, setTipLoading] = useState(true);

  const handleLogout = () => {
    dispatch(HandleInput({ email: "", password: "" }));
    localStorage.removeItem("user");
    router.push("/");
  };

  useEffect(() => {
    const fetchTip = async () => {
      try {
        const tipres = await getTip();
        console.log("Tip Response:", tipres);  
        setTip(tipres.items as tiptype[]);
      } catch (error) {
        console.error("Error fetching tips:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchData = async () => {
      try {
        setTipLoading(false);

        const res = await Get();
        if (res && Array.isArray(res.items)) {
          setUsers(res.items as User[]);
        } else {
          console.warn("No users found or invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    dispatch(OnClose());
    fetchData();
    fetchTip();
  }, [dispatch]);


  const userProfile = users.find((user) => user.email === Dataemail);
  const userTips = Array.isArray(tip)
    ? tip.filter((tip) => tip.by === userProfile?.email)
    : null;


  console.log(userTips );
  return (
    <>
      <Header />
      <div
        className="bg-lime-200 w-full h-full flex flex-col items-center justify-center p-10 mt-10 min-h-screen"
        style={{ fontFamily: Lilita.style.fontFamily }}
      >
        <div className="max-w-4xl px-4 mt-60 mb-10">
          {loading || tipLoading ? (
            <p className="text-gray-600 text-lg">Loading user profile...</p>
          ) : (
            <>
              {userProfile ? (
                <div className="bg-white p-10 rounded-lg shadow-md w-auto flex flex-col items-center justify-center">
                  <div className="relative">
                    <button
                      className="absolute p-2 text-sm bg-red-600 -top-7 left-20 rounded-sm active:bg-red-500"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                  <h1 className="text-purple-600 text-4xl mb-6 mt-5">
                    Your Profile
                  </h1>

                  <img
                    src={
                      userProfile.profileimage ||
                      "https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png"
                    }
                    alt={userProfile.name || "User profile image"}
                    className="rounded-full mb-5 w-48 h-48 object-cover"
                  />
                  <h2 className="text-xl text-gray-500 font-bold">
                    {userProfile.name}
                  </h2>
                  <p className="text-gray-600">{userProfile.email}</p>
                </div>
              ) : (
                <p className="text-gray-600 text-lg">
                  No user profile found. Please check your email or log in again.
                </p>
              )}

              {userTips ? (
                <div
                  className="flex flex-col items-center justify-center mt-10 gap-5"
                  style={{ fontFamily: fredoka.style.fontFamily }}
                >
                  {userTips.map((tip, index) => (
                    <div
                      key={index}
                      className="w-full hb-auto bg-purple-700 p-6 rounded-xl shadow-md transition-transform transform hover:scale-105"
                    >
                        <div className="flex flex-row items-start justify-start gap-5 cursor-pointer">
                          <img
                            src={
                              userProfile?.profileimage ||
                              "https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png"
                            }
                            alt="profileimage"
                            className="rounded-full mb-5 w-10 h-10 object-cover"
                          />
                          <h1 className="text-xl font-thin">
                            {userProfile?.name || "Unknown author"}
                          </h1>
                        </div>

                      <h1 className="text-3xl font-thin text-white">
                        {tip.type}
                      </h1>
                      <p className="text-lg text-gray-300 mt-3">{tip.tip}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        By: {userProfile?.name || "Unknown author"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-lg mt-32">
                  You have no tips posted. Click{" "}
                  <Link href={"/addtip"} className="text-purple-500 underline">
                    +
                  </Link>{" "}
                  to add one.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
