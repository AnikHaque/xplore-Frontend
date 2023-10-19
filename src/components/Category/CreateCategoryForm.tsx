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
import { useCreateCategoryMutation } from "@/redux/slices/category/categoryApi";
import { message } from "antd";
import { LocationEnum } from "@/types";
import { useRouter } from "next/navigation";

const CategoryCreateForm = () => {
  const { handleSubmit, control } = useForm();
  const [dragging, setDragging] = useState(false);
  const [categoryImage, setCategoryImage] = useState({
    thumbnail: "",
  });
  const router = useRouter();
  const [createCategory, { isLoading, isSuccess, error }] =
    useCreateCategoryMutation();
  useEffect(() => {
    if (isSuccess) {
    }
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
      const categoryData = {
        category: data?.location,
        thumbnail: categoryImage?.thumbnail,
      };
      console.log(categoryData);
      const res = await createCategory(categoryData);
      console.log(res);
      //@ts-ignore
      if (res?.data?.category) {
        message.success("Category Created");
        router.push("/admin/category");
      }
    } catch (error) {}
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        //@ts-ignore
        setCategoryImage({ thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        //@ts-ignore
        setCategoryImage({ thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Create New Category
      </Typography>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/webp"
                id="file"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Drag-and-Drop Container */}
              <label
                htmlFor="file"
                className={`w-full min-h-[10vh] border rounded-lg p-3 border-dashed border-gray-300 ${
                  dragging ? "bg-blue-200" : "bg-gray-100"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {categoryImage.thumbnail ? (
                  <img
                    src={categoryImage.thumbnail}
                    alt=""
                    className="max-h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500">
                    Drag and drop or click here
                  </span>
                )}
              </label>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="location"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    select
                    label="Location"
                    variant="outlined"
                    {...field}
                  >
                    {LocationEnum.map((location) => (
                      <MenuItem key={location} value={location}>
                        {location}
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
            {isLoading ? "Creating..." : "Create Category"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CategoryCreateForm;
