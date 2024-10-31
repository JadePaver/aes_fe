import Box from "@mui/material/Box";
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

import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

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

const MemberListTable = () => {
  const [isRemoveDialog, setIsRemoveDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
            <Button size="small" color="primary" variant="icon">
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
        sx={{ height: "100%" }}
      />

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h5" fontWeight={600}>
            {isRemoveDialog ? "Remove This Student" : "Reset Student Password"}
          </Typography>
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "space-evenly", p: "2rem" }}>
          <Button
            variant="contained"
            onClick={console.log("submit")}
            color="primary"
            sx={{ p: "0.5rem 3rem" }}
            disableElevation
          >
            {isRemoveDialog ? "Remove" : "Reset"}
          </Button>

          <Button
            onClick={() => setIsOpen(false)}
            sx={{ p: "0.35rem 3rem" }}
            variant="outlined"
            disableElevation
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MemberListTable;
