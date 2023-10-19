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
  useUpdateProfileByIdminMutation,
  useUpdateProfileMutation,
} from "@/redux/slices/user/userApi";
import { useRouter } from "next/navigation";
import { Spin, message } from "antd";

const UserUpdateForm = ({ params }: any) => {
  const id = params.id;
  const router = useRouter();
  //!
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  //!
  const [updateProfileByIdmin, { isLoading: updateLoading }] =
    useUpdateProfileByIdminMutation();
  //!
  const { handleSubmit, control } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await updateProfileByIdmin({ id, body: data });
      //@ts-ignore
      if (res?.data?.name) {
        message.success("Admin successfully updated");
        refetch();
        router.push("/admin/user");
      }
    } catch (error) {}
  };

  return (
    <>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Container>
          <Typography variant="h5" gutterBottom>
            Update User Information
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
                {updateLoading ? "Updating..." : "Update User"}
              </Button>
            </form>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default UserUpdateForm;
