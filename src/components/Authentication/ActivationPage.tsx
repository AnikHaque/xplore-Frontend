"use client";
import Link from "next/link";
import React from "react";
import { VscWorkspaceTrusted } from "react-icons/vsc";

const ActivationPage = () => {
  return (
    <div className="text-center p-8">
      <h1 className="text-2xl font-bold">Verify Your Account</h1>
      <div className="w-full flex items-center justify-center mt-4">
        <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center">
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center space-x-4">
        <input
          type="number"
          className="w-14 h-14 bg-transparent border-4 rounded-full text-white text-[30px] font-semibold text-center border-[#0000004a]"
          placeholder=""
          maxLength={1}
        />
        <input
          type="number"
          className="w-14 h-14 bg-transparent border-4 rounded-full text-white text-[30px] font-semibold text-center border-[#0000004a]"
          placeholder=""
          maxLength={1}
        />
        <input
          type="number"
          className="w-14 h-14 bg-transparent border-4 rounded-full text-white text-[30px] font-semibold text-center border-[#0000004a]"
          placeholder=""
          maxLength={1}
        />
        <input
          type="number"
          className="w-14 h-14 bg-transparent border-4 rounded-full text-white text-[30px] font-semibold text-center border-[#0000004a]"
          placeholder=""
          maxLength={1}
        />
      </div>
      <div className="mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Verify OTP
        </button>
      </div>
      <div className="text-sm text-black dark:text-white mt-4">
        Go back to sign in?{" "}
        <span className="text-blue-500 cursor-pointer">
          <Link href={"/login"}>Sign in</Link>
        </span>
      </div>
    </div>
  );
};

export default ActivationPage;
