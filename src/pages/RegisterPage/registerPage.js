import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { gradeLevels, userTypes } from "../../const/var";
import { Password } from "@mui/icons-material";

const steps = [
  "Step 1: Basic Information",
  "Step 2: Contact Information",
  "Step 3: Create Account",
  "Done!",
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fname: "",
    ename: "",
    lname: "",
    mname: "",
    birthDate: selectedDate,
    sex: "",
    contact: "",
    email: "",
    type: 2,
    glevel: 1,
    studentCode: "",
    username: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("data:", formData);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateStep = () => {
    const stepErrors = {};

    if (activeStep === 0) {
      if (!formData.fname) stepErrors.fname = "First Name is required";
      if (!formData.lname) stepErrors.lname = "Last Name is required";
      if (!formData.mname) stepErrors.mname = "Middle Name is required";
      if (!formData.sex) stepErrors.sex = "Sex is required";
    } else if (activeStep === 1) {
      if (!formData.contact) stepErrors.contact = "Contact # is required";
      if (!formData.email) stepErrors.email = "Email is required";
    } else if (activeStep === 2) {
      if (!formData.type) stepErrors.type = "User Type is required";
      if (!formData.username) stepErrors.username = "Username is required";
      if (!formData.password) stepErrors.password = "Password is required";
      if (formData.password !== formData.cpassword)
        stepErrors.cpassword = "Passwords do not match";
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const stepBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const stepForward = () => {
    if (validateStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const renderUserType = () => {
    switch (formData.type) {
      case 2: // Use 2 instead of 02, as leading zeros are not valid in numeric literals
        return (
          <>
            {" "}
            <Stack>
              <TextField
                label="Current grade level"
                name="glevel"
                select
                variant="filled"
                sx={{ flex: 1 }}
                value={formData.glevel}
                onChange={handleChange}
              >
                {gradeLevels.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </>
        );
      case 3: // Use 2 instead of 02, as leading zeros are not valid in numeric literals
        return <></>;
      case 4: // Use 2 instead of 02, as leading zeros are not valid in numeric literals
        return (
          <>
            <Stack>
              <TextField
                label="Student Code"
                name="studentCode"
                variant="outlined"
                sx={{ flex: 1 }}
                InputLabelProps={{ shrink: true }}
                placeholder="Ex: ABC-123-EEE"
                value={formData.studentCode}
                onChange={handleChange}
              >
                {gradeLevels.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </>
        );
      default:
        return null; // Return null or some default content if no case matches
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Stack direction="row" spacing={2}>
              <TextField
                required
                label="First Name"
                name="fname"
                variant="outlined"
                sx={{ flex: 2 }}
                placeholder="John"
                InputLabelProps={{ shrink: true }}
                value={formData.fname}
                onChange={handleChange}
                error={!!errors.fname}
                helperText={errors.fname}
              />
              <TextField
                label="Ext."
                name="ename"
                variant="outlined"
                sx={{ flex: 1 }}
                placeholder="Jr,Sr,III"
                InputLabelProps={{ shrink: true }}
                value={formData.ename}
                onChange={handleChange}
              />
              <TextField
                required
                label="Last Name"
                name="lname"
                variant="outlined"
                sx={{ flex: 2 }}
                placeholder="Doe"
                InputLabelProps={{ shrink: true }}
                value={formData.lname}
                onChange={handleChange}
                error={!!errors.lname}
                helperText={errors.lname}
              />
              <TextField
                required
                label="Middle Name"
                name="mname"
                variant="outlined"
                sx={{ flex: 2 }}
                placeholder="Murnese"
                InputLabelProps={{ shrink: true }}
                value={formData.mname}
                onChange={handleChange}
                error={!!errors.mname}
                helperText={errors.mname}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth *"
                  value={selectedDate}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                  }}
                  maxDate={dayjs()}
                  slotProps={{ textField: { variant: "outlined" } }}
                  sx={{ flex: 1 }}
                />
              </LocalizationProvider>
              <TextField
                required
                label="Sex"
                select
                name="sex"
                value={formData.sex}
                variant="outlined"
                onChange={handleChange}
                sx={{ flex: 1 }}
                InputLabelProps={{ shrink: true }}
                error={!!errors.sex}
                helperText={errors.sex}
              >
                <MenuItem key={"Male"} value={"Male"}>
                  {"Male"}
                </MenuItem>
                <MenuItem key={"Female"} value={"Female"}>
                  {"Female"}
                </MenuItem>
              </TextField>
            </Stack>
          </>
        );
      case 1:
        return (
          <>
            <Stack direction="row" spacing={2}>
              <TextField
                required
                label="Contact #"
                name="contact"
                variant="outlined"
                sx={{ flex: 1 }}
                placeholder="+63.."
                InputLabelProps={{ shrink: true }}
                value={formData.contact}
                onChange={handleChange}
                error={!!errors.contact}
                helperText={errors.contact}
              />
              <TextField
                required
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                sx={{ flex: 1 }}
                placeholder="abc@gmail.com"
                InputLabelProps={{ shrink: true }}
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Stack>
          </>
        );
      case 2:
        return (
          <>
            <Stack spacing={1}>
              <Stack>
                <TextField
                  required
                  label="User Type"
                  name="type"
                  select
                  variant="outlined"
                  sx={{ flex: 1 }}
                  value={formData.type}
                  onChange={handleChange}
                  error={!!errors.type}
                  helperText={errors.type}
                >
                  {userTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              {renderUserType()}
            </Stack>

            <Stack spacing={1}>
              <TextField
                required
                label="Username"
                name="username"
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
              />

              <Stack required direction="row" spacing={2}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  sx={{ flex: 1 }}
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
                <TextField
                  required
                  label="Confirm Password"
                  name="cpassword"
                  type="password"
                  variant="outlined"
                  sx={{ flex: 1 }}
                  value={formData.cpassword}
                  onChange={handleChange}
                  error={!!errors.cpassword}
                  helperText={errors.cpassword}
                />
              </Stack>
            </Stack>
          </>
        );

      case 3:
        return (
          <>
            <Stack spacing={2} alignItems="center">
              <CheckCircleRoundedIcon
                color="primary"
                sx={{ fontSize: "10rem" }}
              />
              <Typography variant="h4">
                Your account has been successfully created. Please wait for
                activation.
              </Typography>
            </Stack>
          </>
        );
      default:
        return "Unknown Step";
    }
  };

  const handleSubmit = () => {
    if (formData.password !== formData.cpassword) {
      setErrors((prev) => ({
        ...prev,
        cpassword: "Does not Match",
      }));
      return; // Early return to prevent further execution
    } else {
      stepForward();
      console.log("apple");
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
          <Card
            sx={{
              height: "85vh",
              width: "60vw",
              p: "3%",
              alignItems: "center",
              textAlign: "center",
            }}
            elevation={3}

          >
            <Typography variant="h4">REGISTRATION FORM</Typography>
            <Stepper activeStep={activeStep} sx={{ marginTop: "1rem" }}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Stack sx={{ m: "1rem 0 2rem 0" }}>
              <Typography variant="caption" sx={{ alignSelf: "start" }}>
                If field does not apply to you, please leave it empty.
              </Typography>
            </Stack>
            <Stack
              component="form"
              onSubmit={() => {}}
              spacing={3}
              sx={{
                minHeight: "52.5vh",
                maxHeight: "52.5vh",
                justifyContent: "space-between",
              }}
            >
              <Stack spacing={3} sx={{ flexGrow: 1, justifyContent: "center" }}>
                {renderStepContent(activeStep)}
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Button
                  disabled={activeStep === 0}
                  onClick={stepBack}
                  sx={{display:activeStep===3? "none":"block", mt: 1, mr: 1, minWidth: "15rem" }}
                >
                  Back
                </Button>
                {activeStep === steps.length - 2 ? (
                  <Button
                    variant="contained"
                    disableElevation
                    sx={{ minWidth: "15rem" }}
                    onClick={handleSubmit} // Register action
                  >
                    Register
                  </Button>
                ) : activeStep === steps.length - 1 ? (
                  <>
                    <Button
                    disableElevation
                      variant="outlined"
                      sx={{ flex:1}}
                      onClick={() => navigate("/aes/login")} // Navigate to login
                    >
                      Go to Login
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    onClick={stepForward}
                    disableElevation
                    sx={{ minWidth: "15rem" }}
                  >
                    Next
                  </Button>
                )}
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Box>
    </>
  );
};

export default RegisterPage;
