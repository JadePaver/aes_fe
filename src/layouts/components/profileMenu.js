import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem, Button, ListItemIcon } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import LockResetIcon from "@mui/icons-material/LockReset";
import Logout from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Person, Person2Rounded, PersonAddAlt1Rounded, PersonOutlineOutlined, PersonOutlineRounded } from "@mui/icons-material";

const ProfileMenu = (props) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();


  const handleMenuOpen = (event) => {
    setUserMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setUserMenuOpen(false);
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/aes/login")
  }

  return (
    <Stack direction="row" spacing={2} sx={{ textAlign: "center", alignItems: "center" }}>
      <Typography variant="white" sx={{ fontSize: "1rem" }}>
        {props.user.username}
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
            onClick={()=>navigate("user_profile")}
          >
            <ListItemIcon>
              <Person fontSize="small" color="primary" />
            </ListItemIcon>
            Profile Details
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
            onClick={handleLogout}
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
