import React, { useState } from "react";
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
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { gradeLevels } from "../../../const/var";
import apiClient from "../../../axios/axiosInstance";
import { useSnackbar } from "../../../layouts/root_layout";

const NewClassroomDialog = ({ open, handleClose,refresh }) => {
  const { showSnackbar } = useSnackbar();
  const [classroomData, setClassroomData] = useState({
    name: "",
    grade: 1,
    year: "",
  });
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, index) => currentYear - index); // Create an array of years

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setClassroomData({
      ...classroomData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await apiClient.post(
        "/classrooms/create",
        classroomData
      );
      handleClose();
      showSnackbar({
        message: response?.data?.message,
        severity: "success",
      });
      refresh()
    } catch (error) {
      if (
        error.response?.data?.error ===
        "Classroom with the same name, grade, and year already exists"
      ) {
        showSnackbar({
          message: error.response?.data?.error,
          severity: "error",
        });
      } else {
        // Catch other errors
        showSnackbar({
          message: error.message || "An unexpected error occurred.",
          severity: "error",
        });
      }
      console.error("Error creating classroom:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" align="center">
          NEW CLASSROOM
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ p: "1rem 0" }}>
          <Grid item size={{ md: 12 }}>
            <Typography variant="caption">
              The classroom code will be auto-generated after creation
            </Typography>
          </Grid>
          {/* Class name input */}
          <Grid item size={5}>
            <TextField
              fullWidth
              label="Class name"
              name="name"
              value={classroomData.name}
              onChange={handleOnchange}
              variant="outlined"
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
          </Grid>

          {/* Grade level dropdown */}
          <Grid item size={4}>
            <TextField
              select
              fullWidth
              label="Grade Level"
              name="grade"
              value={classroomData.grade}
              onChange={handleOnchange}
              slotProps={{
                inputLabel: { shrink: true },
              }}
            >
              {gradeLevels.map((grade) => (
                <MenuItem key={grade.value} value={grade.value}>
                  {grade.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Year input */}
          <Grid item size={3}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="year-select-label">Year</InputLabel>
              <Select
                labelId="year-select-label"
                id="year-select"
                name="year"
                value={classroomData.year}
                onChange={handleOnchange}
                label="Year"
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit} // Changed to call handleSubmit on form submission
          disableElevation
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewClassroomDialog;
