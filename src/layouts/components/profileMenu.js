import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem, Button, ListItemIcon } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import LockResetIcon from "@mui/icons-material/LockReset";
import Logout from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {
  Person,
  Person2Rounded,
  PersonAddAlt1Rounded,
  PersonOutlineOutlined,
  PersonOutlineRounded,
} from "@mui/icons-material";

import { useUser } from "../root_layout";
import apiClient from "../../axios/axiosInstance";

const ProfileMenu = (props) => {
  const { user, setUser } = useUser();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(
    localStorage.getItem("prof_img_url") || ""
  );
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
    localStorage.clear();
    navigate("/aes/login");
  };

  const getProfileImage = async () => {
    try {
      const response = await apiClient.post("/prof_img/getByID");
      const binaryString = atob(response.data);

      const byteArray = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
      }

      const fileBlob = new Blob([byteArray], {
        type: "image/jpeg", // Update MIME type based on the file, e.g., "image/png" or "application/pdf"
      });

      const fileURL = URL.createObjectURL(fileBlob);
      setProfileImg(fileURL)
      localStorage.setItem("profileImagURL", fileURL);

    } catch (error) {
      console.error("error:", error);
    }
  };

  useEffect(() => {
    const profileURL = localStorage.getItem("profileImagURL");
    if (profileURL) {
      setProfileImg(profileURL);
    }
  }, [user]);

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ textAlign: "center", alignItems: "center" }}
    >
      <Typography variant="white" sx={{ fontSize: "1rem" }}>
        {props.user.username}
      </Typography>
      <Avatar
        src={profileImg}
        onError={(e) => {
          console.log("Blob URL has expired");
          getProfileImage();
          // Handle the error here
        }}
        // src={
        //   props.user.prof_img_url
        //     ? props.user.prof_img_url
        //     : localStorage.getItem("prof_img_url")
        // }
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
            onClick={() => navigate("user_profile")}
          >
            <ListItemIcon>
              <Person fontSize="small" color="primary" />
            </ListItemIcon>
            Profile Information
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
