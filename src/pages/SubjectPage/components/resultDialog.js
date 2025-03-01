import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Typography,
  Stack,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RestoreRoundedIcon from "@mui/icons-material/RestoreRounded";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSnackbar } from "../../../layouts/root_layout";
import apiClient from "../../../axios/axiosInstance";
import { formatDateTime } from "../../../const/formatter";
import { render } from "@testing-library/react";

const ResultDialog = ({ selected }) => {
  const { subject_id } = useParams();
  const { showSnackbar } = useSnackbar();
  const [selectedRow, setSelectedRow] = useState();
  const [results, setResults] = useState([]);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);

  const columns = [
    {
      field: "user",
      headerName: "Full Name",
      flex: 2,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { fName, mName, lName, ext_name } = params.row?.user;
        // Combine name fields into a full name
        return `${fName || ""} ${mName || ""} ${lName || ""} ${
          ext_name || ""
        }`.trim();
      },
    },
    {
      field: "score",
      headerName: "Score",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        // Combine name fields into a full name
        return `${params.row?.total_score}/${params.row?.max_score}`;
      },
    },
    {
      field: "dateSubmitted",
      headerName: "Date Submitted",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return `${formatDateTime(params.row?.dateSubmitted)}`;
      },
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
          <Tooltip title="Reset Take Assessment">
            <Button
              size="small"
              color="reset"
              variant="icon"
              onClick={() => {
                setSelectedRow(params.row);
                setIsResetOpen(true);
              }}
            >
              <RestoreRoundedIcon />
            </Button>
          </Tooltip>
          {/* <Button
              size="small"
              color="info"
              variant="icon"
              onClick={() => {
                setIsResetOpen(true);
                setSelectedMember(params.row);
              }}
            >
              <LockResetOutlined />
            </Button> */}
        </Stack>
      ),
    },
  ];

  const getResults = async () => {
    try {
      const response = await apiClient.post(
        `/assessments/results_by_assessment/${selected.id}`
      );
      setResults(response.data);
    } catch (error) {
      showSnackbar({
        message: error.response?.data?.error,
        severity: "error",
      });
    }
  };

  const resetAssessment = async () => {
    try {
      const response = await apiClient.post(
        `/assessments/reset_result`,
        selectedRow
      );
      showSnackbar({
        message: response.data?.message,
        severity: "success",
      });
      setIsResetOpen(false);
      getResults();
    } catch (error) {
      console.error("Error fetching members:", error);
      showSnackbar({
        message: error.response?.data?.error,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    getResults();
  }, [selected]);

  return (
    <>
      <Badge badgeContent={results.length} color="primary" sx={{width:"100%"}}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<AssessmentRoundedIcon />}
          onClick={() => {
            setIsResultOpen(true);
          }}
        >
          ALL STUDENT RESULTS
        </Button>
      </Badge>
      <Dialog
        open={isResultOpen}
        onClose={() => {
          setIsResetOpen(false);
        }}
        fullWidth
        PaperProps={{
          sx: {
            minWidth: "90%",
            minHeight: "90%",
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h5" fontWeight={600}>
            view students result
          </Typography>
          <Typography variant="h6"></Typography>
          <Button
            onClick={() => {
              setIsResultOpen(false);
            }}
            variant="icon"
            disableElevation
            color="error"
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
            }}
          >
            <CloseRoundedIcon />
          </Button>
        </DialogTitle>
        <DialogContent sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}>
            <DataGrid
              rows={results}
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
          </Box>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>

      <Dialog open={isResetOpen}>
        <DialogTitle>Confirm Reset Assessment Take</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Resetting student Assessment will remove previous record. Are you
            sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsResetOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={resetAssessment} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ResultDialog;
