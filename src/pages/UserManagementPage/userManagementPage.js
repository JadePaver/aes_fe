import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";

import { Button, Stack, Tooltip, Paper, Typography } from "@mui/material";
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

import { useState, useEffect } from "react";

import ResetPassDialog from "./components/resetPassDialog";
import LockToggleDialog from "./components/lockToggleDialog";
import { DataGrid } from "@mui/x-data-grid";
import apiClient from "../../axios/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { formatDate } from "../../const/formatter";
import { useSnackbar } from "../../layouts/root_layout";

const UserManagementPage = () => {
  const { showSnackbar } = useSnackbar();
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isLockOpen, setIsLockOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const [isRemoveDialog, setIsRemoveDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const [isLockDialog, setIsLockDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLockToggle = async () => {
    try {
      const response = await apiClient.post(
        `/users/toggleLock/${selectedRow?.id}`,
        selectedRow
      );
      setIsLockOpen(false)
      setSelectedRow(null);
      getUsers();
      showSnackbar({
        message: response?.data?.message || "Password reset successfully",
        severity: "success",
      });
    } catch (error) {}
  };

  const handleResetPass = async () => {
    try {
      const response = await apiClient.post(
        `/users/reset_pass/${selectedRow?.id}`
      );
      setIsResetOpen(false);
      setSelectedRow(null);
      getUsers();
      showSnackbar({
        message: response?.data?.message || "Password reset successfully",
        severity: "success",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to reset password";

      showSnackbar({
        message: errorMessage,
        severity: "error",
      });
    }
  };

  const [isMemberTblOpen, setIsMemberTblOpen] = useState({
    isOpen: false,
    classData: {},
  });

  const usersColumns = [
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      renderCell: (params) => {
        console.log("rows:", params);
        const {
          fName = "",
          mName = "",
          lName = "",
          ext_name = "",
        } = params.row || {};
        return `${fName} ${mName} ${lName} ${ext_name}`.trim();
      },
    },
    { field: "contact", headerName: "Contact", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    {
      field: "dateModified",
      headerName: "Date Modified",
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack>
            <Typography variant="black">
              {formatDate(params.row?.dateModified)}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "assignedClassroom",
      headerName: "Classroom",
      flex: 1,
    },
    {
      field: "role_id",
      headerName: "User Type",
      flex: 1,
      renderCell: (params) => {
        const role = roles.find((role) => role.id === params.row.role_id);

        // Define background colors for each role
        const roleColors = {
          1: "#3f51b5", // Admin - blue
          2: "#4caf50", // Student - green
          3: "#f57c00", // Teacher - orange
          4: "#9c27b0", // Guardian - purple
          5: "#ff5722", // Operator - deep orange
        };

        const backgroundColor = roleColors[params.row.role_id] || "#757575"; // Default gray for unknown role

        return (
          <Stack
            sx={{
              backgroundColor: backgroundColor,
              color: "white",
              borderRadius: "4px",
              padding: "4px 8px",
              minWidth: "100%",
              minHeight: "100%",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "var(--accent)" }}>
              {role ? role.name : "--:--"}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Stack
          sx={{
            minWidth: "100%",
            minHeight: "100%",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Typography color={params.row.isLocked ? "lock" : "unlock"}>
            {params.row.isLocked ? "Locked" : "Active"}
          </Typography>
        </Stack>
      ),
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
          {params.row.status === "Pending" ? (
            <Tooltip title="Approve">
              <Button
                size="small"
                color="primary"
                variant="icon"
                onClick={() => handleOpen(params.row.id)}
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
              color="warning"
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
              color="secondary"
              variant="icon"
              onClick={() => {
                setIsRemoveDialog(false);
                setIsOpen(true);
              }}
            >
              <ModeEdit />
            </Button>
          </Tooltip>

          <Tooltip title={params.row.isLocked ? "Unlock" : "Lock"}>
            <Button
              size="small"
              color={params.row.isLocked ? "error" : "success"}
              variant="icon"
              onClick={() => {
                setIsLockOpen(true);
                setSelectedRow(params.row);
              }}
            >
              {params.row.isLocked ? <Lock /> : <LockOpen />}
            </Button>
          </Tooltip>

          <Tooltip title="Reset Student">
            <Button
              size="small"
              color="info"
              variant="icon"
              onClick={() => {
                setIsResetOpen(true);
                setSelectedRow(params.row);
              }}
            >
              <LockResetOutlined />
            </Button>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  // const columnsModal = [
  //   { field: "id", headerName: "ID", width: 90 },
  //   {
  //     field: "firstName",
  //     headerName: "First name",
  //     flex: 1,
  //   },
  //   {
  //     field: "lastName",
  //     headerName: "Last name",
  //     flex: 1,
  //   },
  //   {
  //     field: "age",
  //     headerName: "Age",
  //     type: "number",
  //     flex: 1,
  //   },
  //   {
  //     field: "actions",
  //     headerName: "Actions",
  //     flex: 1,
  //     sortable: false,
  //     renderCell: (params) => (
  //       <Stack
  //         direction="row"
  //         spacing={1}
  //         alignItems="center"
  //         justifyContent="center"
  //         sx={{ height: "100%", width: "100%" }}
  //       >
  //         <Tooltip title="Remove from list">
  //           <Button
  //             size="small"
  //             color="error"
  //             variant="icon"
  //             onClick={() => {
  //               setIsRemoveDialog(true);
  //               setIsOpen(true);
  //             }}
  //           >
  //             <PersonRemoveRoundedIcon />
  //           </Button>
  //         </Tooltip>
  //       </Stack>
  //     ),
  //   },
  // ];
  const token = localStorage.getItem("token");

  const decodedUser = jwtDecode(token);
  console.log("decodedUser:", decodedUser);

  const getUsers = async () => {
    const response = await apiClient.post(`/users/getAll/${decodedUser.id}`);
    console.log("users:", response.data);
    setUsers(response.data);
  };

  useEffect(() => {
    const getRoles = async () => {
      const response = await apiClient.get("/roles/");
      console.log("roles:", response.data);
      setRoles(response.data);
    };
    getRoles();
    getUsers();
  }, []);
  return (
    <>
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
              rows={users}
              columns={usersColumns}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    email: false,
                    contact: false,
                  },
                },
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
          <LockToggleDialog
            open={isLockOpen}
            handleClose={() => {
              setIsLockOpen(false);
              setSelectedRow(null);
            }}
            onConfirm={handleLockToggle}
            selected={selectedRow}
          />
          <ResetPassDialog
            open={isResetOpen}
            handleClose={() => {
              setIsResetOpen(false);
              setSelectedRow(null);
            }}
            onConfirm={handleResetPass}
            selected={selectedRow}
          />
        </Grid>
      </Stack>
    </>
  );
};
export default UserManagementPage;
