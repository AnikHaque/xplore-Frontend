"use client";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { useCreateAdminMutation } from "@/redux/slices/user/userApi";
import { message } from "antd";
import { useRouter } from "next/navigation";

const AdminCreateForm = () => {
  const router = useRouter();
  const { handleSubmit, control } = useForm();
  //!
  const [createAdmin, { isLoading, error, isSuccess }] =
    useCreateAdminMutation();
  //!
  useEffect(() => {
    if (isSuccess) {
      message.success("Admin Created");
      router.push("/super_admin/admin");
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
  }, [error, isSuccess, router]);
  const onSubmit = async (data: any) => {
    const res = await createAdmin(data);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Create New Admin
      </Typography>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    {...field}
                  />
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
            {isLoading ? "Creating..." : "Create Admin"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminCreateForm;
