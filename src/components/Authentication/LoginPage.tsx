/* eslint-disable react/no-unescaped-entities */
"use client";
import { useUserLoginMutation } from "@/redux/slices/user/userApi";
import { storeUserInfo } from "@/services/auth.service";
import { Spin, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";

function LoginPage() {
  const { register, handleSubmit, errors }: any = useForm();
  const [userLogin, { isLoading, data, isSuccess, error }] =
    useUserLoginMutation();

  const router = useRouter();
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        message.success("Login Successfully!");
        storeUserInfo({ accessToken: data?.accessToken });
        router.push("/profile");
      }
    }

    if (error) {
      //@ts-ignore
      if ("data" in error) {
        const errorData = error as any;
        message.error(errorData.data.message);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [data, error, isSuccess, router]);
  const onSubmit = async (data: any) => {
    try {
      const res = await userLogin({ ...data });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl text-gray-800 font-bold mb-4">Log In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2">
                <FaEnvelope className="text-gray-600" />
              </span>
              <input
                className={`shadow appearance-none border rounded pl-10 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors?.email ? "border-red-500" : ""
                }`}
                type="text"
                placeholder="Email"
                id="email"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors?.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors?.email.message}
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2">
                <FaLock className="text-gray-600" />
              </span>
              <input
                className={`shadow appearance-none border rounded pl-10 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors?.password ? "border-red-500" : ""
                }`}
                type="password"
                placeholder="Password"
                id="password"
                {...register("password", { required: "Password is required" })}
              />
            </div>
            {errors?.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors?.password.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              {isLoading ? <Spin size="small" /> : "Log In"}
            </button>
          </div>
        </form>
        <p className="text-gray-600 text-sm text-center">
          Don't have an account?{" "}
          <Link href="/signup" passHref>
            <span className="text-blue-500 hover:underline">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
