import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const GradesProgress = ({ value=0, thickness = 10, size = 40 }) => {
  // Determine the color based on the value
  const color =
    value < 50 ? "red" : `rgb(${(100 - value) * 2.55}, ${value * 2.55}, 0)`;

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
        }}
      >
        <CircularProgress
          variant="determinate"
          value={value}
          size={size}
          thickness={thickness}
          sx={{
            color: color,
          }}
        />
        <Typography
          variant="caption"
          component="div"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </>
  );
};

export default GradesProgress;
