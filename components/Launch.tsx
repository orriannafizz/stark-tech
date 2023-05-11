import React from "react";
import { LaunchProps } from "./Table";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

interface LaunchRowProps extends LaunchProps {
  key: string;
}

const Launch: React.FC<LaunchRowProps> = ({
  id,
  name,
  date_utc,
  success,
  details,
  pics,
}) => {
  return (
    <Card
      sx={
        {
          /*maxWidth: 345*/
        }
      }>
      <CardMedia
        component="img"
        alt={name}
        image={pics[0]}
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="uppercase">
          {name}
        </Typography>
        <Button
          href={id}
          variant="outlined"
          style={{ color: "black", borderColor: "black" }}>
          Learn more ...
        </Button>
      </CardContent>
    </Card>
  );
};

export default Launch;
