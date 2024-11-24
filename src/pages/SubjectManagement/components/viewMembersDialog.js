import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Tooltip,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@mui/material";

import { formatDate } from "../../../const/formatter";
import { DataGrid } from "@mui/x-data-grid";
import apiClient from "../../../axios/axiosInstance";
import { useSnackbar } from "../../../layouts/root_layout";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";

const ViewMembersDialog = ({ isOpen, handleClose, refresh, selected }) => {
  const { showSnackbar } = useSnackbar();
  const [members, setMembers] = useState([]);
  const [isRemoveDialog, setIsRemoveDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const removeMember = async () => {
    try {
      const response = await apiClient.post(
        `/subjects/remove_member/${selectedMember?.id}`,
        selected
      );
      setIsRemoveDialog(false)
      showSnackbar({
        message: response?.data?.message,
        severity: "success",
      });
      getMembers();
      refresh();
    } catch (error) {
      console.log("Error removing member:", error);
      showSnackbar({
        message: error.response?.data?.error,
        severity: "error",
      });
    }
  };

  const columns = [
    {
      field: "fullname",
      headerName: "Full Name",
      flex: 2,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { fName, mName, lName, ext_name } = params.row;
        // Combine name fields into a full name
        return `${fName || ""} ${mName || ""} ${lName || ""} ${
          ext_name || ""
        }`.trim();
      },
    },
    {
      field: "archiveCodes",
      headerName: "Code",
      flex: 1,
      valueGetter: (params) => {
        return `${params[0]?.code}`;
      },
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      valueGetter: (params) => {
        return `${params?.name}`;
      },
    },
    {
      field: "dateAdded",
      headerName: "Date joined",
      flex: 1,
      valueGetter: (params) => {
        return `${formatDate(params)}`;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%", width: "100%" }}
        >
          <Tooltip title="Remove from list">
            <Button
              size="small"
              color="error"
              variant="icon"
              onClick={() => {
                setSelectedMember(params.row);
                setIsRemoveDialog(true);
              }}
            >
              <PersonRemoveRoundedIcon />
            </Button>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const getMembers = async () => {
    try {
      const response = await apiClient.post(
        `/subjects/get_members/${selected.id}`
      );
      setMembers(response.data);
    } catch (error) {
      console.log("err:", error);
    }
  };
  useEffect(() => {
    if (isOpen === true) {
      getMembers();
    }
  }, [isOpen]);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          sx: {
            minWidth: "90%",
            minHeight: "90%",
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6">
            {selected?.name}({selected?.year})
          </Typography>
          <Button
            onClick={handleClose}
            variant="icon"
            disableElevation
            color="error"
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
            }}
          >
            <CloseRoundedIcon />
          </Button>
        </DialogTitle>
        <DialogContent sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}>
            <DataGrid
              rows={members}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={isRemoveDialog} onClose={() => setIsRemoveDialog(false)}>
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove {selectedMember?.fName}{" "}
            {selectedMember?.lName} from the class?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsRemoveDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={removeMember} color="error">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewMembersDialog;
