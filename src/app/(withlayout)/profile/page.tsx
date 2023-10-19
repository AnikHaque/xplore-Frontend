"use client";

import UserProfile from "@/components/Profile/Profile";
import { useLoadUserQuery } from "@/redux/slices/user/userApi";

import { getUserInfo } from "@/services/auth.service";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const user = getUserInfo() as any;

  const { data } = useLoadUserQuery(user.userId);

  return (
    <div className="w-full h-full bg-transparent mt-[80px]">
      {/* <ProfileInfo user={user} avatar={avatar} /> */}
      <UserProfile user={data} avatar={avatar} />
    </div>
  );
};

export default Profile;
