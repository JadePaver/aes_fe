import * as React from "react";
import Grid from "@mui/material/Grid2";

import { Button, Stack, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NewClassroomDialog from "./components/newClassroomDialog";
import {
  ModeEdit,
  MoveDown,
  PersonRemove,
  LockReset,
} from "@mui/icons-material";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const rows = [
  {
    id: 1,
    subject: "Mathematics",
    code: "MATH-101",
    teacher: "John Doe",
    dateCreated: "2024-01-10",
  },
  {
    id: 2,
    subject: "Physics",
    code: "PHY-202",
    teacher: "Jane Smith",
    dateCreated: "2024-02-15",
  },
  {
    id: 3,
    subject: "Chemistry",
    code: "CHEM-303",
    teacher: "Michael Johnson",
    dateCreated: "2024-03-20",
  },
  {
    id: 4,
    subject: "Biology",
    code: "BIO-404",
    teacher: "Emily Davis",
    dateCreated: "2024-04-25",
  },
  {
    id: 5,
    subject: "History",
    code: "HIST-505",
    teacher: "Robert Brown",
    dateCreated: "2024-05-30",
  },
  {
    id: 6,
    subject: "Geography",
    code: "GEO-606",
    teacher: "Laura Wilson",
    dateCreated: "2024-06-12",
  },
  {
    id: 7,
    subject: "English Literature",
    code: "ENG-707",
    teacher: "Charles Clark",
    dateCreated: "2024-07-04",
  },
  {
    id: 8,
    subject: "Computer Science",
    code: "CS-808",
    teacher: "Sophia Martinez",
    dateCreated: "2024-08-16",
  },
  {
    id: 9,
    subject: "Art",
    code: "ART-909",
    teacher: "Lucas Thomas",
    dateCreated: "2024-09-19",
  },
  {
    id: 10,
    subject: "Music",
    code: "MUS-010",
    teacher: "Anna Rodriguez",
    dateCreated: "2024-10-21",
  },
];

const StudentMangement = () => {
  const navigate = useNavigate();
  const [isAddNewClassOpen, setIsAddNewClassOpen] = useState(false);
  const [isRemoveDialog, setIsRemoveDialog] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [isOpen, setIsOpen] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    handleToggleLock();
    navigate("/aes/assign_classroom"); // Replace with the route you want to navigate to
  };

  const handleToggleLock = () => {
    setIsLocked(!isLocked); // Toggle between locked and unlocked
  };
  const [isMemberTblOpen, setIsMemberTblOpen] = useState({
    isOpen: false,
    classData: {},
  });

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
    },
    {
      field: "code",
      headerName: "Code",
      flex: 1,
    },
    {
      field: "teacher",
      headerName: "Teacher",
      flex: 1,
    },
    {
      field: "dateCreated",
      headerName: "Date Created",
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
          <Tooltip title="Group">
            <Button
              size="small"
              color="primary"
              variant="icon"
              onClick={() => {
                setIsAddNewClassOpen(true);
                setIsMemberTblOpen({ isOpen: true, classData: params.row });
              }}
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
          <Tooltip Tooltip title="PersonRemove">
            <Button
              size="small"
              color="lock"
              variant="icon"
              onClick={() => {
                handleToggleLock();
              }}
            >
              <PersonRemove />
            </Button>
          </Tooltip>
          <Tooltip Tooltip title="LockReset">
            <Button
              size="small"
              color="reset"
              variant="icon"
              onClick={handleClick}
            >
              <LockReset />
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
        {/* Modal component */}
        <NewClassroomDialog
          open={isAddNewClassOpen}
          handleClose={() => setIsAddNewClassOpen(false)}
        />
      </Grid>
    </Stack>
  );
};
export default StudentMangement;
