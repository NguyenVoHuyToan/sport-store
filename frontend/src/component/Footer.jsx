import React from "react";
import FeaturedProducts from "./FeaturedProducts";

const Footer = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-around">
      <FeaturedProducts/>
      <div className="bg-gray-800 text-white py-4 w-full">Footer</div>
    </div>
  );
};

export default Footer;
