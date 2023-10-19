"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Grid,
  Container,
  Box,
  Button,
} from "@mui/material";
import ServiceCommentForm from "./ServiceCommentForm";
import ServiceReviewForm from "./ServiceReviewForm";
import ReserveData from "./ReserveData";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import KingBedIcon from "@mui/icons-material/KingBed";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GroupIcon from "@mui/icons-material/Group";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import HouseIcon from "@mui/icons-material/House";
import { Rating } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import Link from "next/link";
import {
  useAddCommentMutation,
  useAddReviewMutation,
  useServicesQuery,
} from "@/redux/slices/services/serviceApi";
import { message } from "antd";
const itemsPerPage = 3;
const dummyUserReviews = [
  {
    id: 1,
    userName: "User1",
    comment: "Great place to stay!",
    rating: 5,
  },
  {
    id: 2,
    userName: "User2",
    comment: "Beautiful location.",
    rating: 4,
  },
  // Add more dummy user reviews as needed
];

const dummyUserComments = [
  {
    id: 1,
    userName: "User3",
    text: "Nice place!",
  },
  {
    id: 2,
    userName: "User4",
    text: "I loved it!",
  },
  // Add more dummy user comments as needed
];

const ServiceDetails = ({ service, id, userId, refetch }: any) => {
  console.log(service);
  const [startIndex, setStartIndex] = useState(0);
  const categoryIdForThisService = service?.category?._id;
  //!Add comment
  const [addComment] = useAddCommentMutation();
  //!Add Review
  const [addReview] = useAddReviewMutation();
  //!Available Service Data
  const { data: similarServiceDatas } = useServicesQuery({});
  const similarServices = similarServiceDatas?.services?.filter(
    (service: any) => service?.category?._id === categoryIdForThisService
  );

  const nextSlide = () => {
    //@ts-ignore
    if (startIndex + itemsPerPage < similarServices?.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };
  const handleCommentSubmit = async (commentData: any) => {
    try {
      const data = {
        id: id,
        user: userId,
        question: commentData?.comment,
      };

      const res = await addComment(data);

      //@ts-ignore
      if (res?.data?._id) {
        message.success("Comment added");
      }
    } catch (error) {}
  };

  const handleReviewSubmit = async (reviewData: any) => {
    try {
      const data = {
        id: id,
        rating: reviewData?.rating,
        review: reviewData?.comment,
        user: userId,
      };
      // console.log(data);
      const res = await addReview(data);
      console.log(res);
      //@ts-ignore
      if (res?.data?._id) {
        message.success("Thanks for your kind feedback ");
      }
    } catch (error) {}
  };

  return (
    <div className="p-3">
      <Grid container spacing={2}>
        {/* Left Side: Display Service Information */}
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardMedia
              component="img"
              height="250"
              image={service?.thumbnail?.url} // Add the URL to your service's image
              alt={service?.propertyName}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {service?.propertyName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <Rating
                  name="rating"
                  value={service?.ratings}
                  precision={0.5}
                  readOnly
                />
              </Typography>
              <Typography variant="body1" gutterBottom>
                <LocationOnIcon /> {service?.propertyLocation}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <LocalHotelIcon />
                {service?.roomTitle}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <KingBedIcon /> {service?.bedTitle}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <MonetizationOnIcon /> Price: ${service?.price}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <HomeWorkIcon /> Property Details: {service?.propertyDetails}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <EventAvailableIcon /> Availability: {service?.availability}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <GroupIcon /> Number of Guests: {service?.numberOfGuest}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <HouseIcon /> House Rules: {service?.houseRules}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <LocalHotelIcon /> Facilities: {service?.facilities}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side: ReserveData */}
        <Grid item xs={12} md={4}>
          <ReserveData id={id} />
          <ServiceReviewForm
            onSubmitReview={handleReviewSubmit}
            isQuestion={true}
          />
          <ServiceCommentForm
            onSubmitReview={handleCommentSubmit}
            isQuestion={true}
          />
        </Grid>

        {/* User Reviews and Comments */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            This property Reviews
          </Typography>
          {/* Loop through and display user reviews here */}
          {service?.reviews?.map((review: any) => (
            <div key={review.id}>
              <Card style={{ marginBottom: "16px" }}>
                <CardContent>
                  <Avatar src={review?.user?.avatar?.url} alt={review._id} />
                  <Typography variant="body1" gutterBottom>
                    {review?.user?.name}: {review.comment}
                  </Typography>
                  <Rating
                    name="rating"
                    value={review.rating}
                    precision={0.5}
                    readOnly
                  />
                </CardContent>
              </Card>
            </div>
          ))}

          <Typography variant="h6" gutterBottom>
            This property Comments
          </Typography>
          {/* Loop through and display user comments here */}
          {service?.questions?.map((comment: any) => (
            <Card key={comment._id} style={{ marginBottom: "16px" }}>
              <CardContent>
                <Avatar
                  src={comment?.user?.avatar?.url}
                  alt={comment.user?.name}
                />
                <Typography variant="h6" gutterBottom>
                  {comment.user?.name}
                </Typography>
                <Typography variant="body2">{comment.question}</Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={12}>
          <div className="py-3">
            <Container>
              <Typography variant="h5">Similar Category Services</Typography>
              <Box
                display="flex"
                justifyItems={"justify-center"}
                alignItems="center"
                justifyContent="space-between"
              >
                <Button
                  startIcon={<ArrowBack />}
                  onClick={prevSlide}
                  disabled={startIndex === 0}
                >
                  Previous
                </Button>

                <Button
                  endIcon={<ArrowForward />}
                  onClick={nextSlide}
                  disabled={
                    startIndex + itemsPerPage >=
                    similarServiceDatas?.services?.length!
                  }
                >
                  Next
                </Button>
              </Box>
              <div className="pt-3">
                <Grid container spacing={3}>
                  {similarServices
                    ?.slice(startIndex, startIndex + itemsPerPage)
                    .map((service: any) => (
                      <Grid item key={service._id} xs={12} sm={6} md={4}>
                        <Link href={`/services/${service?._id}`}>
                          {" "}
                          <Card
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              height: "100%",
                              backgroundColor: "#f5f5f5",
                              border: "1px solid #ddd",
                            }}
                          >
                            <CardMedia
                              component="img"
                              sx={{ width: "100%", height: "200px" }}
                              image={service.thumbnail?.url}
                              alt={service.propertyName}
                            />
                            <CardContent>
                              <Typography variant="h6" gutterBottom>
                                {service.propertyName}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Price: ${service.price}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Room: {service.roomTitle}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Bed: {service.bedTitle}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                <LocationOnIcon fontSize="small" /> Location:{" "}
                                {service.propertyLocation}
                              </Typography>
                            </CardContent>
                            <Box
                              sx={{
                                borderTop: "1px solid #ddd",
                                padding: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography variant="body2">
                                Service Ratings:
                              </Typography>
                              <Rating
                                name={`rating-${service.id}`}
                                value={service.ratings}
                                readOnly
                              />
                            </Box>
                          </Card>
                        </Link>
                      </Grid>
                    ))}
                </Grid>
              </div>
            </Container>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ServiceDetails;
