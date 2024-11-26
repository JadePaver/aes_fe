import React, { useState } from "react";
import {
  IconButton,
  Popover,
  MenuItem,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useSnackbar } from "../../../layouts/root_layout";

const SubjectOptions = (props) => {
  const { showSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = () => {
    if (props?.subCode) {
      navigator.clipboard.writeText(props.subCode).then(() => {
        showSnackbar({
          message: "Subject code copied to clipboard!",
          severity: "success",
        });
      });
    }
  };

  return (
    <>
      <IconButton onClick={handleClick} sx={{ ml: "auto" }}>
        <MoreVertRoundedIcon />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{
          paper: {
            sx: {
              padding: 1, // Add padding here
            },
          },
        }}
      >
        <Stack spacing={1}>
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            textAlign="center"
          >
            <Typography>Code:</Typography>
            <Typography sx={{ color: "black" }}>{props?.subCode}</Typography>
            <IconButton sx={{ cursor: "pointer" }} onClick={handleCopy}>
              <ContentCopyRoundedIcon color="primary" />
            </IconButton>
          </Stack>
          {/* <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            textAlign="center"
          >
            <Button
              fullWidth
              variant="outlined"
              startIcon={<EditOutlinedIcon />}
            >
              EDIT
            </Button>
          </Stack> */}
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            textAlign="center"
          >
            <Button
              fullWidth
              variant="outlined"
              startIcon={<DeleteOutlineOutlinedIcon />}
              color="error"
            >
              REMOVE
            </Button>
          </Stack>
        </Stack>
      </Popover>
    </>
  );
};

export default SubjectOptions;
