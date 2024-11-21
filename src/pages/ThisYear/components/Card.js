import React from "react";
import { Typography, Card, CardActions, CardContent } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
const Cards = ({ title, data, icon }) => {
  return (
    <Card
      sx={{
        minWidth: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "0.3rem solid green",
        borderRadius: "0.4rem",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          textAlign: "center",
          pt: 5,
          pb: 5,
          minHeight: "70%",
        }}
      >
        {icon}
        {/* <SchoolIcon sx={{ fontSize: 50, mr: 1, color: "green" }} /> */}
        <Typography variant="h4" sx={{ color: "green" }}>
          {data}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          bgcolor: "green", // Shortened syntax for backgroundColor
          py: 1, // Vertical padding
          color: "white",
          minHeight: "30%",
        }}
      >
        <Typography variant="h5" fontWeight={550} sx={{ color: "white" }}>
          {title}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Cards;
