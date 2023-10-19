"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Header from "@/components/layouts/Header";
import Image from "next/image";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import AddHomeWorkOutlinedIcon from "@mui/icons-material/AddHomeWorkOutlined";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const cardsData = [
  {
    title: "Save more with long stay hotels",
    description:
      "Some hotels and holiday rentals on Booking.com now offer reduced monthly rates on extended stays, meaning you can save more when you stay longer.",
    icon: <CurrencyExchangeIcon />,
    // Add the icon source here
  },
  {
    title: "Flexible stays",
    description:
      "Travel plans change – so can your bookings. Enjoy peace of mind when you book a property with free cancellation and flexible check-in.",
    icon: <TaskAltOutlinedIcon />,
    // Add the icon source here
  },
  {
    title: "Over 1,3 million long term stays",
    description:
      "Choose from monthly rentals, hotels and everything in between. Rely on verified guest reviews to pick a place you can call home.",
    icon: <AddHomeWorkOutlinedIcon />,
    // Add the icon source here
  },
];

export default function ResponsiveComponent() {
  return (
    <>
      <Header />
      <Container>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} md={6}>
              <Item>
                <Image
                  src="https://res.cloudinary.com/arafatleo/image/upload/v1697694385/Location/intro.464cd011_jaje6s.jpg"
                  height={600}
                  width={650}
                  alt="extended"
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">
                Discover the world at your own pace
              </Typography>
              <Typography>
                Long term rentals and hotels are perfect for working remotely,
                reuniting with family and friends, or just exploring the world
                again. More properties are opening for monthly stays on
                Booking.com every day, so it’s now easier than ever to get away
                for a while.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container>
        <Typography variant="h5" gutterBottom>
          Why book your monthly stay on Hotel Haven
        </Typography>{" "}
        <Grid container spacing={2}>
          {cardsData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CardComponent
                title={card.title}
                description={card.description}
                icon={card.icon}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

function CardComponent({ title, description, icon }: any) {
  return (
    <Paper
      elevation={3}
      style={{ padding: "16px", textAlign: "center", height: "200px" }}
    >
      {React.cloneElement(icon, { fontSize: "large" })}
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography>{description}</Typography>
    </Paper>
  );
}
