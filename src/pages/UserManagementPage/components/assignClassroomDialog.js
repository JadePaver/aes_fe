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

const AssignClassroomDialog = ({ isOpen, handleClose, refresh, selected }) => {
  const { showSnackbar } = useSnackbar();

  const [selectedClass, setSelectedClass] = useState(null);
  const [classrooms, setClassrooms] = useState([]);

  const handleSubmit = async () => {
    try {
      if (!selectedClass || !selectedClass.id) {
        showSnackbar({
          message: "Please select a valid classroom.",
          severity: "error",
        });
        return;
      }

      const response = await apiClient.post(
        `/classrooms/assign_user/${selectedClass?.id}`,
        selected
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

      setClassrooms(response.data);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
    }
  };

  useEffect(() => {
    if (isOpen === true) {
      setSelectedClass(null);
      getClassrooms();
    }
    console.log("selected:", selected);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack direction="row" spacing={1}>
          <Typography variant="h6">Assign</Typography>
          <Typography variant="h6" color="black">
            {selected?.fName} {selected?.mName} {selected?.lName}{" "}
            {selected?.ext_name}
          </Typography>
          <Typography variant="h6" align="center">
            classroom
          </Typography>
        </Stack>
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
        <Grid container spacing={2} sx={{ alignItems: "center", p: "1rem 0" }}>
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
                  <Typography color="black">{option?.name}</Typography>
                </li>
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id} // Compare options by ID
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: "1rem" }}>
        <Button
          fullWidth
          size="large"
          color="primary"
          onClick={handleClose} // Changed to call handleSubmit on form submission
        >
          Cancel
        </Button>
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          onClick={handleSubmit} // Changed to call handleSubmit on form submission
          disableElevation
        >
          TRANSFER
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignClassroomDialog;
