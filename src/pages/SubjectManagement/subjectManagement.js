import * as React from "react";

import NewSubjectDialog from "./components/newSubjectDialog";
import EnrollClassDialog from "./components/enrollClassDialog";
import ViewMembersDialog from "./components/viewMembersDialog";
import EnrollUserDialog from "./components/enrollUserDialog";

import Grid from "@mui/material/Grid2";
import { Button, Stack, Tooltip, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
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
  const [selected, setSelected] = useState(null);
  const [isNewSubjectOpen, setIsNewSubjectOpen] = useState(false);
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [isEnrollClassOpen, setIsEnrollClassOpen] = useState(false);
  const [isEnrollUserOpen, setIsEnrollUserOpen] = useState(false);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "subjectWithYear",
      headerName: "Subject",
      flex: 1,
      valueGetter: (params) => {
        return `${params}`;
      },
      renderCell: (params) => (
        <Typography
          color="black"
          sx={{
            alignContent: "center",
            minHeight: "100%",
          }}
        >
          {params.row?.subjectWithYear}
        </Typography>
      ),
    },
    {
      field: "code",
      headerName: "Code",
      flex: 2,
    },
    {
      field: "classroom",
      headerName: "Classroom",
      flex: 2,
      valueGetter: (params) => {
        return `${params?.name} (${params?.year})`;
      },
      renderCell: (params) => (
        <Typography
          color="black"
          sx={{
            textAlign: "center",
            alignContent: "center",
            minHeight: "100%",
          }}
        >
          {params.row?.classroom?.name} ({params.row?.classroom?.year})
        </Typography>
      ),
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
      field: "assignedUserCount",
      headerName: "Total # of members",
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
            {params.row?.assignedUserCount}
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
          <Tooltip title="Enroll User">
            <Button
              size="small"
              color="reset"
              variant="icon"
              onClick={() => {
                setIsEnrollUserOpen(true);
                setSelected(params.row);
              }}
            >
              <PersonAdd />
            </Button>
          </Tooltip>

          <Tooltip title="Reassign Classroom">
            <Button
              size="small"
              color="yeloh"
              variant="icon"
              onClick={() => {
                setSelected(params.row);
                setIsEnrollClassOpen(true);
              }}
            >
              <MoveDown />
            </Button>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const getSubjects = async () => {
    try {
      const response = await apiClient.post("/subjects/");
      console.log("response:", response.data);

      const processedSubjects = response.data.map((item) => ({
        ...item,
        nameWithYear: `${item.name} (${item.year})`,
        subjectWithYear: item.classroom ? `${item.name} (${item.year})` : "N/A",
      }));

      setSubjects(processedSubjects);

      console.log("subjects:", processedSubjects);
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
                    id: false,
                    dateCreated: false,
                  },
                },
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              disableRowSelectionOnClick
            />
          </Grid>
        </Grid>
      </Stack>
      <NewSubjectDialog
        isOpen={isNewSubjectOpen}
        handleClose={() => setIsNewSubjectOpen(false)}
        refresh={getSubjects}
      />
      <EnrollUserDialog
        isOpen={isEnrollUserOpen}
        handleClose={() => {
          setIsEnrollUserOpen(false);
        }}
        selected={selected}
        refresh={getSubjects}
      />
      <EnrollClassDialog
        isOpen={isEnrollClassOpen}
        handleClose={() => setIsEnrollClassOpen(false)}
        selected={selected}
        refresh={getSubjects}
      />
      <ViewMembersDialog
        isOpen={isMemberOpen}
        handleClose={() => setIsMemberOpen(false)}
        selected={selected}
        refresh={getSubjects}
      />
    </>
  );
};
export default SubjectManagement;
