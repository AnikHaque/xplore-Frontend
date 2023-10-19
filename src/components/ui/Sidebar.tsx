"use client";

import { useState } from "react";
import { Layout, Menu } from "antd";
import Logo from "../../../public/assets/logo.png";
import { sidebarItems } from "@/constants/sidebarItems";
import { USER_ROLE } from "@/constants/role";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import Image from "next/image";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { role } = getUserInfo() as any;
  // console.log(role);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: ".5rem",
          padding: "10px 0px",
          display: "flex",
          flexDirection: "column", // Align children vertically
          alignItems: "center", // Center horizontally
          justifyContent: "center",
        }}
      >
        <Link href={"/"}>
          <Image
            src={Logo}
            width={45}
            height={45}
            className="w-[45px] h-[45px] rounded-full cursor-pointer"
            alt="Hotel Haven"
          />
        </Link>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems(role)}
      />
    </Sider>
  );
};

export default SideBar;
