"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import ActionBar from "@/components/ui/ActionBar";
import Link from "next/link";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { AiOutlineDelete } from "react-icons/ai";
import { PiPencilSimpleThin } from "react-icons/pi";

import Swal from "sweetalert2";
import { format } from "timeago.js";
import Avatar from "@mui/material/Avatar";

import {
  useBlogsQuery,
  useDeleteBlogMutation,
} from "@/redux/slices/blog/blogApi";
//!

//!
const BlogList = () => {
  //@ts-ignore
  const { data: blogData } = useBlogsQuery({});

  const [deleteBlog] = useDeleteBlogMutation();
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
        const res = await deleteBlog(item.id);
        //@ts-ignore
        if (res?.data?.title) {
          Swal.fire("Deleted!", "Blog has been deleted.", "success");
        }
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred while deleting the item.");
    }
  };

  //!
  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "title", headerName: "Title", flex: 0.5 },
    { field: "description", headerName: "Description", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "avatar",
      headerName: "Image",
      flex: 0.3,
      renderCell: (params: any) => (
        <Avatar alt={params.row.title} src={params.row.avatar.url} />
      ),
    },

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
          <Link href={`/admin/blog/edit/${params.id}`}>
            <PiPencilSimpleThin className=" text-black" size={20} />
          </Link>
        );
      },
    },
  ];
  //!
  //!
  const rows: any[] = [];
  if (blogData) {
    //@ts-ignore
    blogData?.blogs?.data?.forEach((item: any) => {
      rows.push({
        id: item.id,
        title: item.title,
        description: item.description,
        avatar: item.avatar,
        created_at: format(item.createdAt),
      });
    });
  }
  //!

  return (
    <div>
      <ActionBar title="Blog List">
        <input
          type="text"
          placeholder="Search..."
          className={`w-[150px] text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins`}
        />
        <div>
          <Link href="/admin/blog/create">
            <Button
              className="bg-[#1976D2] "
              variant="contained"
              endIcon={<SendIcon />}
            >
              Create Blog
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

export default BlogList;
