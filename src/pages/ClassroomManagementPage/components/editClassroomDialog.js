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
  Stack,
  Slide,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { forwardRef } from "react";
import { gradeLevels } from "../../../const/var";
import apiClient from "../../../axios/axiosInstance";
import { useSnackbar } from "../../../layouts/root_layout";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const EditClassroomDialog = ({
  open,
  handleClose,
  refresh,
  selected,
  handleOnchange,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, index) => currentYear - index); // Create an array of years
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    try {
      const response = await apiClient.post(`/classrooms/update/${selected?.id}`, selected);
      handleClose();
      refresh();
      showSnackbar({
        message: response?.data?.message,
        severity: "success",
      });
    } catch (error) {
      showSnackbar({
        message: error.response?.data?.error,
        severity: "error",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          position: "fixed",
          right: 0,
          top: 0,
          height: "100vh",
          maxHeight: "100%",
          width: "35%", // Adjust width as desired
          m: 0,
          borderRadius: 0, // Removes default dialog border radius for a flush right-side display
        },
      }}
    >
      <DialogTitle textAlign="center" fontWeight={600}>
        UPDATE CLASSROOM INFORMATION
      </DialogTitle>
      <DialogContent
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          container
          rowSpacing={2}
          sx={{
            w: "100%",
            minHeight: "100%",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Grid size={{ md: 2 }}>
            <Typography fullWidth>Code:</Typography>
          </Grid>
          <Grid size={{ md: 10 }}>
            <Typography fullWidth color="black">
              {selected?.code}
            </Typography>
          </Grid>
          <Grid size={{ md: 12 }}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={selected?.name}
              onChange={handleOnchange}
            />
          </Grid>

          <Grid size={{ md: 12 }}>
            <TextField
              select
              fullWidth
              label="Grade Level"
              name="grade"
              value={selected?.grade}
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
          <Grid size={{ md: 12 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="year-select-label">Year</InputLabel>
              <Select
                labelId="year-select-label"
                id="year-select"
                name="year"
                value={selected?.year}
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
        size="large"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disableElevation
        >
          UPDATE
        </Button>
        <Button size="large" variant="outlined" fullWidth onClick={handleClose}>
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditClassroomDialog;
