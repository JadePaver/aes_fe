import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  Select,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { gradeLevels } from "../../../const/var";
import apiClient from "../../../axios/axiosInstance";
import { useSnackbar } from "../../../layouts/root_layout";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EastRoundedIcon from "@mui/icons-material/EastRounded";

const EnrollClassDialog = ({ isOpen, handleClose, refresh, selected }) => {
  const { showSnackbar } = useSnackbar();
  const [prevClass, setPrevClass] = useState();

  const [selectedClass, setSelectedClass] = useState();
  const [classrooms, setClassrooms] = useState([]);

  const handleSubmit = async () => {
    try {
      console.log("data:", selectedClass);
      const response = await apiClient.post(
        `/subjects/enroll_classroom/${selected?.id}`,
        selectedClass
      );
      handleClose();
      showSnackbar({
        message: response?.data?.message,
        severity: "success",
      });
      refresh();
    } catch (error) {
      console.error("Error removing classroom:", error);
      showSnackbar({
        message: error.response?.data?.error,
        severity: "error",
      });
    }
  };
  const getClassrooms = async () => {
    try {
      const response = await apiClient.post(`/classrooms/`);

      console.log("classrooms:", response.data);
      console.log("selec:", selected);
      const filteredClassrooms = response.data.filter(
        (classroom) => classroom.id !== selected.classroom?.id
      );

      setClassrooms(filteredClassrooms);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
    }
  };

  useEffect(() => {
    if (isOpen === true) {
      setSelectedClass(null);
      setPrevClass(selected);
      getClassrooms();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack direction="row" spacing={1}>
          <Typography variant="h6" align="center" component="div">
            Enroll a classroom on{" "}
            <Typography component="span" variant="h6" color="black">
              "{selected?.name}"
            </Typography>{" "}
            subject
          </Typography>
        </Stack>
        <Button
          onClick={handleClose}
          variant="icon"
          disableElevation
          color="error"
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
          }}
        >
          <CloseRoundedIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ py: "1rem", alignItems: "center" }}>
          <Grid size={{ md: 12 }}>
            <Autocomplete
              value={selectedClass}
              onChange={(event, newValue) => setSelectedClass(newValue)} // Handle classroom selection
              options={classrooms}
              getOptionLabel={(option) => option?.name} // Display classroom name in the dropdown
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Classroom"
                  variant="outlined"
                  value={selectedClass ? selectedClass.name : ""}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Typography color="black">
                    {option?.name} ({option?.year})
                  </Typography>
                </li>
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id} // Compare options by ID
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{ justifyContent: "center", p: "0 1.5rem 1rem 1.5rem" }}
      >
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit} // Changed to call handleSubmit on form submission
          disableElevation
        >
          ENROLL
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnrollClassDialog;
