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
import AddCircleIcon from "@mui/icons-material/AddCircle";

const JoinSubButton = () => {
  const [open, setOpen] = useState(false); // State to control dialog visibility

  // Function to handle button click
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to handle dialog close
  const handleClose = () => {
    setOpen(false);
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

      <Dialog open={open} onClose={handleClose} PaperProps={{
          sx: {
            width: "30vw",
            p:"1rem 2rem"
          },
        }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'center',p:0 }}>
          <Typography variant="h4" sx={{fontWeight:600,}} gutterBottom>Join Subject</Typography>
        </DialogTitle>
        <DialogContent sx={{p:0}}>
          <TextField
            id="outlined-basic"
            label="Enter Subject Code"
            variant="outlined"
            placeholder="Ex: 1BC-E3I-I0A"
            fullWidth
            autoFocus
            slotProps={{
              inputLabel: {
                shrink: true, // This replaces InputLabelProps
              },
            }}
            sx={{ m: "1rem 0" }}
          />
        </DialogContent>
        <DialogActions sx={{p:0}}>
          <Button onClick={handleClose} variant="contained" fullWidth disableElevation size="large">
            REQUEST TO JOIN
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JoinSubButton;
