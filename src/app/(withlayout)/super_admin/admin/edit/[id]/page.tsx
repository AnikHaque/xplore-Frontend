"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import {
  useLoadUserQuery,
  useUpdateAdminMutation,
} from "@/redux/slices/user/userApi";
import { useRouter } from "next/navigation";
import { message } from "antd";

const UserUpdateForm = ({ params }: any) => {
  const id = params.id;
  const router = useRouter();
  //!
  const { data: userData, isLoading } = useLoadUserQuery(id);
  //!
  const [updateAdmin, { isLoading: updateLoading }] = useUpdateAdminMutation();
  //!
  const { handleSubmit, control } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const res = await updateAdmin({ id, body: data });
      //@ts-ignore
      if (res?.data?.name) {
        message.success("Admin successfully updated");
        router.push("/super_admin/admin");
      }
    } catch (error) {}
  };

  return (
    <>
      {isLoading ? (
        <p>Loading..</p>
      ) : (
        <Container>
          <Typography variant="h5" gutterBottom>
            Update Admin Information
          </Typography>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={userData?.name}
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
                    defaultValue={userData?.email}
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
                    name="role"
                    control={control}
                    defaultValue={userData?.role}
                    render={({ field }) => (
                      <TextField
                        select
                        fullWidth
                        label="Role"
                        variant="outlined"
                        {...field}
                      >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
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
                {updateLoading ? "Updating..." : "Update Admin"}
              </Button>
            </form>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default UserUpdateForm;
