import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import Grid from "@mui/material/Grid2";

const NewClassroomDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ padding: 2 }}>
        <Typography variant="h6" align="center">
          CONFIRM RESET PASSWORD
        </Typography>
      </DialogTitle>

      <DialogActions sx={{ justifyContent: "center", p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleClose}
          disableElevation
        >
          CONFIRM
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleClose}
          disableElevation
        >
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewClassroomDialog;
