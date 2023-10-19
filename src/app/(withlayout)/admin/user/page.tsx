"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import ActionBar from "@/components/ui/ActionBar";
import Link from "next/link";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { AiOutlineDelete } from "react-icons/ai";
import { PiPencilSimpleThin } from "react-icons/pi";
import {
  useDeleteUserMutation,
  useUsersQuery,
} from "@/redux/slices/user/userApi";
import Swal from "sweetalert2";
import { format } from "timeago.js";
//!

//!
const UserList = () => {
  //@ts-ignore
  const { data: usersData } = useUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  //!
  const handleDelete = async (item: any) => {
    try {
      const result = await Swal.fire({
        title: "Delete Item",
        text: "Are you sure you want to delete this account?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      });

      if (result.isConfirmed) {
        const res = await deleteUser(item.id);
        //@ts-ignore
        if (res?.data?.name) {
          Swal.fire("Deleted!", "User has been deleted.", "success");
        }
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred while deleting the item.");
    }
  };

  //!
  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },

    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button onClick={() => handleDelete(params)}>
            <AiOutlineDelete className=" text-black" size={20} />
          </Button>
        );
      },
    },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Link href={`/admin/user/edit/${params.id}`}>
            <PiPencilSimpleThin className=" text-black" size={20} />
          </Link>
        );
      },
    },
  ];
  //!
  //!
  const rows: any[] = [];
  if (usersData) {
    const newData =
      usersData &&
      usersData?.users?.filter((item: any) => item.role === "user");
    newData &&
      newData?.forEach((item: any) => {
        rows.push({
          id: item.id,
          name: item.name,
          email: item.email,
          role: item.role,

          created_at: format(item.createdAt),
        });
      });
  }
  //!

  return (
    <div>
      <ActionBar title="User List">
        <input
          type="text"
          placeholder="Search..."
          className={`w-[150px] text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins`}
        />
        <div>
          <Link href="/admin/user/create">
            <Button variant="contained" endIcon={<SendIcon />}>
              Create User
            </Button>
          </Link>
        </div>
      </ActionBar>
      <div className="bg-white" style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default UserList;
