import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import {
  Button,
  Stack,
  Tooltip,
  Modal,
  Box,
  Paper,
  Select,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoveUpRoundedIcon from "@mui/icons-material/MoveUpRounded";
import { ModeEdit, PlaylistRemove } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import ViewClassMemberTable from "./components/viewClassMemberTable";
import NewClassroomDialog from "./components/newClassroomDialog";
import apiClient from "../../axios/axiosInstance";
import { useUser } from "../../layouts/root_layout";
import RemoveClassroomDialog from "./components/removeClassroomDialog";
import EditClassroomDialog from "./components/editClassroomDialog";
import AddToClassroomDialog from "./components/addToClassroomDialog";
import TransferStudentDialog from "./components/transferStudentsDialog";

const ClassroomManagementPage = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const { user } = useUser();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setSelected({
      ...selected,
      [name]: value,
    });
  };

  const getClassrooms = async () => {
    try {
      if (user.role === 3) {
        const response = await apiClient.post("/classrooms/get_by_userID");
        setClassrooms(response.data);
      } else {
        const response = await apiClient.post("/classrooms");
        setClassrooms(response.data);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Class Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "code",
      headerName: "Code",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "grade",
      headerName: "Grade Level",
      type: "number",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "year",
      headerName: "Year",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "totalUsers",
      headerName: "Total # of members",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%", width: "100%" }}
        >
          <Tooltip title="Transfer Students Classroom">
            <Button
              size="small"
              color="secondary"
              variant="icon"
              onClick={() => {
                setIsTransferOpen(true);
                setSelected(params.row);
              }}
            >
              <MoveUpRoundedIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Add Member">
            <Button
              size="small"
              color="yeloh"
              variant="icon"
              onClick={() => {
                setIsAddMemberOpen(true);
                setSelected(params.row);
              }}
            >
              <PersonAddIcon />
            </Button>
          </Tooltip>
          <Tooltip title="View Members">
            <Button
              size="small"
              color="primary"
              variant="icon"
              onClick={() => {
                setIsMemberOpen(true);
                setSelected(params.row);
              }}
            >
              <GroupsRounded />
            </Button>
          </Tooltip>
          <Tooltip title="Edit Classroom">
            <Button
              size="small"
              color="edit"
              variant="icon"
              onClick={() => {
                setIsEditOpen(true);
                setSelected(params.row);
                // setIsRemoveDialog(true);
                // setIsOpen();
              }}
            >
              <ModeEdit />
            </Button>
          </Tooltip>
          <Tooltip title="Remove Classroom">
            <Button
              size="small"
              color="remove"
              variant="icon"
              onClick={() => {
                setIsRemoveOpen(true);
                setSelected(params.row);
                // setIsRemoveDialog(false);
                // setIsOpen(true);
              }}
            >
              <PlaylistRemove />
            </Button>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  useEffect(() => {
    getClassrooms();
  }, []);

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
        <Grid
          size={{ md: 12 }}
          sx={{
            display: "flex",
            p: "0.5rem",
            m: 0,
            height: "8%",
            alignContent: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddCircleIcon color="accent" />}
            sx={{ px: 7 }}
            onClick={() => setIsAddOpen(true)}
            disableElevation
          >
            New Classroom
          </Button>
        </Grid>
        <Grid size={12} sx={{ m: 0, height: "92%" }}>
          <DataGrid
            rows={classrooms}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            // checkboxSelection
            disableRowSelectionOnClick
          />
        </Grid>
        {/* Modal component */}
        <TransferStudentDialog
          selected={selected}
          isOpen={isTransferOpen}
          refresh={getClassrooms}
          handleClose={() => {
            setIsTransferOpen(false);
          }}
        />
        <AddToClassroomDialog
          selected={selected}
          isOpen={isAddMemberOpen}
          refresh={getClassrooms}
          handleClose={() => {
            setIsAddMemberOpen(false);
          }}
        />
        <ViewClassMemberTable
          selected={selected}
          isOpen={isMemberOpen}
          onClose={() => {
            setIsMemberOpen(false);
          }}
        />
        <NewClassroomDialog
          open={isAddOpen}
          handleClose={() => setIsAddOpen(false)}
          refresh={getClassrooms}
        />
        <RemoveClassroomDialog
          open={isRemoveOpen}
          handleClose={() => setIsRemoveOpen(false)}
          refresh={getClassrooms}
          selected={selected}
        />
        <EditClassroomDialog
          handleOnchange={handleOnchange}
          open={isEditOpen}
          handleClose={() => setIsEditOpen(false)}
          refresh={getClassrooms}
          selected={selected}
        />
      </Grid>
    </Stack>
  );
};
export default ClassroomManagementPage;
