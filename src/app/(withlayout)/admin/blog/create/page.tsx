/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCreateBlogMutation } from "@/redux/slices/blog/blogApi";
import { message } from "antd";

const BlogPostCreateForm = () => {
  const { handleSubmit, control, reset } = useForm();
  const [blogImage, setBlogImage] = useState({
    avatar: "",
  });
  const [createBlog, { isLoading, isSuccess, error }] = useCreateBlogMutation();
  const router = useRouter();
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
      const blogData = {
        title: data?.title,
        description: data?.description,
        avatar: blogImage?.avatar,
      };

      const res = await createBlog(blogData);

      //@ts-ignore
      if (res?.data?.title) {
        message.success("Blog Created");
        router.push("/admin/blog");
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
        setBlogImage({ avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Create New Blog Post
      </Typography>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    multiline
                    minRows={3}
                    {...field}
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
          {blogImage && (
            <img
              src={blogImage.avatar}
              alt="Uploaded Image"
              style={{ width: "100%", marginTop: "1rem" }}
            />
          )}
          <Button
            type="submit"
            variant="contained"
            className="bg-[#1976D2] "
            sx={{ marginTop: 2 }}
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default BlogPostCreateForm;
