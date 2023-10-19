"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  InputBase,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FilterListIcon from "@mui/icons-material/FilterList";
import Checkbox from "@mui/material/Checkbox";
import { HeroImages } from "@/constants/images";

function HeroSection() {
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const [selectedAction, setSelectedAction] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  useEffect(() => {
    const imageSlideshowInterval = setInterval(() => {
      setCurrentBackgroundIndex(
        (prevIndex) => (prevIndex + 1) % HeroImages.length
      );
    }, 3000);

    return () => {
      clearInterval(imageSlideshowInterval);
    };
  }, []);
  const handleActionClick = (action: React.SetStateAction<null>) => {
    setSelectedAction(action);
  };

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  return (
    <section
      className="flex items-center"
      style={{
        minHeight: "80vh",

        backgroundImage: HeroImages[currentBackgroundIndex],
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        paddingTop: "100px",
        paddingBottom: "100px",
        transition: "background-image 1s ease-in-out",
      }}
    >
      <Container>
        <Paper
          style={{
            padding: "16px",
            backgroundColor: "white",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                style={{ color: "black", marginBottom: "16px" }}
              >
                Find Your Ideal Hotel
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "gray", marginBottom: "16px" }}
              >
                Discover the perfect hotel for your next vacation. Book with us
                for the best rates and deals.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <form style={{ display: "flex", alignItems: "center" }}>
                <InputBase
                  id="simple-search"
                  placeholder="Search for hotels..."
                  inputProps={{ "aria-label": "search" }}
                  style={{
                    background: "white",
                    color: "black",
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                />
                <IconButton
                  style={{
                    background: "white",
                    color: "gray",
                    padding: "10px",
                  }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </form>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3} alignItems="center">
                <Grid item>
                  <Button
                    type="button"
                    variant="contained"
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50px",
                      fontSize: "1rem",
                      padding: "8px 16px",
                    }}
                  >
                    <AddIcon style={{ marginRight: "8px" }} />
                    Booking Room
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="button"
                    variant="contained"
                    style={{
                      backgroundColor: "white",
                      color: "gray",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      padding: "8px 16px",
                    }}
                  >
                    <MoreHorizIcon style={{ marginRight: "8px" }} />
                    Actions
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="button"
                    variant="contained"
                    style={{
                      backgroundColor: "white",
                      color: "gray",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      padding: "8px 16px",
                    }}
                  >
                    <FilterListIcon style={{ marginRight: "8px" }} />
                    Filter
                    <FilterListIcon style={{ marginLeft: "8px" }} />
                  </Button>
                </Grid>
              </Grid>
              <Paper
                id="actionsDropdown"
                style={{
                  zIndex: 10,
                  position: "absolute",
                  display: "none",
                  background: "white",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <ul
                  style={{
                    padding: "8px 16px",
                    fontSize: "0.875rem",
                    color: "gray",
                  }}
                >
                  <li>
                    <a
                      href="#"
                      style={{
                        display: "block",
                        padding: "8px 0",
                        color: "gray",
                      }}
                    >
                      Mass Edit
                    </a>
                  </li>
                </ul>
                <div style={{ padding: "8px 16px" }}>
                  <a
                    href="#"
                    style={{
                      display: "block",
                      padding: "8px 0",
                      fontSize: "0.875rem",
                      color: "gray",
                    }}
                  >
                    Delete all
                  </a>
                </div>
              </Paper>
              <Paper
                id="filterDropdown"
                style={{
                  zIndex: 10,
                  position: "absolute",
                  display: "none",
                  background: "white",
                  borderRadius: "8px",
                  boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h6
                  style={{
                    margin: "8px 16px",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "gray",
                  }}
                >
                  Category
                </h6>
                <ul
                  aria-labelledby="dropdownDefault"
                  style={{
                    display: "block",
                    padding: "0",
                    listStyle: "none",
                  }}
                >
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 0",
                    }}
                  >
                    <Checkbox
                      id="apple"
                      value=""
                      style={{
                        width: "16px",
                        height: "16px",
                        background: "#f4f5f7",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        color: "primary",
                      }}
                    />
                    <label
                      htmlFor="apple"
                      style={{
                        marginLeft: "8px",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "gray",
                      }}
                    >
                      Apple (56)
                    </label>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 0",
                    }}
                  >
                    <Checkbox
                      id="fitbit"
                      value=""
                      style={{
                        width: "16px",
                        height: "16px",
                        background: "#f4f5f7",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        color: "primary",
                      }}
                    />
                    <label
                      htmlFor="fitbit"
                      style={{
                        marginLeft: "8px",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "gray",
                      }}
                    >
                      Fitbit (56)
                    </label>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 0",
                    }}
                  >
                    <Checkbox
                      id="dell"
                      value=""
                      style={{
                        width: "16px",
                        height: "16px",
                        background: "#f4f5f7",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        color: "primary",
                      }}
                    />
                    <label
                      htmlFor="dell"
                      style={{
                        marginLeft: "8px",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "gray",
                      }}
                    >
                      Dell (56)
                    </label>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 0",
                    }}
                  >
                    <Checkbox
                      id="asus"
                      value=""
                      checked
                      style={{
                        width: "16px",
                        height: "16px",
                        background: "#f4f5f7",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        color: "primary",
                      }}
                    />
                    <label
                      htmlFor="asus"
                      style={{
                        marginLeft: "8px",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "gray",
                      }}
                    >
                      Asus (97)
                    </label>
                  </li>
                </ul>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </section>
  );
}

export default HeroSection;
