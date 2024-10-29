import React from "react";
import { Stack, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Nav = (props) => {
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Button
        variant="outlined"
        color={props.sidebarOpen ? "accent": "primary"}
        sx={{
          borderRadius: 0,
          width: "100%",
          border: props.sidebarOpen?"":"none",
          padding: ".75rem",
          transition: `all 0.5s ease-in-out`,
          "&:hover": {
            border: props.sidebarOpen ?"":"none", // Ensure no border on hover
          },
        }}
        onClick={() => navigate(props.navigateTo)}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between", // Space between icon and button
            alignItems: "center",
          }}
        >
          <props.icon sx={{ height: "26.5px", width: "26.5px", margin: "auto" }} />
          <Typography
            sx={{
              color: "var(--accent)", // Adjust based on your theme variables
              width: props.sidebarOpen ? "100%":"0px",
              textAlign: "left",
              fontSize:"0.8rem",
              fontWeight:500,
              transition: "width 0.3s ease-in-out",
            }}
          >
            {props.label}
          </Typography>
        </Stack>
      </Button>
    </Stack>
  );
};

export default Nav;
