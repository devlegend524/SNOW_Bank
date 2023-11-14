import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function index({ children }) {
  return (
    <div>
      <Header />
      <div className="flex w-full justify-center items-center min-h-[calc(100vh-70px)] pb-[100px] relative px-1">
        {children}
        <Footer />
      </div>
      <div className="fixed top-[20%] left-[50%] -z-10  rounded-full h-[1400px] w-[1200px] bg-[#260a2c5b] blur-3xl"></div>
      <div className="fixed -top-[55%] -left-[60%] translate-y-[20%]  -z-10  rounded-full h-[1400px] w-[1400px] bg-[#0d213141] blur-3xl"></div>
    </div>
  );
}
