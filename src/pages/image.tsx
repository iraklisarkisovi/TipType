"use client";

import React, { useState } from "react";

const UploadToCloudinary = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "MyPreset");  

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dmoyrrngf/image/upload`,
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

  return (
    <div className="flex flex-col items-center">
      <input type="file" onChange={handleImageChange} />
      {imageUrl && (
        <div className="mt-4">
          <p>Uploaded Image:</p>
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-48 h-48 object-cover rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
};

export default UploadToCloudinary;
