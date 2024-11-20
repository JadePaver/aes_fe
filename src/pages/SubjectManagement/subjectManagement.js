import * as React from "react";

import NewSubjectDialog from "./components/newSubjectDialog";

import Grid from "@mui/material/Grid2";
import { Button, Stack, Tooltip, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  ModeEdit,
  MoveDown,
  ContactEmergency,
  PersonAdd,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import apiClient from "../../axios/axiosInstance";
import { formatDate } from "../../const/formatter";

const SubjectManagement = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [isNewSubjectOpen, setIsNewSubjectOpen] = useState(false);

  const handleToggleLock = () => {
    setIsLocked(!isLocked); // Toggle between locked and unlocked
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Subject",
      flex: 1,
    },
    {
      field: "code",
      headerName: "Code",
      flex: 2,
    },
    {
      field: "classroomName",
      headerName: "Classroom",
      flex: 2,
    },
    {
      field: "dateCreated",
      headerName: "Date Created",
      flex: 1,
      renderCell: (params) => (
        <>
          <Typography
            color="black"
            sx={{
              textAlign: "center",
              alignContent: "center",
              minHeight: "100%",
            }}
          >
            {formatDate(params.row?.dateCreated)}
          </Typography>
        </>
      ),
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
          <Tooltip title="Frame">
            <Button size="small" color="primary" variant="icon">
              <ContactEmergency />
            </Button>
          </Tooltip>
          <Tooltip title="Group">
            <Button size="small" color="reset" variant="icon">
              <PersonAdd />
            </Button>
          </Tooltip>

          <Tooltip Tooltip title="Unlock">
            <Button
              size="small"
              color="yeloh"
              // {isLocked ? "lock" : "unlock"}
              variant="icon"
              onClick={() => {
                handleToggleLock();
              }}
            >
              <MoveDown />
            </Button>
          </Tooltip>
          <Tooltip title="Edit">
            <Button size="small" color="edit" variant="icon" onClick={() => {}}>
              <ModeEdit />
            </Button>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const getSubjects = async () => {
    try {
      const response = await apiClient.post("/subjects/");
      console.log("sunjectsTurn:", response.data);
      setSubjects(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getSubjects();
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
              onClick={() => setIsNewSubjectOpen(true)}
              disableElevation
            >
              New Subject
            </Button>
          </Grid>
          <Grid size={12} sx={{ m: 0, height: "92%" }}>
            <DataGrid
              rows={subjects}
              columns={columns}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    id: false, // Set the `id` column to be hidden
                  },
                },
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
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
        </Grid>
      </Stack>
      <NewSubjectDialog
        isOpen={isNewSubjectOpen}
        handleClose={() => setIsNewSubjectOpen(false)}
      />
    </>
  );
};
export default SubjectManagement;
