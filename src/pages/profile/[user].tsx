import React, { useEffect, useState } from "react";
import { Get } from "../api/REST";
import { HandleInput, OnClose, RootState } from "../api/Redux/MainSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Header from "../api/Header";
import { Lilita } from "..";
 

interface UserType {
  profileimage?: string;
  name: string;
  email: string;
}

const User = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = router.query;

  const Dataemail = useSelector((state: RootState) => state.MainR.email);

  const handleLogout = () => {
    dispatch(HandleInput({ email: "", password: "" }));
    localStorage.removeItem("user");
    router.push("/");
  };

  useEffect(() => {
    if (!router.isReady) return;

    const fetchData = async () => {
      try {
        const res = await Get();
        if (res && Array.isArray(res.items)) {
          setUsers(res.items as UserType[]);
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
  }, [dispatch, router.isReady]);

  const userProfile = users.find((u) => u.name === user);

  return (
    <>
      <Header />
      <div
        className="bg-lime-200 w-full h-screen flex flex-col items-center justify-center p-10 mt-10 min-h-screen"
        style={{ fontFamily: Lilita.style.fontFamily }}
      >
        {loading ? (
          <p className="text-gray-600 text-lg">Loading {user} profile...</p>
        ) : userProfile ? (
          <div className="bg-white p-10 rounded-lg shadow-md w-auto flex flex-col items-center justify-center">
            <div className="relative">
            </div>
            <h1 className="text-purple-600 text-4xl mb-6 mt-5">
              {user}`s Profile
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
      </div>
    </>
  );
};

export default User;
