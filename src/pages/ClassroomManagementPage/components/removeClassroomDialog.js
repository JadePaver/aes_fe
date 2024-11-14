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
import apiClient from "../../../axios/axiosInstance";
import { useSnackbar } from "../../../layouts/root_layout";

const RemoveClassroomDialog = ({ open, handleClose, refresh, selected }) => {
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    try {
      const response = await apiClient.post(
        `/classrooms/remove/${selected?.id}`
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

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" spacing={1} fullWidth justifyContent="center">
            <Typography variant="h6" align="center">
              REMOVE CLASSROOM
            </Typography>
            <Typography
              variant="h6"
              color="black"
              fontWeight={600}
              align="center"
            >
              "{selected?.name}"
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center", p: 2 }}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleSubmit}
            disableElevation
          >
            Remove
          </Button>
          <Button fullWidth onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RemoveClassroomDialog;
