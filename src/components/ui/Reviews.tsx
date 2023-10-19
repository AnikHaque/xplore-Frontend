"use client";
import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Rating,
  Typography,
  Grid,
  Container,
  Button,
  Box,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useOverviewsQuery } from "@/redux/slices/blog/blogApi";

const reviewsData = [
  {
    name: "User 1",
    image: "url_to_image1",
    rating: 4,
    comment: "Great product!",
  },
  {
    name: "User 2",
    image: "url_to_image2",
    rating: 5,
    comment: "Excellent service!",
  },
  {
    name: "User 3",
    image: "url_to_image3",
    rating: 3,
    comment: "Good experience!",
  },
  {
    name: "User 4",
    image: "url_to_image3",
    rating: 5,
    comment: "Good experience!",
  },
  // Add more reviews as needed
];
const itemsPerPage = 6;

const ReviewCard = () => {
  const [startIndex, setStartIndex] = useState(0);
  const { data } = useOverviewsQuery({});

  const nextSlide = () => {
    if (startIndex + itemsPerPage < reviewsData.length) {
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
        <Typography variant="h5">User Reviews</Typography>
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
            disabled={startIndex + itemsPerPage >= reviewsData.length}
          ></Button>
        </Box>
        <div className="pt-3">
          <Grid container spacing={3}>
            {data?.data.map((review, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card style={{ backgroundColor: "#003B95", color: "#fff" }}>
                  <CardContent>
                    <Avatar
                      src={review?.user?.avatar?.url}
                      alt={review?.user?.name}
                    />
                    <Typography variant="h6" gutterBottom>
                      {review?.user?.name}
                    </Typography>
                    <Rating
                      name="rating"
                      value={review.rating}
                      precision={0.5}
                      readOnly
                    />
                    <Typography variant="body2">{review.comment}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default ReviewCard;
