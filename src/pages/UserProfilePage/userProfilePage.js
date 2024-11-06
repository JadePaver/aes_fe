import {
  Stack,
  Typography,
  Box,
  Skeleton,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import apiClient from "../../axios/axiosInstance";
import { formatDate } from "../../const/formatter";

import { useSnackbar } from "../../layouts/root_layout";

const UserProfilePage = () => {
  const [isOpenChangePass, setIsOpenChangePass] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [password, setPassword] = useState({
    current: "",
    newPass: "",
    confirmNewPass: "",
  });
  const [passwordError, setPasswordError] = useState({
    confirmNewPass: "",
  });
  const token = localStorage.getItem("token");
  let user;
  if (token) {
    user = jwtDecode(token);
  }

  const handlePassInputChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
    setPasswordError("");
  };
  const [image, setImage] = useState(false);
  const [userData, setUserData] = useState({});

  const handleChangePass = async () => {
    if (password.newPass.length < 6) {
      setPasswordError({
        newPass: "New password must be at least 6 characters",
      });
      return; // Stop here if the new password is too short
    }

    if (password.newPass !== password.confirmNewPass) {
      setPasswordError({
        confirmNewPass: "Passwords do not match",
      });
      return; // Stop here if passwords don't match
    }

    try {
      const response = await apiClient.post(
        `/users/change_pass/${user.id}`,
        password,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPassword({
        current: "",
        newPass: "",
        confirmNewPass: "",
      });
      console.log("response:", response);
      setIsOpenChangePass(false)
      showSnackbar({
        message: response?.data?.message,
        severity: "success",
      });
      // Handle successful response if necessary
    } catch (error) {
      console.error("Error changing password:", error);
      showSnackbar({
        message: error.response.data.error,
        severity: "error",
      });
      if (error.response && error.response.data && error.response.data.error) {
        // If there's an error message from the backend, set it
        setPasswordError({
          current: error.response.data.error, // Set the error for current password
        });
      }
    }
  };

  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        console.log("user:", user);
        const response = await apiClient.post(
          `/users/profile/${user.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
        console.log("response:", response.data);
        // setImage(response.data.imageUrl);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (user) {
      getProfileInfo();
    }
  }, []);

  return (
    <>
      <Stack
        spacing={1}
        sx={{
          padding: "0.1rem",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Grid
          container
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            borderRadius: "0.2rem",
            p: "1rem",
            overflowY: "auto",
            maxHeight: "calc(100vh - 2rem)",
          }}
        >
          <Grid size={12} spacing={2}>
            <Grid
              item
              size={{ md: 12 }}
              paddingBlockEnd={3}
              sx={{ height: "60%", minHeight: "200px" }}
            >
              {image ? (
                <Box
                  component="img"
                  src={image}
                  alt="User Profile"
                  sx={{
                    bgcolor: "#f0f0f0",
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    minHeight: "200px",
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      position: "absolute",
                      p: 0,
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      opacity: 1,
                      zIndex: 2,
                      transition: "opacity 0.3s",
                      "&:hover": {
                        opacity: 1,
                      },
                    }}
                  >
                    <Typography variant="h6">+ Add Profile Image</Typography>
                  </Button>

                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      p: 0,
                      overflow: "hidden",
                    }}
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        width: "100%",
                        height: "100%",
                        bgcolor: "#f0f0f0",
                        color: "#888",
                        fontSize: "1.5rem",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={5}
                        alignItems="center"
                        justifyContent="space-evenly"
                        sx={{
                          width: "100%",
                          height: "100%",
                          minHeight: "200px",

                          p: "1rem",
                        }}
                      >
                        <Skeleton
                          variant="circular"
                          animation={false}
                          sx={{
                            width: "20%",
                            height: 0,
                            paddingBottom: "20%",
                          }}
                        />
                        <Stack
                          spacing={2}
                          sx={{
                            width: "60%",
                            height: "100%",
                          }}
                        >
                          <Skeleton
                            variant="rectangular"
                            sx={{
                              width: "100%",
                              minHeight: "40%",
                              flexGrow: 1,
                            }}
                          />
                          <Skeleton
                            variant="rectangular"
                            sx={{
                              width: "100%",
                              minHeight: "40%",
                              flexGrow: 1,
                            }}
                          />
                        </Stack>
                      </Stack>
                    </Grid>
                  </Box>
                </Box>
              )}
            </Grid>

            <Grid container size={{ md: 12 }}>
              <Grid item size={{ md: 6 }}>
                {" "}
                {/* Added padding for better spacing */}
                <Typography variant="body1" fontWeight={600}>
                  Name:
                </Typography>
                <Grid container spacing={1} paddingBlockEnd={1}>
                  {" "}
                  {/* Added spacing between rows */}
                  <Grid item size={{ xs: 6, md: 2 }}>
                    <Typography>First:</Typography>
                  </Grid>
                  <Grid item size={{ xs: 6, md: 10 }}>
                    {" "}
                    {/* Adjusted to use the remaining space */}
                    <Typography variant="black">{userData?.fName}</Typography>
                  </Grid>
                  <Grid item size={{ xs: 6, md: 2 }}>
                    <Typography>Last:</Typography>
                  </Grid>
                  <Grid item size={{ xs: 6, md: 10 }}>
                    <Typography variant="black">{userData?.lName}</Typography>
                  </Grid>
                  <Grid item size={{ md: 2 }}>
                    <Typography>Middle:</Typography>
                  </Grid>
                  <Grid item size={{ md: 10 }}>
                    <Typography variant="black">{userData?.mName}</Typography>
                  </Grid>
                  <Grid item size={{ md: 2 }}>
                    <Typography>Ext:</Typography>
                  </Grid>
                  <Grid item size={{ md: 10 }}>
                    <Typography variant="black">
                      {userData?.ext_name}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="body1" fontWeight={600}>
                  Other Information:
                </Typography>
                <Grid container spacing={1}>
                  <Grid item size={{ xs: 6, md: 2 }}>
                    <Typography>Birthdate:</Typography>
                  </Grid>
                  <Grid item size={{ xs: 6, md: 10 }}>
                    <Typography variant="black">
                      {userData?.birthDate
                        ? formatDate(userData.birthDate)
                        : "Date not available"}
                    </Typography>
                  </Grid>
                  <Grid item size={{ xs: 6, md: 2 }}>
                    <Typography>Sex:</Typography>
                  </Grid>
                  <Grid item size={{ xs: 6, md: 10 }}>
                    <Typography variant="black">
                      {userData?.sex?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item size={{ md: 6 }}>
                <Typography variant="body1" fontWeight={600}>
                  Contact:
                </Typography>
                <Grid container spacing={1} paddingBlockEnd={1}>
                  <Grid item size={{ xs: 6, md: 2 }}>
                    <Typography>Phone #:</Typography>
                  </Grid>
                  <Grid item size={{ xs: 6, md: 10 }}>
                    <Typography variant="black">{userData?.contact}</Typography>
                  </Grid>
                  <Grid item size={{ xs: 6, md: 2 }}>
                    <Typography>Email:</Typography>
                  </Grid>
                  <Grid item size={{ xs: 6, md: 10 }}>
                    <Typography variant="black">{userData?.email}</Typography>
                  </Grid>
                </Grid>
                <Typography variant="body1" fontWeight={600}>
                  Account Information:
                </Typography>
                <Grid container spacing={1}>
                  <Grid item size={{ xs: 6, md: 2 }}>
                    <Typography>Username:</Typography>
                  </Grid>
                  <Grid item size={{ xs: 6, md: 10 }}>
                    <Typography variant="black">
                      {userData?.username}
                    </Typography>
                  </Grid>
                  <Grid item size={{ xs: 12, md: 12 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setIsOpenChangePass(true)}
                    >
                      Change password
                    </Button>{" "}
                    show a modal with "type prev password" and 2 fields for
                    newpass and confirm newpass
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
      <Dialog
        open={isOpenChangePass}
        onClose={() => setIsOpenChangePass(false)}
      >
        <DialogTitle textAlign="center">
          <Typography variant="h6" fontWeight={600}>
            Change Password
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            size={12}
            columnSpacing={2}
            rowSpacing={2}
            sx={{ m: "1rem 0" }}
          >
            <Grid item size={{ md: 12 }} paddingBlockEnd={2}>
              <TextField
                name="current"
                fullWidth
                value={password.current}
                type="password"
                label="Type Current Password"
                onChange={handlePassInputChange}
                error={!!passwordError.current}
                helperText={passwordError.current}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />
            </Grid>
            <Grid item size={{ md: 12 }}>
              <TextField
                required
                name="newPass"
                fullWidth
                value={password.newPass}
                type="password"
                label="New Password"
                onChange={handlePassInputChange}
                error={!!passwordError.newPass} // Show error state
                helperText={passwordError.newPass} // Display error message if newPass is too short
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />
            </Grid>
            <Grid item size={{ md: 12 }}>
              <TextField
                required
                name="confirmNewPass"
                fullWidth
                value={password.confirmNewPass}
                type="password"
                label="Confirm New Password"
                onChange={handlePassInputChange}
                error={!!passwordError.confirmNewPass} // Show error state
                helperText={passwordError.confirmNewPass} // Display error message
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: "1.5rem", pt: 0 }}>
          <Button
            variant="contained"
            fullWidth
            disableElevation
            sx={{ p: "0.5rem 0" }}
            onClick={handleChangePass}
          >
            UPDATE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserProfilePage;
