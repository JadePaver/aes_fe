import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import Snackbar from "@mui/material/Snackbar";
import LinearProgress from "@mui/material/LinearProgress";
import KeyIcon from "@mui/icons-material/Key";

import apiClient from "../../axios/axiosInstance";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear specific field error on change
    }));
    setLoginError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

      console.log("logging in:");
      try {
      const response = await apiClient.post("/users/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("User logged in successfully:", response);
      localStorage.setItem("token", response.data.token);
      navigate("/aes");
    } catch (error) {
      console.log("error:", error);

      let errorMessage;
      if (error.code === "ERR_NETWORK") {
        errorMessage = "An error occurred. Please try again.";
      } else {
        errorMessage = "Invalid username or password";
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: formData.username ? "" : "Username is required",
          password: formData.password ? "" : "Password is required",
        }));
      }

      setLoginError(errorMessage);
      console.error("Login error:", errorMessage);
    } finally {
      setLoading(false); // Always stop loading
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage: `
          linear-gradient(to bottom right,  rgba(0, 128, 0, 0), rgba(0, 128, 0, 0.7)),
          url('/aes_bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction="row"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            direction="row"
            sx={{
              p: "0 2vw",
              flex: 1.5,
            }}
          >
            <Box
              sx={{
                maxHeight: "300px",
                minHeight: "300px",
                maxWidth: "300px",
                minWidth: "300px",
                borderRadius: "50%",
                bgcolor: "white",
                margin: "auto 0",
                boxShadow: 2,
              }}
            />
            <Typography
              variant="white"
              sx={{
                fontSize: "4rem",
                fontWeight: 600,
                lineHeight: 2,
                maxWidth: "1rem",
                marginLeft: "2rem",
              }}
            >
              ADVANCE EDUCATIONAL SMART SYSTEM
            </Typography>
          </Stack>
          <Stack
            sx={{
              bgcolor: "var(--accent)",
              minHeight: "100%",
              width: "100%",
              flex: 1,
            }}
          >
            <Card
              sx={{
                m: "auto",
                p: "17% 10%",
                minWidth: "65%",
              }}
              elevation={3}
            >
              <Stack
                component="form"
                direction="column"
                sx={{ alignItems: "end" }}
                onSubmit={handleLogin}
              >
                <Stack
                  direction="column"
                  spacing={2}
                  fullWidth
                  sx={{ width: "100%" }}
                >
                  {loginError && ( // Display error message if it exists
                    <Typography
                      color="error"
                      variant="caption"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "red", // Optional: Change the text color to red for better visibility
                        marginTop: 2, // Optional: Add some space above the error message
                      }}
                    >
                      {loginError}
                    </Typography>
                  )}
                  <TextField
                    fullWidth
                    color="primary"
                    name="username"
                    label="Username"
                    onChange={handleChange}
                    error={!!errors.username}
                    helperText={errors.username}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon
                            color={errors.username ? "error" : "primary"}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    type="password"
                    name="password"
                    label="Password"
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon
                            color={errors.password ? "error" : "primary"}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>

                <Button
                  sx={{ fontSize: "0.75rem" }}
                  onClick={() => {
                    navigate("/aes/register");
                  }}
                >
                  Register
                </Button>
                {loading && (
                  <>
                    <Stack sx={{ minWidth: "100%"}}>
                      <LinearProgress
                      color="primary"
                        sx={{borderRadius: "5px" }} // Customize LinearProgress
                      />
                    </Stack>
                  </>
                )}

                <Button
                  size="large"
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: "20%" }}
                  disableElevation
                  type="submit"
                >
                  LOG IN
                </Button>
              </Stack>
            </Card>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Login;
