// /* eslint-disable @next/next/no-img-element */
// "use client";
// import React, { useState } from "react";
// import {
//   Container,
//   Paper,
//   Typography,
//   Grid,
//   TextField,
//   Button,
//   Rating,
//   Box,
//   Card,
//   CardContent,
// } from "@mui/material";
// import { useOverViewMutation } from "@/redux/slices/blog/blogApi";
// import { getUserInfo } from "@/services/auth.service";

// const OverviewForm = () => {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [overView, { isLoading, error }] = useOverViewMutation();
//   //@ts-ignore
//   const { role, userId } = getUserInfo() as any;

//   const handleRatingChange = (event: any, newValue: any) => {
//     setRating(newValue);
//   };

//   const handleCommentChange = async (event: any) => {
//     setComment(event.target.value);
//     try {
//       const data = { rating, comment };
//       const res = await overView(data);
//       console.log(res);
//     } catch (error) {}
//   };
//   // console.log({ rating, comment });
//   return (
//     <Container>
//       <Typography variant="h5" gutterBottom>
//         We would appreciate if you can take a couple of minutes to evaluate how
//         we are doing
//       </Typography>
//       <Paper elevation={3} style={{ padding: "20px" }}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <Card>
//               <CardContent>
//                 <Box
//                   display="flex"
//                   alignItems="center"
//                   justifyContent="center"
//                   height="100%"
//                   bgcolor="lightgray"
//                 >
//                   <img
//                     src="https://res.cloudinary.com/arafatleo/image/upload/v1697528239/hero/Customer_Survey-pana_kasgl1.png"
//                     alt="Image"
//                     style={{ width: "100%", height: "100%" }}
//                   />
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <Typography variant="subtitle1" gutterBottom>
//                   Ratings:
//                 </Typography>
//                 <Rating
//                   name="rating"
//                   value={rating}
//                   onChange={handleRatingChange}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Add a Comment"
//                   variant="outlined"
//                   fullWidth
//                   multiline
//                   required
//                   rows={4}
//                   value={comment}
//                   onChange={handleCommentChange}
//                 />
//               </Grid>
//             </Grid>
//             <div style={{ marginTop: "20px" }}>
//               {userId ? (
//                 <Button variant="contained" color="primary">
//                   {/* {role === "admin" ? "Only for user" : "Submit"} */}
//                   Submit
//                 </Button>
//               ) : (
//                 <Button variant="contained" color="primary">
//                   Login first
//                 </Button>
//               )}
//             </div>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Container>
//   );
// };

// export default OverviewForm;
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Rating,
  Box,
  Card,
  CardContent,
} from "@mui/material";

import { getUserInfo } from "@/services/auth.service";
import { useForm, Controller } from "react-hook-form";
import { useOverViewMutation } from "@/redux/slices/blog/blogApi";
import { message } from "antd";

const OverviewForm = () => {
  const { control, handleSubmit, setValue, watch } = useForm();

  const { userId, role } = getUserInfo() as any;

  const [overView, { isLoading }] = useOverViewMutation();

  const onSubmit = async (value: any) => {
    // console.log(value);
    const data = {
      user: userId,
      rating: value?.rating,
      comment: value?.comment,
    };

    try {
      const res = await overView(data);

      //@ts-ignore
      if (res?.data?.rating) {
        message.success("Thanks for your feedback");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" gutterBottom>
          We would appreciate if you can take a couple of minutes to evaluate
          how we are doing
        </Typography>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="100%"
                    bgcolor="lightgray"
                  >
                    <img
                      src="https://res.cloudinary.com/arafatleo/image/upload/v1697528239/hero/Customer_Survey-pana_kasgl1.png"
                      alt="Image"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Ratings:
                  </Typography>
                  <Controller
                    name="rating"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <Rating
                        name={field.name}
                        value={field.value}
                        onChange={(e, newValue) => field.onChange(newValue)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="comment"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label="Add a Comment"
                        variant="outlined"
                        fullWidth
                        multiline
                        required
                        rows={4}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <div style={{ marginTop: "20px" }}>
                {userId ? (
                  <Button type="submit" variant="contained" color="primary">
                    {role === "admin" ? "Only for user" : "Submit"}
                    {/* {isLoading ? "Submiting.." : "Submit"} */}
                  </Button>
                ) : (
                  <Button variant="contained" color="primary">
                    Login first
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </Container>
  );
};

export default OverviewForm;
