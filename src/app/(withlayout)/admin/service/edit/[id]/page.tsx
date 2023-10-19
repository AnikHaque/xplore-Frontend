// /* eslint-disable @next/next/no-img-element */
// "use client";
// import React, { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   Grid,
//   Box,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
// } from "@mui/material";

// import {
//   useSingleServiceQuery,
//   useUpdateServiceMutation,
// } from "@/redux/slices/services/serviceApi";
// import { message } from "antd";
// import { useRouter } from "next/navigation";
// import { useCategoriesQuery } from "@/redux/slices/category/categoryApi";

// function ServiceEditForm({ params }: any) {
//   const { id } = params;
//   const { data: servData, refetch } = useSingleServiceQuery(id, {
//     refetchOnMountOrArgChange: true,
//   });
//   console.log(servData?.category?.category);
//   const {
//     control,
//     handleSubmit,

//     reset,
//     formState: { errors },
//   } = useForm();
//   const [serviceImage, setServiceImage] = useState({
//     thumbnail: "",
//   });
//   const [updateImage, setUpdateImage] = useState(false);
//   const router = useRouter();

//   const [updateService, { isLoading, isSuccess, error }] =
//     useUpdateServiceMutation();
//   const toggleImageUpdate = () => {
//     setUpdateImage((prev) => !prev); // Toggle the updateImage state
//   };
//   useEffect(() => {
//     if (error) {
//       //@ts-ignore
//       if ("data" in error) {
//         const errorData = error as any;
//         message.error(errorData.data.message);
//       } else {
//       }
//     }
//   }, [error]);
//   const onSubmit = async (data: any) => {
//     // console.log("Form data:", data, serviceImage);
//     try {
//       const serviceData = {
//         propertyName: data?.propertyName,
//         propertyLocation: data?.propertyLocation,
//         roomTitle: data?.roomTitle,
//         bedTitle: data?.bedTitle,
//         price: Number(data?.price),
//         propertyDetails: data?.propertyDetails,
//         availability: data?.availability,
//         numberOfGuest: data?.numberOfGuest,
//         houseRules: data?.houseRules,
//         facilities: data?.facilities,
//         status: data?.status,
//         thumbnail: serviceImage?.thumbnail,
//       };
//       console.log(serviceData);
//       const res = await updateService({ id, serviceData });
//       console.log(res);
//       //@ts-ignore
//       if (res?.data?.propertyName) {
//         message.success("Service Updated");
//         router.push("/admin/service");
//       }
//     } catch (error) {}
//     reset();
//   };
//   const handleImageChange = (e: any) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         //@ts-ignore
//         setServiceImage({ thumbnail: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="bg-gray-100 text-black p-3">
//       <Container>
//         <Typography variant="h5" gutterBottom>
//           Service Update Form
//         </Typography>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <Controller
//                 name="propertyName"
//                 control={control}
//                 defaultValue={servData?.propertyName}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Property Name"
//                     variant="outlined"
//                     fullWidth
//                     required
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid item xs={6}>
//               <Controller
//                 name="propertyLocation"
//                 control={control}
//                 defaultValue={servData?.propertyLocation}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Property Location"
//                     variant="outlined"
//                     fullWidth
//                     required
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <Controller
//                 name="roomTitle"
//                 control={control}
//                 defaultValue={servData?.roomTitle}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Room Title"
//                     variant="outlined"
//                     fullWidth
//                     required
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <Controller
//                 name="bedTitle"
//                 control={control}
//                 defaultValue={servData?.bedTitle}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Bed Title"
//                     variant="outlined"
//                     fullWidth
//                     required
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <Controller
//                 name="price"
//                 control={control}
//                 defaultValue={servData?.price}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Price"
//                     variant="outlined"
//                     fullWidth
//                     required
//                     type="number"
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <Controller
//                 name="availability"
//                 control={control}
//                 defaultValue={servData?.availability}
//                 rules={{ required: "Availability is required" }}
//                 render={({ field }) => (
//                   <FormControl fullWidth variant="outlined">
//                     <InputLabel>Availability</InputLabel>
//                     <Select {...field}>
//                       <MenuItem value="Available">Available</MenuItem>
//                       <MenuItem value="Unavailable">Unavailable</MenuItem>
//                     </Select>
//                   </FormControl>
//                 )}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <Controller
//                 name="numberOfGuest"
//                 control={control}
//                 defaultValue={servData?.numberOfGuest}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Number of Guests"
//                     variant="outlined"
//                     fullWidth
//                     required
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <Controller
//                 name="status"
//                 control={control}
//                 defaultValue={servData?.status}
//                 rules={{ required: "status is required" }}
//                 render={({ field }) => (
//                   <FormControl fullWidth variant="outlined">
//                     <InputLabel>Status</InputLabel>
//                     <Select {...field}>
//                       <MenuItem value="upcoming">Upcoming</MenuItem>
//                       <MenuItem value="in-progress">In Progress</MenuItem>
//                     </Select>
//                   </FormControl>
//                 )}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <Controller
//                 name="propertyDetails"
//                 control={control}
//                 defaultValue={servData?.propertyDetails}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Property Details"
//                     variant="outlined"
//                     fullWidth
//                     multiline
//                     required
//                     rows={3}
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <Controller
//                 name="houseRules"
//                 control={control}
//                 defaultValue={servData?.houseRules}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="House Rules"
//                     variant="outlined"
//                     fullWidth
//                     multiline
//                     required
//                     rows={3}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Controller
//                 name="facilities"
//                 control={control}
//                 defaultValue={servData?.facilities}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Facilities"
//                     variant="outlined"
//                     fullWidth
//                     multiline
//                     required
//                     rows={3}
//                   />
//                 )}
//               />
//             </Grid>

//             {/* <Grid item xs={12}>
//               <input
//                 type="file"
//                 accept="image/png, image/jpg, image/jpeg, image/webp"
//                 id="file"
//                 name="file"
//                 className="hidden"
//                 onChange={handleImageChange}
//               />
//               <label htmlFor="file">
//                 <Button variant="contained" component="span">
//                   Upload Image
//                 </Button>
//               </label>
//             </Grid>
//           </Grid>
//           {serviceImage && (
//             <img
//               src={servData?.thumbnail?.url}
//               alt="Uploaded Image"
//               style={{ width: "100%", marginTop: "1rem" }}
//             />
//           )} */}
//             <Grid item xs={12}>
//               <input
//                 type="file"
//                 accept="image/png, image/jpg, image/jpeg, image/webp"
//                 id="file"
//                 name="file"
//                 className="hidden"
//                 onChange={handleImageChange}
//                 disabled={!updateImage} // Disable file input when not updating
//               />
//               <label htmlFor="file">
//                 <Button variant="contained" component="span">
//                   Upload Image
//                 </Button>
//               </label>
//               <span>Update Image</span>
//               <input
//                 type="checkbox"
//                 checked={updateImage}
//                 onChange={toggleImageUpdate}
//               />
//             </Grid>
//           </Grid>
//           {serviceImage && (
//             <img
//               src={servData?.thumbnail?.url}
//               alt="Uploaded Image"
//               style={{ width: "100%", marginTop: "1rem" }}
//             />
//           )}
//           <Box mt={3}>
//             <Button type="submit" variant="contained" color="primary">
//               {isLoading ? "Updating..." : "Update Service"}
//             </Button>
//           </Box>
//         </form>
//       </Container>
//     </div>
//   );
// }

// export default ServiceEditForm;
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

import {
  useSingleServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/slices/services/serviceApi";
import { Spin, message } from "antd";
import { useRouter } from "next/navigation";
import { useCategoriesQuery } from "@/redux/slices/category/categoryApi";

function ServiceEditForm({ params }: any) {
  const { id } = params;
  const { data: servData, isLoading: serviceLoading } = useSingleServiceQuery(
    id,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [serviceImage, setServiceImage] = useState({
    thumbnail: "",
  });
  const [selectedImage, setSelectedImage] = useState(
    servData?.thumbnail?.url || ""
  ); // State for selected image URL
  const router = useRouter();

  const [updateImage, setUpdateImage] = useState(false); // State to track image update

  const toggleImageUpdate = () => {
    setUpdateImage((prev) => !prev); // Toggle the updateImage state
  };

  const [updateService, { isLoading, isSuccess, error }] =
    useUpdateServiceMutation();

  useEffect(() => {
    if (error) {
      //@ts-ignore
      if ("data" in error) {
        const errorData = error as any;
        message.error(errorData.data.message);
      } else {
        message.error("An error occurred");
      }
    }
  }, [error]);

  const onSubmit = async (data: any) => {
    try {
      const serviceData = {
        propertyName: data?.propertyName,
        propertyLocation: data?.propertyLocation,
        roomTitle: data?.roomTitle,
        bedTitle: data?.bedTitle,
        price: Number(data?.price),
        propertyDetails: data?.propertyDetails,
        availability: data?.availability,
        numberOfGuest: data?.numberOfGuest,
        houseRules: data?.houseRules,
        facilities: data?.facilities,
        status: data?.status,
        thumbnail: selectedImage, // Use the selected image URL
      };
      // console.log(serviceData);
      const res = await updateService({ id, serviceData });

      //@ts-ignore
      if (res?.data?.propertyName) {
        message.success("Service Updated");
        router.push("/admin/service");
      }
    } catch (error) {}

    reset();
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        //@ts-ignore
        setSelectedImage(reader.result);
        // setServiceImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {serviceLoading ? (
        <Spin size="large" />
      ) : (
        <div className="bg-gray-100 text-black p-3">
          <Container>
            <Typography variant="h5" gutterBottom>
              Service Update Form
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Controller
                    name="propertyName"
                    control={control}
                    defaultValue={servData?.propertyName}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Property Name"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    name="propertyLocation"
                    control={control}
                    defaultValue={servData?.propertyLocation}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Property Location"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="roomTitle"
                    control={control}
                    defaultValue={servData?.roomTitle}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Room Title"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="bedTitle"
                    control={control}
                    defaultValue={servData?.bedTitle}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Bed Title"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="price"
                    control={control}
                    defaultValue={servData?.price}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Price"
                        variant="outlined"
                        fullWidth
                        required
                        type="number"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="availability"
                    control={control}
                    defaultValue={servData?.availability}
                    rules={{ required: "Availability is required" }}
                    render={({ field }) => (
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Availability</InputLabel>
                        <Select {...field}>
                          <MenuItem value="Available">Available</MenuItem>
                          <MenuItem value="Unavailable">Unavailable</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="numberOfGuest"
                    control={control}
                    defaultValue={servData?.numberOfGuest}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Number of Guests"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue={servData?.status}
                    rules={{ required: "Status is required" }}
                    render={({ field }) => (
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Status</InputLabel>
                        <Select {...field}>
                          <MenuItem value="upcoming">Upcoming</MenuItem>
                          <MenuItem value="in-progress">In Progress</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="propertyDetails"
                    control={control}
                    defaultValue={servData?.propertyDetails}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Property Details"
                        variant="outlined"
                        fullWidth
                        multiline
                        required
                        rows={3}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="houseRules"
                    control={control}
                    defaultValue={servData?.houseRules}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="House Rules"
                        variant="outlined"
                        fullWidth
                        multiline
                        required
                        rows={3}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="facilities"
                    control={control}
                    defaultValue={servData?.facilities}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Facilities"
                        variant="outlined"
                        fullWidth
                        multiline
                        required
                        rows={3}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/webp"
                    id="file"
                    name="file"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={!updateImage} // Disable file input when not updating
                  />
                  <label htmlFor="file">
                    <Button variant="contained" component="span">
                      Upload Image
                    </Button>
                  </label>
                  <span>Update Image</span>
                  <input
                    type="checkbox"
                    checked={updateImage}
                    onChange={toggleImageUpdate}
                  />
                </Grid>
              </Grid>
              {serviceImage && (
                <img
                  src={selectedImage} // Use the selected image URL
                  alt="Uploaded Image"
                  style={{ width: "100%", marginTop: "1rem" }}
                />
              )}
              <Box mt={3}>
                <Button type="submit" variant="contained" color="primary">
                  {isLoading ? "Updating..." : "Update Service"}
                </Button>
              </Box>
            </form>
          </Container>
        </div>
      )}
    </>
  );
}

export default ServiceEditForm;
