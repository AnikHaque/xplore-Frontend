"use client";
import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Slider,
} from "@mui/material";
import dynamic from "next/dynamic";
import Alert from "@mui/material/Alert";
import ProductCard from "../Services/Card";
import Pagination from "@mui/material/Pagination";
import { useServicesQuery } from "@/redux/slices/services/serviceApi";
import { useCategoriesQuery } from "@/redux/slices/category/categoryApi";

import { useSearchParams } from "next/navigation";
import { useDebounced } from "@/redux/hooks";

const LayoutPage = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [error, setError] = useState("");
  // console.log(category);
  const query: Record<string, any> = {};
  //! state and query
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(3);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [serviceCategory, setServiceCategory] = useState<string>("");
  const [price, setPrice] = useState([0, 10000]);

  //! set query for filter and search
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  if (minPrice) {
    query["minPrice"] = minPrice;
  }
  if (maxPrice) {
    query["maxPrice"] = maxPrice;
  }

  if (serviceCategory) {
    query["category"] = serviceCategory;
  }

  if (categoryId) {
    query["category"] = categoryId;
  }
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  //! set query done

  const { data: servicesData } = useServicesQuery({ ...query });

  const { data: categoryData } = useCategoriesQuery({});
  // console.log(categoryData?.categories);
  const handlePriceChange = (event: any, newValue: any) => {
    setPrice(newValue);
  };
  const handlePageChange = (event: any, page: number) => {
    setPage(page);
  };
  const handleCategoryChange = (category: string) => {
    setServiceCategory(category);
  };
  const handleMinPriceChange = (e: any) => {
    const numericValue = parseFloat(e.target.value);
    if (!isNaN(numericValue)) {
      //@ts-ignore
      setMinPrice(numericValue);
      setError(""); // Clear any previous error
    } else {
      setMinPrice("");
      setError("Please enter a valid number");
    }
  };
  const handleMaxPriceChange = (e: any) => {
    const numericValue = parseFloat(e.target.value);
    if (!isNaN(numericValue)) {
      //@ts-ignore
      setMaxPrice(numericValue);
      setError(""); // Clear any previous error
    } else {
      setMaxPrice("");
      setError("Please enter a valid number");
    }
  };
  const handleClearPrice = () => {
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {/* Left Sidebar with Filters */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            <div className="pb-1">
              <TextField
                label="Min Price"
                variant="outlined"
                value={minPrice}
                fullWidth
                size="small"
                type="number"
                onChange={handleMinPriceChange}
              />
              {error && <Alert severity="error">{error}</Alert>}
            </div>
            <TextField
              label="Max Price"
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
            {error && <Alert severity="error">{error}</Alert>}
            <div className="pt-2">
              <Button
                onClick={handleClearPrice}
                variant="contained"
                className="bg-[#1976D2] "
                fullWidth
              >
                Clear
              </Button>
            </div>
            <Typography variant="subtitle1" style={{ marginTop: "16px" }}>
              Categories:
            </Typography>
            <FormControlLabel
              onClick={() => setServiceCategory("")}
              control={<Checkbox />}
              label="All"
            />
            {categoryData?.categories?.map((category) => (
              <div key={category?._id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={category?._id === serviceCategory}
                      onChange={() => handleCategoryChange(category?._id)}
                    />
                  }
                  label={category?.category}
                />
              </div>
            ))}
            <Typography variant="subtitle1" style={{ marginTop: "16px" }}>
              Price Range:
            </Typography>
            <Slider
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `$${value}`}
              step={10}
              min={0}
              max={10000}
              color="primary"
            />
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* Search Bar */}
              <Paper elevation={3} style={{ padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    size="small"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              {/* <ProductCard /> */}
              {servicesData?.services?.map((service: any) => (
                <Grid item xs={12} key={service.id}>
                  <ProductCard service={service} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <div className="flex items-center justify-center bg-gray-100 p-3 my-3 rounded-sm ">
            <Pagination
              count={servicesData?.meta?.total}
              color="primary"
              page={page}
              onChange={handlePageChange}
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

// export default LayoutPage;
export default dynamic(() => Promise.resolve(LayoutPage), {
  ssr: false,
});
