import { CircleBackground } from "components/CircleBackground";
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
      <div className="fixed -z-10 top-44 left-1/2 -translate-x-1/2 w-100">
        <img src="/assets/background.png" alt="" className="w-100 opacity-70" />
      </div>
      <div className="fixed -z-10 top-32 left-1/2 -translate-x-1/2 w-100">
        <CircleBackground  color="white" className="circle_animation -z-10 w-[700px] h-[700px]" />
      </div>

      <div className="fixed top-[20%] left-[50%] -z-20  rounded-full h-[1400px] w-[1200px] bg-[#260a2c5b] blur-3xl"></div>
      <div className="fixed -top-[55%] -left-[60%] translate-y-[20%]  -z-10  rounded-full h-[1400px] w-[1400px] bg-[#0d213141] blur-3xl"></div>
    </div>
  );
}
