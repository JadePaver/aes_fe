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
import { ModeEdit, PlaylistRemove } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import ViewClassMemberTable from "./components/viewClassMemberTable";
import NewClassroomDialog from "./components/newClassroomDialog";
import apiClient from "../../axios/axiosInstance";
import RemoveClassroomDialog from "./components/removeClassroomDialog";
import EditClassroomDialog from "./components/editClassroomDialog";

const ClassroomManagementPage = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isMemberTblOpen, setIsMemberTblOpen] = useState({
    isOpen: false,
    classData: {},
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setSelected({
      ...selected,
      [name]: value,
    });
  };

  const getClassrooms = async () => {
    try {
      const response = await apiClient.post("/classrooms");
      console.log("classrooms:", response.data);
      setClassrooms(response.data);
    } catch (error) {
      console.log("error:", error);
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
          <Tooltip title="Approve">
            <Button
              size="small"
              color="primary"
              variant="icon"
              onClick={() =>
                setIsMemberTblOpen({ isOpen: true, classData: params.row })
              }
            >
              <GroupsRounded />
            </Button>
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              size="small"
              color="edit"
              variant="icon"
              onClick={() => {
                setIsEditOpen(true);
                console.log("selected:",params.row)
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
              onClick={() => setIsAddOpen(true)}
              disableElevation
            >
              New Classroom
            </Button>
          </Box>
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
        <ViewClassMemberTable
          classData={isMemberTblOpen.classData}
          isOpen={isMemberTblOpen.isOpen}
          onClose={() => {
            setIsMemberTblOpen({ isOpen: false, classId: null });
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
