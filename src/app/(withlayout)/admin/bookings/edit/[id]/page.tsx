/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Container,
  Paper,
  Typography,
  MenuItem,
} from "@mui/material";
import {
  useSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/slices/category/categoryApi";
import { Spin, message } from "antd";
import { LocationEnum, StatusEnum } from "@/types";
import { useRouter } from "next/navigation";
import {
  useSingleBookingQuery,
  useUpdateBookingMutation,
} from "@/redux/slices/services/bookingApi";

const UpdateCBooking = ({ params }: any) => {
  const { id } = params;
  const {
    data,
    refetch,
    isLoading: bookingtLoading,
  } = useSingleBookingQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  console.log(data);

  const { handleSubmit, control } = useForm();

  const router = useRouter();
  const [updateBooking, { isLoading, isSuccess, error }] =
    useUpdateBookingMutation();

  useEffect(() => {
    if (error) {
      //@ts-ignore
      if ("data" in error) {
        const errorData = error as any;
        message.error(errorData.data.message);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [error, isSuccess, refetch]);
  const onSubmit = async (bookData: any) => {
    // console.log(categoryImage, data);
    try {
      const res = await updateBooking({ id, status: bookData?.status });
      //   console.log(res);
      //@ts-ignore
      if (res?.data?._id) {
        message.success("Booking updated");
        refetch();
        router.push("/admin/bookings");
      }
    } catch (error) {}
  };

  return (
    <>
      {bookingtLoading ? (
        <Spin size="large" />
      ) : (
        <Container>
          <Typography variant="h5" gutterBottom>
            Manage Booking
          </Typography>

          <Paper elevation={3} sx={{ padding: 3 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue={data?.status}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        select
                        label="Status"
                        variant="outlined"
                        {...field}
                      >
                        {StatusEnum.map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                {isLoading ? "Updating..." : "Update"}
              </Button>
            </form>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default UpdateCBooking;
