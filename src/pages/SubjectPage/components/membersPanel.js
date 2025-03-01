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
import { DialogContentText } from "@mui/material";

import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";

import apiClient from "../../../axios/axiosInstance";
import { useSnackbar } from "../../../layouts/root_layout";
import { formatDate } from "../../../const/formatter";

import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const MembersPanel = ({ subjectId }) => {
  const { showSnackbar } = useSnackbar();

  const [isRemoveDialog, setIsRemoveDialog] = useState(false);
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

      <Dialog open={isRemoveDialog} onClose={() => setIsRemoveDialog(false)}>
        <DialogTitle>Confirm Remove Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure do you want to remove{" "}
            <Typography component="span" fontWeight={600}>
              {selectedMember?.fullname}
            </Typography>{" "}
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ paddingBottom: "1rem" }}
        >
          <Button
            onClick={() => setIsRemoveDialog(false)}
            sx={{ p: "0.35rem 3rem" }}
            variant="outlined"
            disableElevation
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ p: "0.5rem 3rem" }}
            disableElevation
          >
             REMOVE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MembersPanel;
