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
  CardMedia,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useServicesQuery } from "@/redux/slices/services/serviceApi";

const itemsPerPage = 3;

const UpComingService = () => {
  const [startIndex, setStartIndex] = useState(0);
  //!Available Service Data
  const { data: upcomingServiceData } = useServicesQuery({});

  const upcomingServices = upcomingServiceData?.services?.filter(
    (service: any) => service.status === "upcoming"
  );

  const nextSlide = () => {
    //@ts-ignore
    if (startIndex + itemsPerPage < upcomingServices.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  return (
    <div className="py-3  ">
      <Container>
        <Typography variant="h5">Upcoming Services</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={prevSlide}
            disabled={startIndex === 0}
          >
            Previous
          </Button>

          <Button
            variant="outlined"
            endIcon={<ArrowForward />}
            onClick={nextSlide}
            //@ts-ignore
            disabled={
              startIndex + itemsPerPage >= upcomingServices?.length! || 0
            }
          >
            Next
          </Button>
        </Box>
        <div className="pt-3">
          <Grid container spacing={3}>
            {upcomingServices
              ?.slice(startIndex, startIndex + itemsPerPage)
              .map((service: any) => (
                <Grid item key={service.id} xs={12} sm={6} md={4}>
                  <Card
                    style={{
                      border: "1px solid #e1e1e1",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",
                      height: "400px",
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
                      <Typography variant="body2">
                        Location: {service.propertyLocation}
                      </Typography>
                      <Typography variant="body2">
                        Bed: {service.bedTitle}
                      </Typography>
                      <Typography variant="h5">
                        <span className="text-red-400">{service.status}</span>
                      </Typography>
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

export default UpComingService;
