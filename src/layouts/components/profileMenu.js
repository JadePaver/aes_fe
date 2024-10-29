import React, { useState } from "react";
import { Avatar, Menu, MenuItem, Button, ListItemIcon } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import LockResetIcon from "@mui/icons-material/LockReset";
import Logout from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const ProfileMenu = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setUserMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setUserMenuOpen(false);
    setAnchorEl(null);
  };

  return (
    <Stack direction="row" spacing={2} sx={{ textAlign: "center", alignItems: "center" }}>
      <Typography variant="white" sx={{ fontSize: "1rem" }}>
        Jane Smith
      </Typography>
      <Avatar
        alt="Profile Image"
        sx={{ cursor: "pointer" }}
        onClick={handleMenuOpen}
      />
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={userMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            disableElevation
            sx={{ justifyContent: "flex-start" }}
          >
            <ListItemIcon>
              <ImageIcon fontSize="small" color="primary" />
            </ListItemIcon>
            Change Profile Image
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            disableElevation
            sx={{ justifyContent: "flex-start" }}
          >
            <ListItemIcon>
              <LockResetIcon fontSize="small" color="primary" />
            </ListItemIcon>
            Change Password
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disableElevation
            sx={{ justifyContent: "flex-start" }}
          >
            <ListItemIcon>
              <Logout fontSize="small" color="accent" />
            </ListItemIcon>
            Logout
          </Button>
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export default ProfileMenu;
