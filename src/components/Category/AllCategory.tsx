/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useCategoriesQuery } from "@/redux/slices/category/categoryApi";
import Link from "next/link";

const itemsPerPage = 3;

const AllCategory = () => {
  const [startIndex, setStartIndex] = useState(0);

  //!Get All Category
  const { data: categoryData } = useCategoriesQuery({});
  console.log(categoryData);

  const nextSlide = () => {
    //@ts-ignore
    if (startIndex + itemsPerPage < categoryData?.categories?.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  return (
    <div className="py-3">
      <Container>
        <Typography variant="h5">Explore Bangladesh</Typography>
        <Typography>These popular destinations have a lot to offer</Typography>

        <Box
          display="flex"
          justifyItems={"justify-center"}
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={prevSlide}
            disabled={startIndex === 0}
          ></Button>

          <Button
            variant="outlined"
            endIcon={<ArrowForward />}
            onClick={nextSlide}
            disabled={
              //@ts-ignore
              startIndex + itemsPerPage >= categoryData?.categories?.length
            }
          ></Button>
        </Box>
        <div className="pt-3">
          <Grid container spacing={3}>
            {categoryData?.categories
              ?.slice(startIndex, startIndex + itemsPerPage)
              .map((category) => (
                <Grid item key={category._id} xs={12} sm={6} md={4}>
                  <Link href={`/services?category=${category._id}`}>
                    {" "}
                    <Card
                      style={{
                        transition: "transform 0.2s",
                      }}
                    >
                      <CardContent>
                        <img
                          src={category?.thumbnail?.url}
                          alt={category.category}
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                        <Typography variant="h6" gutterBottom>
                          {category.category}
                        </Typography>
                        <Typography variant="body2">
                          {category?.services?.length === 0
                            ? 0
                            : category?.services?.length}{" "}
                          (Property)
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default AllCategory;
