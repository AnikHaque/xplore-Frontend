/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAddToCartMutation } from "@/redux/slices/services/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import { message } from "antd";
const Card = ({ service }: any) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  // console.log(service);
  const { thumbnail, propertyName, propertyLocation, ratings, price, _id } =
    service;
  const [addToCart, { isLoading, error }] = useAddToCartMutation();
  const { userId } = getUserInfo() as any;
  useEffect(() => {
    if (error) {
      //@ts-ignore
      if ("data" in error) {
        const errorData = error as any;
        message.error(errorData.data.message);
      }
    }
  }, [error]);
  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };
  const addToWishList = async () => {
    try {
      const data = {
        userId,
        serviceId: _id,
      };
      const res = await addToCart(data);
      //@ts-ignore
      if (res?.data?.user) {
        message.success("Add to cart successfull");
      }
    } catch (error) {}
  };
  return (
    <div>
      <article className="border border-gray-200 overflow-hidden bg-white shadow-sm rounded mb-5">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 flex p-3">
            <div>
              <img
                className="h-[200px] w-[200px] rounded-md"
                src={thumbnail?.url}
                alt={propertyName}
              />
            </div>
          </div>
          <div className="md:w-2/4">
            <div className="p-4">
              <p className="text-black text-[20px] font-semibold ">
                {propertyName}
              </p>
              <div className="flex flex-wrap items-center space-x-2 mb-2">
                <div className="ratings">
                  <div className="my-1">
                    <Rating
                      name="rating"
                      value={ratings ? ratings : 4}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                </div>
                <b className="text-gray-300">Out Of</b>
                <span className="ml-1 text-yellow-500">5</span>
              </div>
              <p className="text-black mb-2">
                <LocationOnIcon fontSize="small" /> Location: {propertyLocation}
              </p>
            </div>
          </div>
          <div className="md:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-200">
            <div className="p-5">
              <span className="text-xl font-semibold text-black">${price}</span>
              <p className="text-green-500">Per nights / 2 adults</p>

              <div className="my-3">
                <Link href={`/services/${_id}`}>
                  <span className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer">
                    {" "}
                    See Availability
                  </span>
                </Link>

                {/* Add the heart icon for wishlist */}
                <button onClick={addToWishList}>
                  <FavoriteIcon
                    color={isInWishlist ? "error" : "action"}
                    style={{ cursor: "pointer" }}
                    onClick={toggleWishlist}
                    fontSize="large"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Card;
