import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
} from "@mui/material";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import apiClient from "../../../axios/axiosInstance";
import { useSnackbar } from "../../../layouts/root_layout";

const JoinSubButton = ({ onRefresh }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [subjectCode, setSubjectCode] = useState("");
  const { showSnackbar } = useSnackbar();

  // Function to handle button click
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to handle dialog close
  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = (e) => {
    setSubjectCode(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await apiClient.post(`/subjects/join`, { subjectCode });
      showSnackbar({
        message: response.data.message,
        severity: "success",
      });
      setOpen(false);

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/aes/login");
        return;
      }

      const decodedUser = jwtDecode(token);

      onRefresh(decodedUser);
    } catch (error) {
      console.error("error:", error);
      showSnackbar({
        message: error.response?.data?.error,
        severity: "error",
      });
    }
  };

  return (
    <>
      <Button
        disableElevation
        variant="contained"
        startIcon={<AddCircleIcon color="accent" />}
        onClick={handleClickOpen}
      >
        Join Subject
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "30vw",
            minWidth: { md: "400px" },
            p: "1rem 2rem",
          },
        }}
      >
        <DialogTitle sx={{ p: 0 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
            Enter Subject Code to Join
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <TextField
            id="outlined-basic"
            value={subjectCode}
            onpas
            label="Enter Subject Code"
            variant="outlined"
            placeholder="Ex: 1BC-E3I-I0A"
            fullWidth
            autoFocus
            onChange={handleOnChange}
            slotProps={{
              inputLabel: {
                shrink: true, // This replaces InputLabelProps
              },
            }}
            sx={{ m: "1rem 0" }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 0 }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            disableElevation
            size="large"
          >
            REQUEST TO JOIN
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JoinSubButton;
