import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

const EventCard = (props) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
      <CardActionArea>
        <CardMedia component="img" height="180" image={props.img} alt="#" />
        <CardContent sx={{ backgroundColor: "black", color: "white" }}>
          <Typography gutterBottom variant="h6" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="gray">
            {props.description}
          </Typography>
          <div className="flex flex-row justify-between my-2">
            <Typography variant="body2" color="white">
              {props.date}
            </Typography>
            <Typography variant="body2" color="white">
              {props.time}
            </Typography>
          </div>
          <Typography variant="body2" color="white">
            Comedian : Pranit More
          </Typography>
          <Typography variant="body2" color="white">
            The Laugh Club, Mumbai
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default EventCard;
