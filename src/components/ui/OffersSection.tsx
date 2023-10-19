/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";
import Link from "next/link";

const Offers = () => {
  return (
    <div className="py-3">
      <Container>
        <Typography variant="h5">Offers</Typography>
        <Typography>Promotions, deals and special offers for you</Typography>
        <div className="pt-2">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card
                style={{
                  height: "200px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        Take your longest holiday yet
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Browse properties offering long-term stays, many at
                        reduced monthly rates.
                      </Typography>
                      <Link href={"/extended-says"}>
                        {" "}
                        <Button variant="outlined" color="primary">
                          Find a stay
                        </Button>
                      </Link>
                    </CardContent>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <img
                      className="h-[200px]"
                      src="
                      https://res.cloudinary.com/arafatleo/image/upload/v1697548734/Location/pexels-photo-3184291_getvtb.jpg"
                      alt=""
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                style={{
                  height: "200px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        Save 15% with Late Escape Deals
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Explore thousands of destinations worldwide and save 15%
                        or more.
                      </Typography>{" "}
                      <Button variant="outlined" color="primary">
                        Find late escape deals
                      </Button>
                    </CardContent>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <img
                      className="h-[200px]"
                      src="
                      https://res.cloudinary.com/arafatleo/image/upload/v1697548701/Location/pexels-photo-1371360_r1f3px.jpg"
                      alt=""
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Offers;
