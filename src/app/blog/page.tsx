"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Header from "@/components/layouts/Header";
import { Container, Grid } from "@mui/material";
import { useBlogsQuery } from "@/redux/slices/blog/blogApi";
import Pagination from "@mui/material/Pagination";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BlogCardList() {
  const [current, isCurrent] = React.useState(1);
  const [expanded, setExpanded] = React.useState(false);
  const { data: blogData } = useBlogsQuery({});
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //@ts-ignore
  const mapData = blogData?.blogs?.data;

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h5">Blogs</Typography>
        <Grid container spacing={2}>
          {mapData?.map((blog: any, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  title={blog?.title}
                  subheader={new Date(blog?.createdAt).toLocaleString("en-US", {
                    timeZone: "Asia/Dhaka",
                  })}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={blog?.avatar?.url}
                  alt={blog?.title}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {blog?.description.slice(0, 150)}...
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Full Blog Content:</Typography>
                    <Typography paragraph>{blog?.description}</Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div className="flex items-center justify-center bg-gray-100 p-3 my-3 rounded-sm ">
          <Pagination count={10} color="primary" page={current} />
        </div>
      </Container>
    </>
  );
}
