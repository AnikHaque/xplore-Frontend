// import React, { FC, useEffect, useState } from "react";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { Box } from "@mui/material";
// import { useTheme } from "next-themes";
// import { format } from "timeago.js";

// import { AiOutlineMail } from "react-icons/ai";
// import { useServicesQuery } from "@/redux/slices/services/serviceApi";
// import { useLoadUserQuery } from "@/redux/slices/user/userApi";

// type Props = { isDashboard?: boolean };

// const AllInvoices: FC<Props> = ({ isDashboard }) => {
//   const { theme, setTheme } = useTheme();
//   //   const { isLoading, data } = use({}); //! all Booking query

//   const { data: usersData } = useLoadUserQuery({});
//   //   console.log(usersData?.data, "usersData");
//   const { data: coursesData } = useServicesQuery({});
//   //   console.log(coursesData?.data, "coursesData");
//   const [orderData, setOrderData] = useState<any>([]);

//   useEffect(() => {
//     if (data) {
//       const temp = data?.data?.map((item: any) => {
//         const user = usersData?.data?.find(
//           (user: any) => user._id === item.userId
//         );
//         const course = coursesData?.data?.find(
//           (course: any) => course._id === item.courseId
//         );

//         return {
//           ...item,
//           userName: user?.name,
//           userEmail: user?.email,
//           title: course?.name,
//           price: "$" + course?.price,
//         };
//       });
//       setOrderData(temp);
//     }
//   }, [data, usersData, coursesData]);
//   //!
//   const columns: any = [
//     { field: "id", headerName: "ID", flex: 0.3 },
//     { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
//     ...(isDashboard
//       ? []
//       : [
//           { field: "userEmail", headerName: "Email", flex: 1 },
//           { field: "title", headerName: "Course Title", flex: 1 },
//         ]),
//     { field: "price", headerName: "Price", flex: 0.5 },
//     ...(isDashboard
//       ? [
//           {
//             field: "created_at",
//             headerName: "Created At",
//             flex: 0.5,
//           },
//         ]
//       : [
//           {
//             field: " ",
//             headerName: "Email",
//             flex: 0.2,
//             renderCell: (params: any) => (
//               <a href={`mailto:${params.row.userEmail}`}>
//                 <AiOutlineMail
//                   className="dark:text-white text-black"
//                   size={20}
//                 />
//               </a>
//             ),
//           },
//         ]),
//   ];
//   const rows: any = [
//     // mock data for testing
//     {
//       id: "1234556777655",
//       userName: "Shahriar Sajeeb",
//       userEmail: "programmershahriarsajeeb@gmail.com",
//       title: "React JS Course",
//       created_at: "2 days ago",
//       price: "$500",
//     },
//     {
//       id: "1234556777656",
//       userName: "John Doe",
//       userEmail: "johndoe@example.com",
//       title: "JavaScript Fundamentals",
//       created_at: "3 days ago",
//       price: "$400",
//     },
//     {
//       id: "1234556777657",
//       userName: "Alice Johnson",
//       userEmail: "alice@example.com",
//       title: "Python Programming",
//       created_at: "4 days ago",
//       price: "$600",
//     },
//     {
//       id: "1234556777658",
//       userName: "Bob Smith",
//       userEmail: "bob@example.com",
//       title: "Web Development Masterclass",
//       created_at: "5 days ago",
//       price: "$800",
//     },
//     {
//       id: "1234556777659",
//       userName: "Eve Anderson",
//       userEmail: "eve@example.com",
//       title: "Machine Learning Essentials",
//       created_at: "6 days ago",
//       price: "$700",
//     },
//     {
//       id: "1234556777660",
//       userName: "Charlie Brown",
//       userEmail: "charlie@example.com",
//       title: "Data Science for Beginners",
//       created_at: "7 days ago",
//       price: "$550",
//     },
//     {
//       id: "1234556777661",
//       userName: "Grace Wilson",
//       userEmail: "grace@example.com",
//       title: "Mobile App Development",
//       created_at: "8 days ago",
//       price: "$750",
//     },
//     {
//       id: "1234556777662",
//       userName: "Oliver Martin",
//       userEmail: "oliver@example.com",
//       title: "Full Stack Web Development",
//       created_at: "9 days ago",
//       price: "$900",
//     },
//     {
//       id: "1234556777663",
//       userName: "Sophia Lee",
//       userEmail: "sophia@example.com",
//       title: "Artificial Intelligence",
//       created_at: "10 days ago",
//       price: "$950",
//     },
//     {
//       id: "1234556777664",
//       userName: "Liam Harris",
//       userEmail: "liam@example.com",
//       title: "Cybersecurity Essentials",
//       created_at: "11 days ago",
//       price: "$700",
//     },
//   ];
//   orderData &&
//     orderData.forEach((item: any) => {
//       rows.push({
//         id: item._id,
//         userName: item.userName,
//         userEmail: item.userEmail,
//         title: item.title,
//         price: item.price,
//         created_at: format(item.createdAt),
//       });
//     });

//   return (
//     <>
//       <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
//         {isLoading ? (
//           <Loader />
//         ) : (
//           <Box m={isDashboard ? "0" : "40px"}>
//             <Box
//               m={isDashboard ? "0" : "40px 0 0 0"}
//               height={isDashboard ? "35vh" : "90vh"}
//               overflow="hidden" // Changed from overflow=("hidden"}
//               sx={{
//                 "& .MuiDataGrid-root": { border: "none", outline: "none" }, // Fixed the class name
//                 "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
//                   color: theme === "dark" ? "#fff" : "#000", // Fixed the syntax here
//                 },
//                 "& .MuiDataGrid-sortIcon": {
//                   color: theme === "dark" ? "#fff" : "#000", // Fixed the syntax here
//                 },
//                 "& .MuiDataGrid-row": {
//                   color: theme === "dark" ? "#fff" : "#000",
//                   borderBottom:
//                     theme === "dark"
//                       ? "1px solid #ffffff30!important"
//                       : "1px solid #ccc!important",
//                 },
//                 "& .MuiTablePagination-root": {
//                   color: theme === "dark" ? "#fff" : "#000",
//                 },
//                 "& .MuiDataGrid-cell": {
//                   borderBottom: "none!important",
//                 },
//                 "& .name-column--cell": {
//                   color: theme === "dark" ? "#fff" : "#000",
//                 },
//                 "& .MuiDataGrid-columnHeaders": {
//                   backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
//                   color: theme === "dark" ? "#fff" : "#000",
//                   borderBottom: "none",
//                 },
//                 "& .MuiDataGrid-virtualScroller": {
//                   backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
//                 },
//                 "& .MuiDataGrid-footerContainer": {
//                   color: theme === "dark" ? "#fff" : "#000",
//                   borderTop: "none",
//                   backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
//                 },
//                 "& .MuiCheckbox-root": {
//                   color:
//                     theme === "dark" ? "#b7ebde !important" : "#000 !important",
//                 },
//                 "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//                   color: "#fff !important",
//                 },
//               }}
//             >
//               <DataGrid
//                 checkboxSelection={isDashboard ? false : true}
//                 rows={rows}
//                 columns={columns}
//                 components={isDashboard ? {} : { Toolbar: GridToolbar }} // Added a colon here
//               />
//             </Box>
//           </Box>
//         )}
//       </div>
//     </>
//   );
// };

// export default AllInvoices;
