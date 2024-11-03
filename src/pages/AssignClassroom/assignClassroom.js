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
import { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import ViewClassMemberTable from "./components/viewClassMemberTable";
import NewClassroomDialog from "./components/newClassroomDialog";
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const rows = [
  {
    id: 1,
    className: "Snow",
    code: "AN0-7UI-MF8",
    gradeLevel: 1,
    year: "2024",
  },
  {
    id: 2,
    className: "Sunshine",
    code: "BK4-3QD-ZXP",
    gradeLevel: 2,
    year: "2023",
  },
  {
    id: 3,
    className: "Rain",
    code: "CC1-9KL-HTR",
    gradeLevel: 3,
    year: "2022",
  },
  {
    id: 4,
    className: "Wind",
    code: "DT6-8YO-JJK",
    gradeLevel: 4,
    year: "2024",
  },
  {
    id: 5,
    className: "Storm",
    code: "EF7-5VM-BLC",
    gradeLevel: 5,
    year: "2023",
  },
  {
    id: 6,
    className: "Hail",
    code: "GJ2-2NS-RQW",
    gradeLevel: 1,
    year: "2024",
  },
  {
    id: 7,
    className: "Thunder",
    code: "HK0-6RT-ZWV",
    gradeLevel: 3,
    year: "2022",
  },
  {
    id: 8,
    className: "Cloud",
    code: "IP5-4KU-YVB",
    gradeLevel: 2,
    year: "2024",
  },
  {
    id: 9,
    className: "Breeze",
    code: "LM8-1QA-TFG",
    gradeLevel: 4,
    year: "2023",
  },
  {
    id: 10,
    className: "Mist",
    code: "NV9-3OP-XCR",
    gradeLevel: 5,
    year: "2024",
  },
];

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

const AssignClassroom = () => {
  const [isModal, setIsModal] = useState("");
  const [isAddNewClassOpen, setIsAddNewClassOpen] = useState(false);
  const [isMemberTblOpen, setIsMemberTblOpen] = useState({
    isOpen: false,
    classData: {},
  });
  const [open, setOpen] = useState(false);
  const handleOpen = (modal) => {
    setOpen(true);
    setIsModal(modal);
  };
  const handleClose = () => {
    setOpen(false);
    setIsModal("");
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
      field: "className",
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
      field: "gradeLevel",
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
                setIsMemberTblOpen({ isOpen: true, classData: params.row})
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
              onClick={() => setIsAddNewClassOpen(true)}
              disableElevation
            >
              New Classroom
            </Button>
          </Box>
        </Grid>
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
        <NewClassroomDialog open={isAddNewClassOpen} handleClose={()=>setIsAddNewClassOpen(false)}/>
      </Grid>
    </Stack>
  );
};
export default AssignClassroom;
