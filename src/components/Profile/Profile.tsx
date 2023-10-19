/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import avatarIcon from "../../../public/assets/user.png";
type Props = {
  avatar: any;
  user: any;
};
const UserProfile = ({ user, avatar }: Props) => {
  return (
    <div className="max-w-md mx-auto p-6  rounded-lg shadow-lg border hover:shadow-xl">
      <div className="text-center">
        <img
          src={
            user?.avatar || avatar ? user?.avatar?.url || avatar : avatarIcon
          }
          alt="Profile Picture"
          className="w-full h-[300px] mx-auto mb-4 object-cover"
        />
        <h2 className="text-3xl font-semibold text-gray-100">{user?.name}</h2>
        <p className="text-gray-100 text-lg">Role: {user?.role}</p>
      </div>
      <div className="mt-4 text-center ">
        <p className="text-gray-100">Hey dear {user?.name} ! Welcome back</p>
      </div>
      <div className="mt-4">
        <Link
          href={`/profile/update/${user?._id}`}
          className="text-blue-500 hover:underline"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
