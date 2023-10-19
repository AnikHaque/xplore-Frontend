/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

import { useCreateServiceMutation } from "@/redux/slices/services/serviceApi";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useCategoriesQuery } from "@/redux/slices/category/categoryApi";

function PropertyForm() {
  const {
    control,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm();
  const [serviceImage, setServiceImage] = useState({
    thumbnail: "",
  });
  const router = useRouter();
  const { data: categoryData } = useCategoriesQuery({});

  const [createService, { isLoading, isSuccess, error }] =
    useCreateServiceMutation();

  useEffect(() => {
    if (error) {
      //@ts-ignore
      if ("data" in error) {
        const errorData = error as any;
        message.error(errorData.data.message);
      } else {
      }
    }
  }, [error]);
  const onSubmit = async (data: any) => {
    // console.log("Form data:", data, serviceImage);
    try {
      const serviceData = {
        propertyName: data?.propertyName,
        category: data?.category,
        propertyLocation: data?.propertyLocation,
        roomTitle: data?.roomTitle,
        bedTitle: data?.bedTitle,
        price: Number(data?.price),
        propertyDetails: data?.propertyDetails,

        numberOfGuest: data?.numberOfGuest,
        houseRules: data?.houseRules,
        facilities: data?.facilities,
        status: data?.status,
        thumbnail: serviceImage?.thumbnail,
      };
      console.log(serviceData);
      const res = await createService(serviceData);
      console.log(res);
      //@ts-ignore
      if (res?.data?.propertyName) {
        message.success("Service Created");
        router.push("/admin/service");
      }
    } catch (error) {}
    reset();
  };
  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        //@ts-ignore
        setServiceImage({ thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="bg-gray-100 text-black p-3">
      <Container>
        <Typography variant="h5" gutterBottom>
          Property Information
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="propertyName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Property Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="category"
                control={control}
                defaultValue=""
                rules={{ required: "category is required" }}
                render={({ field }) => (
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Location</InputLabel>
                    <Select {...field}>
                      {categoryData?.categories?.map((category: any) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category?.category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="propertyLocation"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Property Location"
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="roomTitle"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Room Title"
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="bedTitle"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Bed Title"
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="price"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Price"
                    variant="outlined"
                    fullWidth
                    required
                    type="number"
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="numberOfGuest"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Number of Guests"
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="status"
                control={control}
                defaultValue="in-progress"
                rules={{ required: "status is required" }}
                render={({ field }) => (
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Status</InputLabel>
                    <Select {...field}>
                      <MenuItem value="upcoming">Upcoming</MenuItem>
                      <MenuItem value="in-progress">In Progress</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="propertyDetails"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Property Details"
                    variant="outlined"
                    fullWidth
                    multiline
                    required
                    rows={3}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="houseRules"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="House Rules"
                    variant="outlined"
                    fullWidth
                    multiline
                    required
                    rows={3}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="facilities"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Facilities"
                    variant="outlined"
                    fullWidth
                    multiline
                    required
                    rows={3}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/webp"
                id="file"
                name="file"
                className="hidden"
                onChange={handleImageChange}
              />
              <label htmlFor="file">
                <Button variant="contained" component="span">
                  Upload Image
                </Button>
              </label>
            </Grid>
          </Grid>
          {serviceImage && (
            <img
              src={serviceImage?.thumbnail}
              alt="Uploaded Image"
              style={{ width: "100%", marginTop: "1rem" }}
            />
          )}
          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary">
              {isLoading ? "Creating..." : "Create Service"}
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
}

export default PropertyForm;
