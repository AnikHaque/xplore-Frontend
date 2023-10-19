"use client";
import React from "react";
import { Container, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layouts/Header";
import { getUserInfo } from "@/services/auth.service";
import { useLoadUserQuery } from "@/redux/slices/user/userApi";

const SuccessPage = ({ searchParams }: Record<string, any>) => {
  const { serviceId } = searchParams;
  //   console.log(serviceId);
  const { userId } = getUserInfo() as any;
  const { data } = useLoadUserQuery(userId);
  //   console.log(data);
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Booking Successful
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Thank you <span className="text-purple-600">{data?.name}</span> for
          your reservation. Your booking is confirmed.
        </Typography>
        <Link href="/">
          <Button className="bg-[#1976D2] " variant="contained" color="primary">
            Back to Home
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default SuccessPage;
