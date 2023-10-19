"use client";
import ActionBar from "@/components/ui/ActionBar";
import Link from "next/link";
import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import BookingBreadCrumb from "@/components/ui/BreadCrumb";
const Pages = () => {
  return (
    <div>
      {/* <BookingBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
        ]}
      /> */}
      <ActionBar title="User List">
        <input
          type="text"
          placeholder="Search..."
          className={`w-[150px] text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins`}
        />
        <div>
          <Link href="/super_admin/admin/create">
            <Button variant="contained" endIcon={<SendIcon />}>
              Create User
            </Button>
          </Link>
        </div>
      </ActionBar>
    </div>
  );
};

export default Pages;
