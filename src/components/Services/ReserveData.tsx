"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getUserInfo } from "@/services/auth.service";
import { useAddToCartMutation } from "@/redux/slices/services/serviceApi";
import { message } from "antd";
import Link from "next/link";

const ReservedCard = ({ id }: any) => {
  const { userId } = getUserInfo() as any;
  const [addToCart, { isLoading, error }] = useAddToCartMutation();

  useEffect(() => {
    if (error) {
      //@ts-ignore
      if ("data" in error) {
        const errorData = error as any;
        message.error(errorData.data.message);
      }
    }
  }, [error]);
  const addToWishList = async () => {
    try {
      const data = {
        userId,
        serviceId: id,
      };
      const res = await addToCart(data);
      //@ts-ignore
      if (res?.data?.user) {
        message.success("Add to cart successfull");
      }
    } catch (error) {}
  };
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Property highlights
        </Typography>
        <Typography variant="body1" gutterBottom>
          Free private parking available on-site
        </Typography>
        {userId ? (
          <Button
            onClick={addToWishList}
            variant="outlined"
            startIcon={<FavoriteIcon />}
            fullWidth
          >
            Save
          </Button>
        ) : (
          <Button variant="outlined" fullWidth>
            Please Login First
          </Button>
        )}
        <div className="pt-3">
          {userId ? (
            <Link href={`/checkout?id=${id}&userId=${userId}`}>
              {" "}
              <Button variant="contained" className="bg-[#1976D2] " fullWidth>
                Reserve
              </Button>
            </Link>
          ) : (
            <Button variant="contained" className="bg-[#1976D2] " fullWidth>
              Login to access booking
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservedCard;
