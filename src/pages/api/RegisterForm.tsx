"use client";
import React, { useRef, useState } from "react";
import { Lilita } from "..";
import { motion } from "framer-motion";
import { Get, Post } from "./REST";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { HandleInput } from "./Redux/MainSlice";

interface RegisterFormProps {
  isOpen: boolean;
  onChange: () => void;
}

interface UserType {
  name: string;
  email: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ isOpen, onChange }) => {
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useDispatch();

  const navigate = useRouter();
  const Name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "MyPreset");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${Name}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setImageUrl(data.secure_url);
        } else {
          console.error("Failed to upload image.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  if (!isOpen) return null;

  const validateForm = () => {
    if (isOpen === true) {
      const newErrors: { [key: string]: string } = {};
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!username.current?.value) newErrors.username = "Username is required";
      if (!email.current?.value) {
        newErrors.email = "Email is required";
      } else if (!emailPattern.test(email.current.value)) {
        newErrors.email = "Invalid email format";
      }
      if (!password.current?.value) newErrors.password = "Password is required";
      if (!confirmPassword.current?.value) {
        newErrors.confirmPassword = "Confirm password is required";
      } else if (password.current?.value !== confirmPassword.current?.value) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    } else {
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    const response = await Get();
    const users: UserType[] = response.items || [];

    const ValidateEmail = users.find((user) => user.email === email.current?.value);
    const ValidateName = users.find((user) => user.email === email.current?.value);

    const action = async () => {
      const data = {
        name: username.current?.value!,
        email: email.current?.value!,
        password: password.current?.value!,
        profileimage: imageUrl,
      };
      try {
        const response = await Post([data]);
        if (response.success) {
          alert("Registration successful!");
          onChange();
        } else {
          console.error("Registration failed:", response.error);
        }
      } catch (error) {
        console.error("Submission failed:", error);
        alert("Something went wrong. Please try again.");
      }
    
      dispatch(HandleInput({ email: data.email, password: data.password }));
      
      navigate.push("/feed");
    }

    if (!ValidateEmail && !ValidateName) {
      return action();
    }

    if (ValidateEmail) {
      alert("That email is already registered");
    }

    if (ValidateName) {
      alert("Name is already taken");
    }

    return null;

  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-lime-500 p-10 py-16 rounded-xl w-96 shadow-xl relative"
        style={{ fontFamily: Lilita.style.fontFamily }}
      >
        <button
          className="absolute top-2 right-3 text-xl font-bold cursor-pointer text-gray-700 hover:text-gray-900"
          onClick={onChange}
        >
          &times;
        </button>
        <h1 className="text-3xl text-center mb-4">Register</h1>
        <div className="flex flex-col gap-4">
          <label className="text-sm">Your username</label>
          <input
            type="text"
            ref={username}
            placeholder="Input Username"
            className={`p-3 rounded-xl bg-purple-600 text-lime-500 focus:outline-none transition-transform focus:ring-2 ${
              errors.username
                ? "border-2 border-red-500"
                : "focus:ring-lime-300"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}

          <label className="text-sm">Your e-mail</label>
          <input
            type="text"
            ref={email}
            placeholder="Input e-mail"
            className={`p-3 rounded-xl bg-purple-600 text-lime-500 focus:outline-none transition-transform focus:ring-2 ${
              errors.email ? "border-2 border-red-500" : "focus:ring-lime-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <label className="text-sm">Set your password</label>
          <input
            type="password"
            ref={password}
            placeholder="Input password"
            className={`p-3 rounded-xl bg-purple-600 text-lime-500 tracking-widest focus:outline-none transition-transform focus:ring-2 ${
              errors.password
                ? "border-2 border-red-500"
                : "focus:ring-lime-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <label className="text-sm">Confirm password</label>
          <input
            type="password"
            ref={confirmPassword}
            placeholder="Verify password"
            className={`p-3 rounded-xl bg-purple-600 text-lime-500 tracking-widest focus:outline-none transition-transform focus:ring-2 ${
              errors.confirmPassword
                ? "border-2 border-red-500"
                : "focus:ring-lime-300"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}

          <label className="text-sm">Your profile image <small className="text-gray-700">optional</small></label>
          <input type="file" onChange={handleImageChange} />
          <button
            className="bg-purple-600 px-6 text-lime-500 p-3 rounded-xl transition-all hover:bg-purple-500 mt-5"
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
