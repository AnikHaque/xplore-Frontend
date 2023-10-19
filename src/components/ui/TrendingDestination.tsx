// /* eslint-disable @next/next/no-img-element */
// "use client";
// import * as React from "react";
// import ImageList from "@mui/material/ImageList";
// import ImageListItem from "@mui/material/ImageListItem";
// import ImageListItemBar from "@mui/material/ImageListItemBar";
// import ListSubheader from "@mui/material/ListSubheader";
// import IconButton from "@mui/material/IconButton";
// import InfoIcon from "@mui/icons-material/Info";
// import { TreandingItemData } from "@/constants/images";
// import { Container, Typography } from "@mui/material";
// import { useCategoriesQuery } from "@/redux/slices/category/categoryApi";
// export default function TrendingDestination() {
//   const { data: categoryData } = useCategoriesQuery({});
//   console.log(categoryData?.categories);
//   return (
//     <Container>
//       <Typography variant="h5">Trending destinations</Typography>
//       <Typography>
//         Most popular choices for travellers from Bangladesh
//       </Typography>
//       <ImageList sx={{ width: "100%", height: 450 }}>
//         <ImageListItem key="Subheader" cols={2}></ImageListItem>
//         {TreandingItemData.map((item) => (
//           <ImageListItem key={item.img}>
//             <img
//               srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
//               src={`${item.img}?w=248&fit=crop&auto=format`}
//               alt={item.title}
//               loading="lazy"
//             />
//             <ImageListItemBar
//               title={item.title}
//               actionIcon={
//                 <IconButton
//                   sx={{ color: "rgba(255, 255, 255, 0.54)" }}
//                   aria-label={`info about ${item.title}`}
//                 >
//                   <InfoIcon />
//                 </IconButton>
//               }
//             />
//           </ImageListItem>
//         ))}
//       </ImageList>
//     </Container>
//   );
// }
/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { Container, Typography } from "@mui/material";
import { useCategoriesQuery } from "@/redux/slices/category/categoryApi";
import Link from "next/link";

export default function TrendingDestination() {
  const { data: categoryData } = useCategoriesQuery({});
  const categoriesToDisplay = categoryData?.categories.slice(0, 5);
  return (
    <Container>
      <Typography variant="h5">Trending destinations</Typography>
      <Typography>
        Most popular choices for travelers from Bangladesh
      </Typography>
      <ImageList sx={{ width: "100%", height: 450 }}>
        <ImageListItem key="Subheader" cols={2}></ImageListItem>
        {categoriesToDisplay?.map((category: any) => (
          <ImageListItem key={category._id}>
            <Link href={`/services?category=${category?._id}`}>
              {" "}
              <img
                srcSet={`${category?.thumbnail?.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${category?.thumbnail?.url}?w=248&fit=crop&auto=format`}
                alt={category?.category}
                loading="lazy"
              />
            </Link>
            <ImageListItemBar
              title={category?.category}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${category?.category}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
}
