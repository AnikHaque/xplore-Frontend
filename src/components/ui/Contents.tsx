"use client";
import { Layout } from "antd";
import Header from "./DashboardHeader";

const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content
      style={{
        minHeight: "100vh",
        color: "black",
      }}
    >
      <Header />

      <div className="bg-gradient-to-r from-[#141155] to-[#050522] text-white   p-[10px] h-screen">
        {children}
      </div>
    </Content>
  );
};

export default Contents;
