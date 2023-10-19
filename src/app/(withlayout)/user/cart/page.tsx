"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import ActionBar from "@/components/ui/ActionBar";
import Button from "@mui/material/Button";
import { FcCancel } from "react-icons/fc";
import Swal from "sweetalert2";
import { format } from "timeago.js";
import {
  useGetMyCartQuery,
  useRemoveFromCartMutation,
} from "@/redux/slices/services/serviceApi";

//!
const BookingList = () => {
  //@ts-ignore
  const { data: cartData } = useGetMyCartQuery({});

  const [removeFromCart] = useRemoveFromCartMutation();
  //!
  const handleDelete = async (item: any) => {
    try {
      const result = await Swal.fire({
        title: "Delete Item",
        text: "Are you sure you want to delete cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      });

      if (result.isConfirmed) {
        const res = await removeFromCart(item.id);

        //@ts-ignore
        if (res?.data?._id) {
          Swal.fire("Deleted!", "Cart has been deleted.", "success");
        }
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred while deleting the item.");
    }
  };

  //!
  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "User Name", flex: 0.5 },
    { field: "serviceName", headerName: "Service Name", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },

    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button onClick={() => handleDelete(params)}>
            <FcCancel size={20} />
          </Button>
        );
      },
    },
  ];
  //!
  //!
  const rows: any[] = [];
  if (cartData) {
    //@ts-ignore
    cartData?.forEach((item: any) => {
      rows.push({
        id: item.id,
        userName: item.user.name,
        serviceName: item.service.propertyName,
        created_at: format(item.createdAt),
      });
    });
  }
  //!

  return (
    <div>
      <ActionBar title="Cart List">
        <input
          type="text"
          placeholder="Search..."
          className={`w-[150px] text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins`}
        />
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

export default BookingList;
