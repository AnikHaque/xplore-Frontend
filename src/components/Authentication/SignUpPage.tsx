"use client";
import { useUserCreateMutation } from "@/redux/slices/user/userApi";
import { Spin, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

function SignUpPage() {
  const router = useRouter();
  const { register, handleSubmit, errors }: any = useForm();
  const [userCreate, { isLoading, error, isSuccess }] = useUserCreateMutation();

  useEffect(() => {
    if (isSuccess) {
      message.success("Register Successfully!");
      router.push("/login");
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
  }, [error, isSuccess, router]);
  const onSubmit = async (data: any) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    const res = await userCreate(userData);
  };

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="bg-white shadow-md rounded w-full max-w-md p-8">
        <h2 className="text-2xl text-gray-800 font-bold mb-4">Sign Up</h2>
        {/* Name */}
        <div className="mb-4 relative">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="name"
          >
            User Name
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2">
              <FaUser className="text-gray-600" />
            </span>
            <input
              className={`shadow appearance-none border rounded pl-10 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors?.name ? "border-red-500" : ""
              }`}
              type="text"
              placeholder="Username"
              id="name"
              {...register("name", { required: "name is required" })}
            />
            {errors?.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors?.name.message}
              </p>
            )}
          </div>
        </div>
        {/* Name */}
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
              {errors?.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.email.message}
                </p>
              )}
            </div>
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
              {errors?.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="mb-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              {isLoading ? <Spin size="small" /> : "Sign Up"}
            </button>
          </div>
        </form>
        <p className="text-gray-600 text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" passHref>
            <span className="text-blue-500 hover:underline">Log In</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
