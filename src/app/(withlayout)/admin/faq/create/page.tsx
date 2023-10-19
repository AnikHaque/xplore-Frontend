"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { useCreateFaqMutation } from "@/redux/slices/blog/blogApi";
import { message } from "antd";
import { useRouter } from "next/navigation";

const FAQCreateForm = () => {
  const { handleSubmit, control, reset } = useForm();
  const [createFaq, { isLoading, isSuccess, error }] = useCreateFaqMutation();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    try {
      const faqData = {
        question: data?.question,
        answer: data?.answer,
      };

      const res = await createFaq(faqData);
      //@ts-ignore
      if (res?.data?.question) {
        message.success("Faq created successfully");
        router.push("/admin/faq");
      }
    } catch (error) {}
    reset();
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Create New FAQ Entry
      </Typography>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="question"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Question"
                    variant="outlined"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="answer"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Answer"
                    variant="outlined"
                    multiline
                    minRows={3}
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
            {isLoading ? "Creating..." : "Create FAQ"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default FAQCreateForm;
