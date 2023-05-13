import React from "react";

export const Banner = ({ imageSrc, caption }) => {
  return (
    <div className="relative">
      <img
        src={imageSrc}
        alt="Crowdfunding banner"
        className="object-cover h-[30vh] w-full"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">{caption}</h1>
        </div>
      </div>
    </div>
  );
};
