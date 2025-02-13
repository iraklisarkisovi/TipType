import React, { useRef, useState, useEffect } from "react";
import { Lilita } from "..";
import { motion } from "framer-motion";
import { Get } from "./REST";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { HandleInput, OnClose, RootState } from "./Redux/MainSlice";

interface UserType {
  email: string;
  password: string;
}

type proptypes = {
  onChange: () => void;
};

const Login: React.FC<proptypes> = ({ onChange }) => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.MainR.closer);
  const Route = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const HandleLogin = async () => {
    if (!email.current?.value || !password.current?.value) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      const response = await Get();
      const users: UserType[] = response.items || []; 

      const foundUser = users.find(
        (user) => user.email === email.current!.value
      );

      if (!foundUser) {
        setErrorMessage("User not found!");
        return;
      }

      if (foundUser.password !== password.current!.value) {
        setErrorMessage("Incorrect password!");
        return;
      }

      console.log("Login Successful!", foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      setErrorMessage("");

      Route.push("/feed");

      dispatch(
        HandleInput({
          email: email.current!.value,
          password: password.current!.value,
        })
      );
       
    } catch (error) {
      console.error("Error fetching users:", error);
      setErrorMessage("An error occurred during login.");
    }
  };

  if (!isHydrated || !isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-lime-500 p-10 py-16 rounded-xl w-96 shadow-xl relative"
        style={{ fontFamily: Lilita.style.fontFamily }}
      >
        <button
          className="absolute top-2 right-3 text-xl font-bold cursor-pointer text-gray-700 hover:text-gray-900"
          onClick={() => dispatch(OnClose())}
        >
          &times;
        </button>
        <h1 className="text-3xl text-center mb-4">Login</h1>
        <div className="flex flex-col gap-4">
          <label className="text-sm">Your e-mail</label>
          <input
            type="text"
            ref={email}
            placeholder="Input e-mail"
            className="p-3 rounded-xl bg-purple-600 text-lime-500 focus:outline-none transition-transform focus:ring-2"
          />

          <label className="text-sm">Password</label>
          <input
            type="password"
            ref={password}
            placeholder="Input password"
            className="p-3 rounded-xl bg-purple-600 text-lime-500 tracking-widest focus:outline-none transition-transform focus:ring-2"
          />

          {errorMessage && (
            <p className="text-red-600 text-sm font-bold">{errorMessage}</p>
          )}

          <button className="text-sm text-purple-600" onClick={onChange}>
            Register
          </button>

          <button
            className="bg-purple-600 px-6 text-lime-500 p-3 rounded-xl transition-all hover:bg-purple-500"
            onClick={HandleLogin}
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
