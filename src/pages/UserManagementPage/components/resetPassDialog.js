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
  Stack,
} from "@mui/material";

import Grid from "@mui/material/Grid2";

const ResetPassDialog = ({ open, handleClose, onConfirm, selected }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ padding: 2 }}>
        <Typography variant="h6" fontWeight={600} align="center">
          CONFIRM RESET PASSWORD
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={1} justifyContent="center">
          <Typography>
            {selected?.fName} {selected?.mName} {selected?.lName}{" "}
            {selected?.ext_name}{" "}
          </Typography>

          <Typography color="black">
            {" "}
            password will be reset into "123456"
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

export default ResetPassDialog;
