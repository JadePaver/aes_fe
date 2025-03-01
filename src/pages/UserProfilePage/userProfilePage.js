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

import { useUser, useSnackbar } from "../../layouts/root_layout";
import { AddPhotoAlternate } from "@mui/icons-material";
import LockResetIcon from "@mui/icons-material/LockReset";
import EditIcon from "@mui/icons-material/Edit";

import EditableTextField from "./components/EditableTextField";
import EditableDatePicker from "./components/EditableDatePicker";
import EditableSelect from "./components/EditableSelect";

const UserProfilePage = () => {
  const token = localStorage.getItem("token");
  const { user, setUser } = useUser();
  const [isEditable, setIsEditable] = useState(false);
  const [errors, setErrors] = useState({});

  let userDetails;
  if (token) {
    userDetails = jwtDecode(token);
  }
  const [isOpenChangePass, setIsOpenChangePass] = useState(false);
  const { showSnackbar } = useSnackbar();

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setSelectedImage(file);
      setOpenConfirmDialog(true);
    }
  };

  const handleCancel = () => {
    setPreviewImage(null);
    setOpenConfirmDialog(false);
  };

  const [userData, setUserData] = useState({});
  const [editUserData, setEditUserData] = useState({});
  const [isEditProfOpen, setIsEditProfOpen] = useState(false);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    setErrors({});
  };

  const handleEditProfile = () => {
    setIsEditable(!isEditable);
    setEditUserData(userData);
  };

  const handleConfirmEdit = async () => {
    // Await validateEdit to ensure it completes before continuing
    const isValid = await validateEdit();

    if (!isValid) {
      return; // Exit if validation fails
    }

    setIsEditProfOpen(true);
  };

  const profileEditDialogConfirm = async () => {
    try {
      const response = await apiClient.post(
        `/users/update_profile_details/${userDetails.id}`,
        userData
      );
      setIsEditProfOpen(false);
      setIsEditable(false);
      showSnackbar({
        message: response?.data?.message,
        severity: "success",
      });
    } catch (error) {}
  };

  const handleCancelEdit = () => {
    getProfileInfo();
    setIsEditable(false);
  };

  // Change Password
  const [password, setPassword] = useState({
    current: "",
    newPass: "",
    confirmNewPass: "",
  });
  const [passwordError, setPasswordError] = useState({
    confirmNewPass: "",
  });

  //onchange and validation
  const handlePassInputChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
    setPasswordError("");
  };

  const isUsernameTaken = async (username) => {
    try {
      const response = await apiClient.post(
        `/users/check-username/${userDetails.id}`,
        { username }
      );
      return response.data.available; // Assuming the API response contains { available: true/false }
    } catch (error) {
      console.error("Error checking username:", error);
      return false; // Treat any error as 'username not available'
    }
  };

  const validateEdit = async () => {
    const editErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Required field validations
    if (!(userData.fName || "").trim())
      editErrors.fName = "First Name is required";
    if (!(userData.lName || "").trim())
      editErrors.lName = "Last Name is required";
    if (!(userData.mName || "").trim())
      editErrors.mName = "Middle Name is required";
    if (!userData.sex_id) editErrors.sex_id = "Sex is required";
    if (!(userData.contact || "").trim())
      editErrors.contact = "Contact # is required";
    if (!(userData.email || "").trim()) {
      editErrors.email = "Email is required";
    } else if (!emailRegex.test(userData.email)) {
      editErrors.email = "Enter a valid email address";
    }

    // Username validation: check if empty or already taken
    if (!(userData.username || "").trim()) {
      editErrors.username = "Username is required";
    } else {
      const isUsernameAvailable = await isUsernameTaken(
        userData.username,
        userData.id
      ); // Pass user ID if needed
      if (!isUsernameAvailable) {
        editErrors.username = "Username is already taken";
      }
    }

    setErrors(editErrors);
    return Object.keys(editErrors).length === 0;
  };

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
        `/users/change_pass/${userDetails.id}`,
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
      setIsOpenChangePass(false);
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

  const fetchImage = async (filename) => {
    try {
      const response = await apiClient.get(`/prof_img/get/${filename}`, {
        responseType: "blob",
      });
      const imageBlob = response.data;
      const imageObjectUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageObjectUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const getProfileInfo = async () => {
    try {
      const response = await apiClient.post(
        `/users/profile/${userDetails.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data);
      if (response.data?.profile_image) {
        fetchImage(response.data?.profile_image.file);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleConfirm = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("profileImage", selectedImage);

      try {
        const response = await apiClient.post(
          `/prof_img/upload/${userDetails.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        localStorage.setItem("token", response.data.newToken);
        showSnackbar({
          message: response?.data?.message,
          severity: "success",
        });

        getProfileInfo();

        const binaryString = atob(response.data.fileBase64);

        const byteArray = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          byteArray[i] = binaryString.charCodeAt(i);
        }

        const fileBlob = new Blob([byteArray], {
          type: "image/jpeg", // Update MIME type based on the file, e.g., "image/png" or "application/pdf"
        });

        const fileURL = URL.createObjectURL(fileBlob);

        localStorage.setItem("profileImagURL", fileURL);

        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    setSelectedImage(previewImage);
    setPreviewImage(null);
    setOpenConfirmDialog(false);
  };

  const [imageUrl, setImageUrl] = useState("");

  const [sex, setSex] = useState([]);

  useEffect(() => {
    if (userDetails) {
      getProfileInfo();
    }
    const getSex = async () => {
      const response = await apiClient.get("/sex");
      setSex(response.data);
    };

    getSex();
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
              {imageUrl ? (
                <>
                  <Box
                    sx={{
                      position: "relative", // Enable absolute positioning within this container
                      width: "100%",
                      height: "100%",
                      maxHeight: "400px",
                      bgcolor: "#f0f0f0",
                      borderRadius: "0.2rem",
                      overflow: "hidden",
                    }}
                  >
                    {/* Image */}
                    <Box
                      component="img"
                      src={imageUrl}
                      alt="User Profile"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Button
                      variant="outlined"
                      color="primary" // Use "primary" or a color defined in your theme
                      startIcon={<AddPhotoAlternate />}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        minWidth: "auto",
                      }}
                      component="label"
                    >
                      Change Profile Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </Button>
                  </Box>
                </>
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
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
                      transition: "opacity 0.3s",
                      "&:hover": {
                        opacity: 1,
                      },
                    }}
                    component="label"
                  >
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {!selectedImage && (
                      <Typography variant="h6">+ Add Profile Image</Typography>
                    )}
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
            <Grid container size={{ md: 12 }} columnSpacing={5}>
              <Grid item size={{ md: 6 }}>
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
                    <EditableTextField
                      name="fName"
                      value={userData?.fName}
                      isEditable={isEditable}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      error={!!errors.fName}
                      helperText={errors.fName}
                    />
                  </Grid>
                  <Grid item size={{ xs: 6, md: 2 }}>
                    <Typography>Last:</Typography>
                  </Grid>
                  <Grid item size={{ xs: 6, md: 10 }}>
                    <EditableTextField
                      name="lName"
                      value={userData?.lName}
                      isEditable={isEditable}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      error={!!errors.lName}
                      helperText={errors.lName}
                    />
                  </Grid>
                  <Grid item size={{ md: 2 }}>
                    <Typography>Middle:</Typography>
                  </Grid>
                  <Grid item size={{ md: 10 }}>
                    <EditableTextField
                      name="mName"
                      value={userData?.mName}
                      isEditable={isEditable}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      error={!!errors.mName}
                      helperText={errors.mName}
                    />
                  </Grid>
                  <Grid item size={{ md: 2 }}>
                    <Typography>Ext:</Typography>
                  </Grid>
                  <Grid item size={{ md: 10 }}>
                    <EditableTextField
                      name="ext_name"
                      value={userData?.ext_name}
                      isEditable={isEditable}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      error={!!errors.ext_name}
                      helperText={errors.ext_name}
                    />
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
                    <EditableDatePicker
                      value={userData.birthDate}
                      isEditable={isEditable} // make editable
                      onChange={(newDate) => {
                        setUserData((prevUserData) => ({
                          ...prevUserData,
                          birthDate: newDate, // update birthDate in state
                        }));
                      }} // update birthDate when changed
                      name="birthDate"
                      placeholder="Date of Birth *"
                    />
                  </Grid>
                  <Grid item size={{ xs: 6, md: 2 }}>
                    <Typography>Sex:</Typography>
                  </Grid>
                  <Grid item size={{ xs: 6, md: 10 }}>
                    <EditableSelect
                      value={userData?.sex_id} // Use the `sex_id` value for selection
                      handleChange={(event) => {
                        const updatedSexId = event.target.value;
                        setUserData({
                          ...userData,
                          sex_id: updatedSexId,
                          sex: sex.find((option) => option.id === updatedSexId), // Update the `sex` label as well
                        });
                      }}
                      isEditable={isEditable} // Toggle between editable and non-editable states
                      sex={sex}
                    />
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
                    <EditableTextField
                      name="contact"
                      value={userData?.contact}
                      isEditable={isEditable}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      error={!!errors.contact}
                      helperText={errors.contact}
                    />
                  </Grid>
                  <Grid item size={{ xs: 6, md: 2 }}>
                    <Typography>Email:</Typography>
                  </Grid>
                  <Grid item size={{ xs: 6, md: 10 }}>
                    <EditableTextField
                      name="email"
                      value={userData?.email}
                      isEditable={isEditable}
                      onChange={handleInputChange}
                      placeholder="Email"
                      error={!!errors.email}
                      helperText={errors.email}
                    />
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
                    <EditableTextField
                      name="username"
                      value={userData?.username}
                      isEditable={isEditable}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      error={!!errors.username}
                      helperText={errors.username}
                    />
                  </Grid>
                  <Grid item size={{ xs: 12, md: 12 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setIsOpenChangePass(true)}
                      startIcon={
                        <LockResetIcon fontSize="small" color="primary" />
                      }
                    >
                      Change Password
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 12, md: 12 }}>
                    {" "}
                    {isEditable ? (
                      <>
                        <Button variant="contained" onClick={handleConfirmEdit}>
                          Save Changes
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={handleEditProfile}
                        startIcon={<EditIcon fontSize="small" />}
                      >
                        Edit Profile Information
                      </Button>
                    )}
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
      <Dialog open={openConfirmDialog} onClose={handleCancel}>
        <DialogTitle textAlign="center">
          <Typography variant="h6" fontWeight={600}>
            Change Profile Image
          </Typography>
        </DialogTitle>
        <DialogContent>
          <img
            src={previewImage}
            alt="Preview"
            style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
          />
        </DialogContent>
        <DialogActions>
          <Stack
            direction="row"
            spacing={4}
            sx={{
              minWidth: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button size="large" onClick={handleCancel} color="secondary">
              Cancel
            </Button>
            <Button
              size="large"
              variant="contained"
              onClick={handleConfirm}
              color="primary"
              disableElevation
            >
              Confirm
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
      <Dialog open={isEditProfOpen} onClose={() => setIsEditProfOpen(false)}>
        <DialogTitle>Confirm Profile Information Changes</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            sx={{ minWidth: "100%" }}
          >
            <Button
              variant="contained"
              disableElevation
              onClick={profileEditDialogConfirm}
            >
              Confirm
            </Button>
            <Button variant="outlined" onClick={() => setIsEditProfOpen(false)}>
              Cancel
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserProfilePage;
