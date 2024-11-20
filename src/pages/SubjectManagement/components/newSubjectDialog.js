import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Autocomplete,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import Grid from "@mui/material/Grid2";

import apiClient from "../../../axios/axiosInstance";
import { useSnackbar } from "../../../layouts/root_layout";

const NewSubjectDialog = ({ isOpen, handleClose }) => {
  const { showSnackbar } = useSnackbar();
  const [classrooms, setClassrooms] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    year: new Date().getFullYear(),
    selectedClass: null,
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, index) => currentYear - index); // Create an array of years

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("val:", value);
    console.log("name:", name);
    console.log("event:", event);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the specific field's error
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const handleClassChange = (event, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedClass: newValue,
    }));

    // Clear the specific field's error for 'selectedClass'
    setErrors((prevErrors) => ({
      ...prevErrors,
      selectedClass: null,
    }));
  };

  const getClassrooms = async () => {
    try {
      const response = await apiClient.post(`/classrooms/`);
      console.log("classrooms:", response.data);
      setClassrooms(response.data);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
    }
  };

  const getSubjects = async () => {
    try {
      const response = await apiClient.post(`/subjects/`);
      const data = response.data;

      const uniqueNames = [...new Set(data.map((item) => item.name))];

      console.log("subjects:", uniqueNames);

      setSubjects(uniqueNames);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        year: currentYear,
        selectedClass: null,
      });
      getClassrooms();
      getSubjects();
    }
  }, [isOpen]);

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Subject name cannot be empty.";
    }

    if (!formData.year) {
      validationErrors.year = "Year is required.";
    }

    if (!formData.selectedClass) {
      validationErrors.selectedClass = "Classroom selection is required.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async () => {
    console.log("submit:", formData);

    if (!validateForm()) {
      console.log("Form validation failed:", errors);
      return; // Prevent submission if validation fails
    }

    console.log("Submitted Data:", formData);
    try {
      const response = await apiClient.post(`/subjects/create`, formData);

      handleClose();
      showSnackbar({
        message: response?.data?.message,
        severity: "success",
      });
    } catch (error) {
      console.error("Error removing classroom:", error);
      showSnackbar({
        message: error.response?.data?.error,
        severity: "error",
      });
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" align="center">
          CREATE NEW SUBJECT
        </Typography>
        <Button
          onClick={handleClose}
          variant="icon"
          disableElevation
          color="error"
          sx={{
            border: "none",
            position: "absolute",
            top: "0px",
            right: "0px",
          }}
        >
          <CloseRoundedIcon />
        </Button>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ p: "1rem 0" }}>
          {/* 1st Text Input */}
          <Grid item size={{ md: 12 }}>
            <Typography variant="caption">
              Note: The subject code will be generated after create
            </Typography>
          </Grid>
          <Grid item size={{ md: 4 }}>
            <Autocomplete
              freeSolo
              options={subjects}
              value={formData.name}
              onChange={(event, newValue) => {
                // Handle when a user selects an option or types a custom value
                setFormData((prevData) => ({
                  ...prevData,
                  name: newValue || "", // Update `name` with the selected value or the typed value
                }));

                // Clear the specific field's error
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  name: null,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  name="name"
                  label="Subject Name"
                  variant="outlined"
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Typography color="black">{option}</Typography>
                </li>
              )}
              isOptionEqualToValue={(option, value) => option === value} // Match options with the value
            />
          </Grid>
          <Grid
            item
            size={{ md: 1 }}
            sx={{
              justifyContent: "center",
              alignContent: "center",
              textAlign: "center",
            }}
          >
            {" "}
            <Typography>For</Typography>
          </Grid>

          {/* 2nd Dropdown */}
          <Grid item size={{ md: 5 }}>
            <Autocomplete
              value={formData.selectedClass}
              onChange={handleClassChange} // Handle classroom selection
              options={classrooms}
              getOptionLabel={(option) => option?.name || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Classroom"
                  variant="outlined"
                  error={Boolean(errors.selectedClass)}
                  helperText={errors.selectedClass}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Typography color="black">{option?.name}</Typography>
                </li>
              )}
              isOptionEqualToValue={(option, value) => option.id === value?.id} // Compare options by ID
            />
          </Grid>
          <Grid item size={{ md: 2 }}>
            <FormControl
              fullWidth
              variant="outlined"
              error={Boolean(errors.year)}
            >
              <InputLabel id="year-select-label">Year</InputLabel>
              <Select
                name="year"
                labelId="year-select-label"
                id="year-select"
                value={formData.year}
                onChange={handleInputChange}
                label="Year"
              >
                {years.map((yearOption) => (
                  <MenuItem key={yearOption} value={yearOption}>
                    {yearOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{ justifyContent: "center", p: "0 1.5rem 1.5rem 1.5rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={handleSubmit}
          disableElevation
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewSubjectDialog;
