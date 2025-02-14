import React, { useEffect, useState } from "react";
import { Get } from "./api/REST";
import { Lilita } from ".";
import Header from "./api/Header";
import { useDispatch, useSelector } from "react-redux";
import { HandleInput, OnClose, RootState } from "./api/Redux/MainSlice";
import { useRouter } from "next/router";

interface User {
  profileimage?: string; 
  name: string;
  email: string;
}

const Profile = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const Dataemail = useSelector((state: RootState) => state.MainR.email);

  const handleLogout = () => {
    dispatch(HandleInput({ email: "", password: "" }));
    localStorage.removeItem("user");
    router.push("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Get();
        if (res && Array.isArray(res.items)) {
          setUsers(res.items as User[]);
        } else {
          console.warn("No users found or invalid response format");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    dispatch(OnClose()); 
    fetchData();
  }, [dispatch]);

  const userProfile = users.find((user) => user.email === Dataemail);

  return (
    <>
      <Header />
      <div
        className="bg-lime-200 w-full h-screen flex flex-col items-center justify-center p-10 mt-10 min-h-screen"
        style={{ fontFamily: Lilita.style.fontFamily }}
      >
        {loading ? (
          <p className="text-gray-600 text-lg">Loading user profile...</p>
        ) : userProfile ? (
          <div className="bg-white p-10 rounded-lg shadow-md w-auto flex flex-col items-center justify-center">
            <div className="relative">
              <button
                className="absolute p-2 text-sm bg-red-600 -top-7 left-20 rounded-sm active:bg-red-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            <h1 className="text-purple-600 text-4xl mb-6 mt-5">Your Profile</h1>

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
      </div>
    </>
  );
};

export default Profile;
