"use client";
import ActionBar from "@/components/ui/ActionBar";
import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";
import {
  useDeleteServiceMutation,
  useServicesQuery,
} from "@/redux/slices/services/serviceApi";
import { format } from "timeago.js";
import { PiPencilSimpleThin } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";
const ServiceList = () => {
  //@ts-ignore
  const { data: serviceData } = useServicesQuery();
  console.log(serviceData);
  const [deleteService] = useDeleteServiceMutation();
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
        const res = await deleteService(item.id);
        //@ts-ignore
        if (res?.data?.name) {
          Swal.fire("Deleted!", "Service has been deleted.", "success");
        }
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred while deleting the item.");
    }
  };

  //!
  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "propertyName", headerName: "Property", flex: 0.5 },
    { field: "category", headerName: "Category", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "thumbnail",
      headerName: "Thumbnail",
      flex: 0.3,
      renderCell: (params: any) => (
        <Avatar alt={params.row.category} src={params.row.thumbnail.url} />
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
          <Link href={`/admin/service/edit/${params.id}`}>
            <PiPencilSimpleThin className=" text-black" size={20} />
          </Link>
        );
      },
    },
  ];
  //!
  //!
  const rows: any[] = [];
  if (serviceData) {
    serviceData?.services?.forEach((item: any) => {
      rows.push({
        id: item.id,
        propertyName: item?.propertyName,
        category: item?.category?.category,
        thumbnail: item.thumbnail,
        created_at: format(item.createdAt),
      });
    });
  }
  //!
  return (
    <div>
      <ActionBar title="Service List">
        <input
          type="text"
          placeholder="Search..."
          className={`w-[150px] text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins`}
        />
        <div>
          <Link href="/admin/service/create">
            <Button variant="contained" endIcon={<SendIcon />}>
              Create Service
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

export default ServiceList;
