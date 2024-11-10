import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const LockToggleDialog = ({ open, handleClose, onConfirm, selected }) => {
  const isLocked = selected?.isLocked === 1; // Check if the user is locked

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ padding: 2 }}>
        <Typography variant="h6" fontWeight={600} align="center">
          {isLocked ? "Unlock User" : "Lock User"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={1} justifyContent="center">
          <Typography>
            {selected?.fName} {selected?.mName} {selected?.lName}{" "}
            {selected?.ext_name}{" "}
          </Typography>

          <Typography color="black">
            {isLocked ? "Unlock this user" : "Lock this user"}
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onConfirm}
          disableElevation
        >
          {isLocked ? "UNLOCK" : "LOCK"}
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

export default LockToggleDialog;
