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
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import { useEffect, useState, useContext } from "react";

import { useSubject } from "../../layouts/components/subjectProvider";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { red } from "@mui/material/colors";

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: "Katy", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
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

function FormRow() {
  return (
    <React.Fragment>
      <Grid item xs={4}>
        <Item>Item</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Item</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Item</Item>
      </Grid>
    </React.Fragment>
  );
}

const AssignClassroom = () => {
  const [isRemoveDialog, setIsRemoveDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
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
          <Tooltip title="Approve">
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={handleOpen}
            >
              <HowToRegRoundedIcon />
            </Button>
          </Tooltip>
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
          <Tooltip title="Reset student password">
            <Button
              size="small"
              color="gray"
              variant="icon"
              onClick={() => {
                setIsRemoveDialog(false);
                setIsOpen(true);
              }}
            >
              <LockResetRoundedIcon />
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
    <>
      <Stack
        spacing={1}
        sx={{
          padding: "0.1rem",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Grid
          container
          // rowSpacing={3}
          // columnSpacing={5.5}
          sx={{
            width: "100%",
            height: "100%",
            background: "white",
            borderRadius: "0.2rem",
            p: "1rem",
            overflowY: "auto", // Enable vertical scrolling
            maxHeight: "calc(100vh - 2rem)",
          }}
        >
          <Grid size={12} item sx={{ backgroundColor: "red" }} zeroMinWidth>
            {/* <Grid>test</Grid> */}
            <Typography>test</Typography>
          </Grid>

          <Grid item size={12}>
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
            />
          </Grid>

          {/* Modal component */}
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90%",
                height: "90%",
                bgcolor: "background.paper",
                borderRadius: 1,
                boxShadow: 24,
                p: 4,
              }}
            >
              <DataGrid
                rows={rows}
                columns={columnsModal}
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
              />
            </Box>
          </Modal>
        </Grid>
      </Stack>
    </>
  );
};
export default AssignClassroom;
