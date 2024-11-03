import { DataGrid } from "@mui/x-data-grid";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import { AccessTimeOutlined } from "@mui/icons-material";

const totalScore = 60;

const rows = [
  {
    id: 1,
    studentName: "Edward D. Snowden",
    score: 12,
    totalScore: 20,
    dateTaken: "01/01/2024, 10:09PM",
  },
  {
    id: 2,
    studentName: "John Doe",
    score: 15,
    totalScore: 25,
    dateTaken: "01/02/2024, 11:15AM",
  },
  {
    id: 3,
    studentName: "Jane Smith",
    score: 18,
    totalScore: 30,
    dateTaken: "01/03/2024, 09:45AM",
  },
  {
    id: 4,
    studentName: "Alice Johnson",
    score: 20,
    totalScore: 40,
    dateTaken: "01/04/2024, 08:30AM",
  },
  {
    id: 5,
    studentName: "Bob Brown",
    score: 10,
    totalScore: 20,
    dateTaken: "01/05/2024, 12:00PM",
  },
  {
    id: 6,
    studentName: "Charlie Davis",
    score: 25,
    totalScore: 50,
    dateTaken: "01/06/2024, 01:15PM",
  },
  {
    id: 7,
    studentName: "Diana Prince",
    score: 30,
    totalScore: 60,
    dateTaken: "01/07/2024, 02:45PM",
  },
  {
    id: 8,
    studentName: "Ethan Hunt",
    score: 22,
    totalScore: 40,
    dateTaken: "01/08/2024, 03:30PM",
  },
  {
    id: 9,
    studentName: "Fiona Gallagher",
    score: 28,
    totalScore: 50,
    dateTaken: "01/09/2024, 04:00PM",
  },
  {
    id: 10,
    studentName: "George Clooney",
    score: 15,
    totalScore: 30,
    dateTaken: "01/10/2024, 05:15PM",
  },
  {
    id: 11,
    studentName: "Hannah Montana",
    score: 19,
    totalScore: 35,
    dateTaken: "01/11/2024, 06:00PM",
  },
  {
    id: 12,
    studentName: "Isaac Newton",
    score: 23,
    totalScore: 45,
    dateTaken: "01/12/2024, 07:30PM",
  },
  {
    id: 13,
    studentName: "Jack Sparrow",
    score: 17,
    totalScore: 30,
    dateTaken: "01/13/2024, 08:15PM",
  },
  {
    id: 14,
    studentName: "Katherine Johnson",
    score: 29,
    totalScore: 50,
    dateTaken: "01/14/2024, 09:00PM",
  },
  {
    id: 15,
    studentName: "Leonardo DiCaprio",
    score: 21,
    totalScore: 40,
    dateTaken: "01/15/2024, 10:45PM",
  },
  {
    id: 16,
    studentName: "Mia Wallace",
    score: 16,
    totalScore: 30,
    dateTaken: "01/16/2024, 11:30PM",
  },
  {
    id: 17,
    studentName: "Nina Simone",
    score: 27,
    totalScore: 50,
    dateTaken: "01/17/2024, 12:15AM",
  },
  {
    id: 18,
    studentName: "Oliver Twist",
    score: 14,
    totalScore: 25,
    dateTaken: "01/18/2024, 01:00AM",
  },
  {
    id: 19,
    studentName: "Pamela Anderson",
    score: 20,
    totalScore: 40,
    dateTaken: "01/19/2024, 02:00AM",
  },
  {
    id: 20,
    studentName: "Quentin Tarantino",
    score: 26,
    totalScore: 50,
    dateTaken: "01/20/2024, 03:00AM",
  },
];

const columns = [
  {
    field: "studentName",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "score",
    headerName: "Score",
    flex: 1,
    renderCell: (params) => (
      <>
        <Typography alignItems="center">
          {params.row?.score}/{totalScore}
        </Typography>
      </>
    ), // Display "score / totalScore"
  },
  {
    field: "dateTaken",
    headerName: "Date Taken",
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
        <Tooltip title="Approve">
          <Button size="small" color="gray" variant="icon">
            <AccessTimeOutlined />
          </Button>
        </Tooltip>
        <Tooltip title="Reset student password">
          <Button size="small" color="primary" variant="icon">
            <VisibilityOutlinedIcon />
          </Button>
        </Tooltip>
      </Stack>
    ),
  },
];

const StudentAssessResultTable = () => {
  return (
    <>
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
        sx={{ height: "100%", border: "1px solid var(--primary)" }}
      />
    </>
  );
};

export default StudentAssessResultTable;
