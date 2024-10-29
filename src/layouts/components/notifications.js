import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import NotificationsIcon from "@mui/icons-material/Notifications";

const formatDate = () => {
  const date = new Date();
  const options = { month: "short", day: "numeric", year: "numeric" };
  const timeOptions = { hour: "numeric", minute: "2-digit" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const formattedTime = date
    .toLocaleTimeString("en-US", timeOptions)
    .toLowerCase();

  return `${formattedDate} ${formattedTime}`;
};

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        color="accent"
        sx={{ borderRadius: 100 }}
        onClick={handlePopoverOpen}
      >
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              p: "1rem 0",
              minWidth: "60vw",
            },
          },
        }}
      >
        <Typography variant="h6" sx={{ ml: "1rem", fontWeight: "bold" }}>
          Notifications
        </Typography>
        <Stack
          direction="row"
          sx={{
            m: "0 1rem",
            p: "0.5rem 0",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Apples in now on your Basket
          <Stack 
          spacing={1}
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography variant="caption">{formatDate()}</Typography>
            <Box
              sx={{
                bgcolor: "var(--primary)",
                height: "0.75rem",
                width: "0.75rem",
                borderRadius: "1rem",
              }}
            />
          </Stack>
        </Stack>
      </Popover>
    </>
  );
};

export default Notifications;
