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
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { gradeLevels } from "../../../const/var";
import apiClient from "../../../axios/axiosInstance";
import { useSnackbar } from "../../../layouts/root_layout";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const AddToClassroomDialog = ({ isOpen, handleClose, refresh, selected }) => {
  const { showSnackbar } = useSnackbar();

  const [userCode, setUserCode] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await apiClient.post(
        `/classrooms/add_member/${userCode}`,
        selected
      );
      handleClose();
      showSnackbar({
        message: response?.data?.message,
        severity: "success",
      });
      refresh();
    } catch (error) {
      showSnackbar({
        message: error.response?.data?.error,
        severity: "error",
      });

      console.error("Error creating classroom:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack direction="row" spacing={1} fullWidth justifyContent="center">
          <Typography variant="h6" align="center">
            ADD USER TO
          </Typography>
          <Typography
            variant="h6"
            align="center"
            fontWeight={600}
            color="black"
          >
            {selected?.name}
          </Typography>
        </Stack>
        <Button
            onClick={handleClose}
            variant="icon"
            disableElevation
            color="error"
            style={{
              position: 'absolute',
              top: '0px',
              right: '0px',
            }}
          >
            <CloseRoundedIcon/>
          </Button>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ p: "1rem 0" }}>
          <TextField
            fullWidth
            required
            label="Enter User Code"
            name="code"
            value={userCode}
            onChange={(event) => setUserCode(event.target.value)}
            variant="outlined"
            placeholder="Ex:CODE12345"
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
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

export default AddToClassroomDialog;
