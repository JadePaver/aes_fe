import { useState } from "react";
import { Box, Stack, Tooltip, Button, Modal, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";

const ViewClassMemberTable = ({ isOpen, onClose, classData }) => {
  const [isRemoveDialog, setIsRemoveDialog] = useState(false);

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
                // setIsOpen(true);
              }}
            >
              <PersonRemoveRoundedIcon />
            </Button>
          </Tooltip>
        </Stack>
      ),
    },
  ];

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

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
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
          <Typography variant="h6">
            {classData?.className}({classData?.year})
          </Typography>
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
    </>
  );
};

export default ViewClassMemberTable;
