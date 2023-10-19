"use client";
import ActionBar from "@/components/ui/ActionBar";
import Link from "next/link";
import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { format } from "timeago.js";
import Avatar from "@mui/material/Avatar";
import { AiOutlineDelete } from "react-icons/ai";
import { useFaqsQuery } from "@/redux/slices/blog/blogApi";
const FaqList = () => {
  const { data: faqData } = useFaqsQuery({});

  //!
  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "question", headerName: "Question", flex: 0.5 },
    { field: "answer", headerName: "Answer", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
  ];
  //!
  //!
  const rows: any[] = [];
  if (faqData) {
    //@ts-ignore
    faqData?.forEach((item: any) => {
      rows.push({
        id: item._id,
        question: item.question,
        answer: item.answer,

        created_at: format(item.createdAt),
      });
    });
  }
  //!
  return (
    <div>
      <ActionBar title="Faq List">
        <input
          type="text"
          placeholder="Search..."
          className={`w-[150px] text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins`}
        />
        <div>
          <Link href="/admin/faq/create">
            <Button variant="contained" endIcon={<SendIcon />}>
              Create Faq
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

export default FaqList;
