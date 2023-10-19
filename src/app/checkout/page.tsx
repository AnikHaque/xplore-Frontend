"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Header from "@/components/layouts/Header";
import { useRouter } from "next/navigation";
import { useCreateBookingMutation } from "@/redux/slices/services/bookingApi";
import { useSingleServiceQuery } from "@/redux/slices/services/serviceApi";
import { Spin, message } from "antd";

export const rooms = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

function CheckoutForm({ searchParams }: any) {
  const { id, userId } = searchParams;
  const [selectedRoom, setSelectedRoom] = useState("");
  const [createBooking, { isLoading: bookingLoading, error }] =
    useCreateBookingMutation();
  const { data: serviceData, isLoading } = useSingleServiceQuery(id);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
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
  }, [error]);
  const onSubmit = async (data: any) => {
    try {
      const formData = {
        serviceId: id,
        userId,
        startDate: data?.startDate,
        endDate: data?.endDate,
        room: selectedRoom,
      };

      const res = await createBooking(formData);
      //@ts-ignore
      if (res?.data?._id) {
        message.success("successfully Bokings");
        router.push(`/success?serviceId=${id}`);
      }
    } catch (error) {}
  };

  return (
    <>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          {" "}
          <Header />
          <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h6" gutterBottom>
                {serviceData?.propertyName}
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="startDate"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          required
                          label="Start Date"
                          type="date"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          {...field}
                        />
                      )}
                    />
                    {errors.startDate && <span>This field is required</span>}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="endDate"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          required
                          label="End Date"
                          type="date"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          {...field}
                        />
                      )}
                    />
                    {errors.endDate && <span>This field is required</span>}
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="room"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          select
                          required
                          label="Room Number"
                          fullWidth
                          {...field}
                          value={selectedRoom}
                          onChange={(event) => {
                            setSelectedRoom(event.target.value);
                            field.onChange(event); // This line is important to update the form state
                          }}
                        >
                          {rooms.map((option: any) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                    {errors.room && <span>This field is required</span>}
                  </Grid>
                </Grid>
                <div className="py-2">
                  <Button
                    className="bg-[#1976D2]"
                    type="submit"
                    variant="contained"
                  >
                    {bookingLoading ? "Submiting..." : "Submit"}
                  </Button>
                </div>
              </form>
              <Typography variant="h6" gutterBottom>
                Total Price: {serviceData?.price}
              </Typography>
            </Paper>
          </Container>
        </>
      )}
    </>
  );
}

export default CheckoutForm;
