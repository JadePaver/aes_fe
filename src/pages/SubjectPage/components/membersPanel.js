import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";

import apiClient from "../../../axios/axiosInstance";
import { useSnackbar } from "../../../layouts/root_layout";
import { formatDate } from "../../../const/formatter";

import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const MembersPanel = ({ subjectId }) => {
  const { showSnackbar } = useSnackbar();

  const [isRemoveDialog, setIsRemoveDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedMember, setSelectedMember] = useState();

  const columns = [
    {
      field: "fullname",
      headerName: "Full Name",
      flex: 2,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => {
        return `${params}`;
      },
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
        `/subjects/get_members/${subjectId}`
      );

      const processedData = response.data.map((member) => ({
        ...member,
        fullname: `${member.fName || ""} ${member.mName || ""} ${
          member.lName || ""
        } ${member.ext_name || ""}`.trim(),
      }));

      setRows(processedData);
    } catch (error) {
      console.error("Error submitting module data:", error);
      showSnackbar({
        message: error.response?.data?.error,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <>
      <Stack sx={{ p: "0rem 1rem 2rem 1rem", height: "100%" }}>
        <Box sx={{ height: "100%", width: "100%" }}>
          <Paper elevation={1} sx={{ height: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5, 10, 20, 50, 100]}
              disableRowSelectionOnClick
              sx={{ height: "100%" }}
            />
          </Paper>
        </Box>
      </Stack>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h5" fontWeight={600}>
            {isRemoveDialog ? "Remove This Student" : "Reset Student Password"}
          </Typography>
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "space-evenly", p: "2rem" }}>
          <Button
            variant="contained"
            onClick={console.log("submit")}
            color="primary"
            sx={{ p: "0.5rem 3rem" }}
            disableElevation
          >
            {isRemoveDialog ? "Remove" : "Reset"}
          </Button>

          <Button
            onClick={() => setIsOpen(false)}
            sx={{ p: "0.35rem 3rem" }}
            variant="outlined"
            disableElevation
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MembersPanel;
