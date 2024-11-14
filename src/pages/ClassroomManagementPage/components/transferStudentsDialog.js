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

const TransferStudentsDialog = ({ isOpen, handleClose, refresh, selected }) => {
  const { showSnackbar } = useSnackbar();
  const [prevClass, setPrevClass] = useState();

  const [selectedClass, setSelectedClass] = useState();
  const [classrooms, setClassrooms] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await apiClient.post(
        `/classrooms/transfer_students/${selectedClass?.id}`,
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
      const filteredClassrooms = response.data.filter(
        (classroom) => classroom.id !== selected.id
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
        <Stack direction="row" spacing={1} justifyContent="center">
          <Typography variant="h6" align="center">
            TRANSFER STUDENT MEMBERS
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
        <Grid container spacing={2} sx={{ p: "1rem 0", alignItems: "center" }}>
          <Grid size={{ md: 5 }} textAlign="center" justifyContent="center">
            <Typography color="black">{selected?.name}</Typography>
          </Grid>
          <Grid size={{ md: 2 }}>
            <EastRoundedIcon sx={{ fontSize: "2rem", fontWeight: 900 }} />
          </Grid>
          <Grid size={{ md: 5 }}>
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

      <DialogActions sx={{ justifyContent: "center", p: 2 }}>
        <Button
          fullWidth
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

export default TransferStudentsDialog;