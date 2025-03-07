import React, { useState, useContext, createContext, useEffect } from "react";
import { Outlet, useNavigate, useLocation, matchPath } from "react-router-dom";
import apiClient from "../axios/axiosInstance";
import { jwtDecode } from "jwt-decode";

import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import DehazeRoundedIcon from "@mui/icons-material/DehazeRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

import Nav from "./components/nav";
import ProfileMenu from "./components/profileMenu";
import Notifications from "./components/notifications";
import { useSubject } from "./components/subjectProvider";

const UserContext = createContext();
const SnackbarContext = createContext();

export const useUser = () => useContext(UserContext);
export const useSnackbar = () => useContext(SnackbarContext);

export default function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const { subjectName, setSubjectName } = useSubject();

  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
    severity: "info", // can be 'success', 'error', 'warning', or 'info'
  });

  const showSnackbar = ({ message, severity = "info" }) => {
    setSnackbarData({
      open: true,
      message,
      severity,
    });
  };

  const closeSnackbar = () => {
    setSnackbarData((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/aes/login");
        return;
      }

      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    } catch (error) {
      navigate("/aes/login");
    }

    const isInSubjectRoutes = matchPath(
      {
        path: "/aes/subject/:subject_id/*",
        end: false,
      },
      location.pathname
    );

    if (!isInSubjectRoutes) {
      setSubjectName("");
    }
  }, [location, user.profileImage]);

  useEffect(() => {
    console.log("USER:", user);
  }, [user]);

  return (
    <SnackbarContext.Provider value={{ showSnackbar, closeSnackbar }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            id="sidebar"
            sx={{
              bgcolor: sidebarOpen ? "var(--primary)" : "var(--accent)",
              width: sidebarOpen ? "15vw" : "4vw",
              paddingTop: sidebarOpen ? "0" : 5,
              paddingLeft: sidebarOpen ? "0" : 1.5,
              overflow: "hidden",
              height: "100vh",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              flexDirection: "column",
              transition: `all 0.5s ease-in-out`,
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                bgcolor: "var(--accent)",
                p: sidebarOpen ? "20%" : 0,
                borderRadius: sidebarOpen ? 0 : "0 0 5vh 0",
                width: sidebarOpen ? "100%" : 0,
                height: sidebarOpen ? "10vh" : "20%",
                justifyContent: "start",
                alignItems: "center",
                overflow: "hidden",
                transition: `all 0.5s ease-in-out`,
              }}
            >
              <Box
                sx={{
                  bgcolor: "var(--primary)",
                  height: 55,
                  minWidth: 55,
                  borderRadius: 55,
                }}
              ></Box>
              <Typography
                color="primary"
                sx={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                }}
              >
                AES
              </Typography>
            </Stack>
            <Stack
              sx={{
                width: "100%",
                margin: "70% 0 0 0",
                height: "100%",
                alignSelf: "center",
              }}
            >
              <Nav
                icon={DashboardRoundedIcon} // Pass the icon component here
                label="Home"
                navigateTo="/aes"
                sidebarOpen={sidebarOpen}
              />
              {[1, 3, 5].includes(user.role) && (
                <Nav
                  icon={AutoStoriesRoundedIcon} // Pass the icon component here
                  label="Subject Management"
                  navigateTo="subject_management"
                  sidebarOpen={sidebarOpen}
                />
              )}
              {[1, 3, 5].includes(user.role) && (
                <Nav
                  icon={MeetingRoomIcon} // Pass the icon component here
                  label="Classroom Management"
                  navigateTo="classroom_management"
                  sidebarOpen={sidebarOpen}
                />
              )}
              {[1, 5].includes(user.role) && (
                <Nav
                  icon={GroupRoundedIcon} // Pass the icon component here
                  label="User Managment"
                  navigateTo="user_management"
                  sidebarOpen={sidebarOpen}
                />
              )}
            </Stack>
          </Box>
          <Stack
            direction="column"
            sx={{
              width: sidebarOpen ? "85vw" : "97vw",
              height: "100vh",
              transition: `width 0.5s ease-in-out`,
            }}
          >
            <Stack
              id="header"
              direction="row"
              sx={{
                backgroundColor: "var(--primary)",
                p: "0 1%",
                height: "7.5vh",
                width: "100%",
                display: "text",
                justifyContent: "space-between",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Stack
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  color="accent"
                  variant="outlined"
                  disableElevation
                  onClick={handleToggleSidebar}
                >
                  {sidebarOpen ? (
                    <KeyboardDoubleArrowLeftRoundedIcon />
                  ) : (
                    <DehazeRoundedIcon />
                  )}
                </Button>
                <Typography variant="white" fontSize={"2rem"} fontWeight={600}>
                  {subjectName}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Notifications />
                <ProfileMenu user={user} />
              </Stack>
            </Stack>
            <Box
              id="content"
              sx={{
                backgroundColor: "#CCCCCC",
                height: "92.5vh",
                width: "100%",
                padding: "0.5rem",
                overflowY: "auto",
              }}
            >
              <Outlet />
            </Box>
          </Stack>
        </Box>
        <Snackbar
          open={snackbarData.open}
          autoHideDuration={6000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ marginTop: "3rem" }}
        >
          <Alert
            onClose={closeSnackbar}
            severity={snackbarData.severity}
            sx={{ width: "100%" }}
          >
            {snackbarData.message}
          </Alert>
        </Snackbar>
      </UserContext.Provider>
    </SnackbarContext.Provider>
  );
}
