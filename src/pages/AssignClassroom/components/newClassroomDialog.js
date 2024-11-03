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
      <DialogTitle>
        <Typography variant="h6" align="center">
          NEW CLASSROOM
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Grid container spacing={2}sx={{p:"1rem 0"}}>
          {/* 1st Text Input */}
          <Grid item size={5}>
            <TextField
              fullWidth
              label="Class name"
              variant="outlined"
              IslotProps={{
                inputLabel: { shrink: true }, // Correctly using slotProps for InputLabel
              }}
            />
          </Grid>

          {/* 2nd Dropdown */}
          <Grid item size={5}>
            <TextField
              select
              fullWidth
              label="Grade Level"
              defaultValue={1}
              slotProps={{
                inputLabel: { shrink: true }, // Correctly using slotProps for InputLabel
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </TextField>
          </Grid>

          {/* 3rd Text Input */}
          <Grid item size={2}>
            <TextField
              fullWidth
              label="Year"
              variant="outlined"
              slotProps={{
                inputLabel: { shrink: true }, // Correctly using slotProps for InputLabel
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ justifyContent: "center", p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleClose}
          disableElevation
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewClassroomDialog;
