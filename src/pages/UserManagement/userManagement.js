import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";

import { Button, Stack, Tooltip, Paper } from "@mui/material";
import NewClassroomDialog from "./components/newClassroomDialog";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";

import {
  HowToReg,
  Group,
  ModeEdit,
  Lock,
  LockResetOutlined,
  LockOpen,
  MoveDown,
} from "@mui/icons-material";

import { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const UserMangement = () => {
  const [isAddNewClassOpen, setIsAddNewClassOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      id: 1,
      userName: "jdoe",
      code: "USR-1234",
      userType: "Student",
      dateCreated: "2024-01-10",
      status: "Active",
      isLocked: true,
    },
    {
      id: 2,
      userName: "asmith",
      code: "USR-5678",
      userType: "Guardian",
      dateCreated: "2024-02-15",
      status: "Deactivated",
    },
    {
      id: 3,
      userName: "mjones",
      code: "USR-9101",
      userType: "Teacher",
      dateCreated: "2024-03-20",
      status: "Pending",
    },
    {
      id: 4,
      userName: "bwhite",
      code: "USR-1121",
      userType: "Guardian",
      dateCreated: "2024-04-25",
      status: "Active",
    },
    {
      id: 5,
      userName: "clarkk",
      code: "USR-3141",
      userType: "Student",
      dateCreated: "2024-05-30",
      status: "Deactivated",
    },
    {
      id: 6,
      userName: "lwilson",
      code: "USR-5161",
      userType: "Teacher",
      dateCreated: "2024-06-12",
      status: "Pending",
    },
    {
      id: 7,
      userName: "treed",
      code: "USR-7181",
      userType: "Student",
      dateCreated: "2024-07-04",
      status: "Active",
    },
    {
      id: 8,
      userName: "abaker",
      code: "USR-9202",
      userType: "Guardian",
      dateCreated: "2024-08-16",
      status: "Deactivated",
    },
    {
      id: 9,
      userName: "knguyen",
      code: "USR-2233",
      userType: "Teacher",
      dateCreated: "2024-09-19",
      status: "Pending",
    },
    {
      id: 10,
      userName: "dsantos",
      code: "USR-4455",
      userType: "Student",
      dateCreated: "2024-10-21",
      status: "Active",
    },
  ]);
  const [isRemoveDialog, setIsRemoveDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleToggleLock = (id) => {
    rows.map((row) => {
      if (row.id === id) {
        row.isLocked = !row.isLocked;
      }
      return row;
    });
  };
  const [isMemberTblOpen, setIsMemberTblOpen] = useState({
    isOpen: false,
    classData: {},
  });

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "userName",
      headerName: "User Name",
      flex: 1,
    },
    {
      field: "code",
      headerName: "Code",
      flex: 1,
    },
    {
      field: "userType",
      headerName: "User Type",
      flex: 1,
    },
    {
      field: "dateCreated",
      headerName: "Date Created",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
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
          {params.row.status === "Pending" ? (
            <Tooltip title="Approve">
              <Button
                size="small"
                color="primary"
                variant="icon"
                onClick={handleOpen}
              >
                <HowToReg />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Approve">
              <Button variant="icon" disabled sx={{ opacity: 0 }}>
                <HowToReg />
              </Button>
            </Tooltip>
          )}

          <Tooltip title="Group">
            <Button
              size="small"
              color="yeloh"
              variant="icon"
              onClick={() =>
                setIsMemberTblOpen({ isOpen: true, classData: params.row })
              }
            >
              <MoveDown />
            </Button>
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              size="small"
              color="edit"
              variant="icon"
              onClick={() => {
                setIsRemoveDialog(false);
                setIsOpen(true);
              }}
            >
              <ModeEdit />
            </Button>
          </Tooltip>
          <Tooltip Tooltip title={params.row.isLocked ? "Lock" : "Unlock"}>
            <Button
              size="small"
              color={params.row.isLocked ? "lock" : "unlock"}
              variant="icon"
              onClick={() => {
                handleToggleLock(params.row.id);
              }}
            >
              {params.row.isLocked ? <Lock /> : <LockOpen />}
            </Button>
          </Tooltip>
          <Tooltip title="Reset student">
            <Button
              size="small"
              color="reset"
              variant="icon"
              onClick={() => {
                setIsRemoveDialog(false);
                setIsOpen(true);
                setIsAddNewClassOpen(true);
              }}
            >
              <LockResetOutlined />
            </Button>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const columnsModal = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last name",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 1,
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
                setIsRemoveDialog(true);
                setIsOpen(true);
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
    <Stack
      spacing={0}
      sx={{
        // padding: "0.1rem",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Grid
        container
        rowSpacing={0}
        columnSpacing={0}
        sx={{
          width: "100%",
          height: "100%",
          background: "white",
          borderRadius: "0.2rem",
          // p: "1rem 0",
          overflowY: "auto",
          maxHeight: "calc(100vh - 2rem)",
        }}
      >
        {/* <Grid
          size={12}
          sx={{
            p: "0.5rem",
            m: 0,
            height: "8%",
            alignContent: "center",
          }}
        >
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              startIcon={<AddCircleIcon color="accent" />}
              sx={{ px: 7 }}
            >
              New Classroom
            </Button>
          </Box>
        </Grid> */}
        <Grid size={12} sx={{ m: 0, height: "92%" }}>
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
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              "& .MuiDataGrid-cell": {
                color: "black", // Change cell text color
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                color: "black", // Change column header text color
              },
            }}
          />
        </Grid>
        <NewClassroomDialog
          open={isAddNewClassOpen}
          handleClose={() => setIsAddNewClassOpen(false)}
        />
      </Grid>
    </Stack>
  );
};
export default UserMangement;
