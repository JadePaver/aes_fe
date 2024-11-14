import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Tooltip,
  Button,
  Modal,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import apiClient from "../../../axios/axiosInstance";

import { useSnackbar } from "../../../layouts/root_layout";

const ViewClassMemberTable = ({ isOpen, onClose, selected }) => {
  const { showSnackbar } = useSnackbar();
  const [isRemoveDialog, setIsRemoveDialog] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const getMembers = async () => {
    try {
      const response = await apiClient.post(
        `/classrooms/get_members/${selected.id}`
      );
      console.log("members:", response.data);
      setMembers(response.data);
    } catch (error) {
      console.log("err:", error);
    }
  };

  const removeMember = async () => {
    try {
      console.log("Removing member:", selectedMember);
      const response = await apiClient.post(
        `/classrooms/remove_member/${selectedMember?.id}`,
        selectedMember
      );
      setMembers(members.filter((member) => member.id !== selectedMember.id));
      setSelectedMember(null);
      setIsRemoveDialog(false);
      showSnackbar({
        message: response?.data?.message,
        severity: "success",
      });
    } catch (error) {
      console.log("Error removing member:", error);
      showSnackbar({
        message: error.response?.data?.error,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    if (isOpen === true) {
      console.log("memberloaded:", selected);
      getMembers();
    }
  }, [isOpen]);

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
      field: "archive_codes.code",
      headerName: "Code",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => params.row?.archive_codes[0]?.code || "--:--", // Display "N/A" if user_code is null
    },

    {
      field: "role",
      headerName: "Role",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) =>
        (
          <>
            <Stack
              sx={{
                backgroundColor:
                  params.row.role?.name === "Student" ? "#4caf50" : "#f57c00",
                color: "white",
                borderRadius: "4px",
                padding: "4px 8px",
                minWidth: "100%",
                minHeight: "100%",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="white">{params.row.role?.name}</Typography>
            </Stack>
          </>
        ) || "No Role Assigned", // Display "No Role Assigned" if role is null
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
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

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
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
            onClick={onClose}
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
            autoHeight
          />
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

export default ViewClassMemberTable;
