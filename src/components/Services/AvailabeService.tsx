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
import Rating from "@mui/material/Rating";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import { useServicesQuery } from "@/redux/slices/services/serviceApi";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import Link from "next/link";

const itemsPerPage = 3;

const ServiceSection = () => {
  const [startIndex, setStartIndex] = useState(0);

  //!Available Service Data
  const { data: availableServiceData } = useServicesQuery({});

  const availableServices = availableServiceData?.services?.filter(
    (service: any) => service.availability === "Available"
  );
  const nextSlide = () => {
    //@ts-ignore
    if (startIndex + itemsPerPage < availableServices?.length) {
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
        <Typography variant="h5">Available Services</Typography>
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
              availableServiceData?.services?.length!
            }
          >
            Next
          </Button>
        </Box>
        <div className="pt-3">
          <Grid container spacing={3}>
            {availableServices
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
                        <Typography variant="body2" color="text.secondary">
                          Price: ${service.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Room: {service.roomTitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Bed: {service.bedTitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
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
        <Link href={"/services"}>
          {" "}
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            All Services
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default ServiceSection;
