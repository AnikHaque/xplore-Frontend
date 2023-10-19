"use client";
import * as React from "react";
import Grid from "@mui/material/Grid";

import Paper from "@mui/material/Paper";
import Header from "@/components/layouts/Header";
import { Container } from "@mui/material";
export default function SpacingGrid() {
  return (
    <>
      <Header />
      <Container>
        {" "}
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              {[0, 1, 2].map((value) => (
                <Grid key={value} item>
                  <Paper
                    sx={{
                      height: 140,
                      width: 100,
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
