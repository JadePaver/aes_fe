import Grid from "@mui/material/Grid2";
import {
  Stack,
  Button,
  Typography,
  Box,
  Divider,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AccessAlarmRoundedIcon from "@mui/icons-material/AccessAlarmRounded";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSnackbar } from "../../../layouts/root_layout";
import GradesProgress from "./gradesProgress";
import StudentAssessResultTable from "./studentsAssessResTable";
import { formatDateTime } from "../../../const/formatter";
import apiClient from "../../../axios/axiosInstance";

const AssessmentsPanel = ({ subjectID, assessments }) => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [currentPreview, setCurrentPreview] = useState({});
  const [confirmTakeOpen, setConfirmTakeOpen] = useState(false);
  const [userResults, setUserResults] = useState([]);

  const handleChangePreview = (data) => {
    const matchingResult = userResults.find(
      (result) => result.assessment_id === data.id
    );

    console.log("matchingResult:", matchingResult);
    if (matchingResult) {
      // Update data.isDone to 1 if a match is found
      data.isDone = 1;
      data.max_score = matchingResult.max_score;
      data.total_score = matchingResult.total_score;
    }
    console.log("current:", data);

    setCurrentPreview(data);
  };

  const getUserResults = async () => {
    try {
      const response = await apiClient.post(
        `/assessments/user_results/${subjectID}`
      );
      console.log("RESULTS:", response.data);
      setUserResults(response.data);
    } catch (error) {
      console.error("Error fetching assessment results:", error);
      showSnackbar({
        message: error.response?.data?.message,
        severity: "error",
      });
    }
  };

  const handleStartAssessment = async () => {
    try {
      const response = await apiClient.post(
        `/assessments/start/${currentPreview.id}`
      );
      navigate(`assessment_take/${currentPreview.id}`);

      showSnackbar({
        message: response.data?.message,
        severity: "success",
      });
    } catch (error) {
      console.error("Error fetching modules:", error);
      showSnackbar({
        message: error.response?.data?.message,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    getUserResults();
  }, []);

  return (
    <>
      <Grid
        container
        sx={{
          height: "100%",
        }}
      >
        <Grid
          item
          size={{
            md: 5.75,
          }}
          sx={{
            overflowY: "auto", // Correctly place overflowY here
            maxHeight: "calc(80vh - 2rem)", // Set max height
            padding: "0rem 1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack spacing={1}>
            {assessments.map((assessment) => (
              <Button
                key={assessment.assessment_id}
                variant={assessment.isDone ? "contained" : "outlined"}
                sx={{ mb: 2 }}
                disableElevation
                onClick={() => handleChangePreview(assessment)}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{
                    width: "100%",
                    p: "1rem 0",
                    color: assessment.isDone ? "var(--accent)" : "black",
                  }} // Set text color based on isDone
                >
                  <Typography
                    fontWeight={600}
                    color={assessment.isDone ? "var(--accent)" : "black"}
                  >
                    {assessment.name}
                  </Typography>
                  <Stack spacing={1} direction="row">
                    <Typography
                      color={assessment.isDone ? "var(--accent)" : "black"}
                    >
                      Deadline:
                    </Typography>{" "}
                    {/* Change color conditionally */}
                    <Typography
                      color={assessment.isDone ? "var(--accent)" : "black"}
                    >
                      {formatDateTime(assessment.endDateTime)}
                    </Typography>
                  </Stack>
                </Stack>
              </Button>
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          size={{ md: 0.1 }}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Divider
            orientation="vertical"
            sx={{
              border: "5px solid var(--secondary)",
              borderRadius: "5px",
              height: "92.5%",
            }}
            color="primary"
          />
        </Grid>
        <Grid
          item
          size={{ md: 5.95 }}
          sx={{
            overflowY: "auto", // Correctly place overflowY here
            maxHeight: "calc(80vh - 2rem)", // Set max height
            padding: "0rem 1rem",
            display: "flex",
            flexDirection: "column",
            scrollbarGutter: "stable",
          }}
        >
          <Stack spacing={2}>
            <Stack spacing={1} direction="row" justifyContent="space-between">
              <Typography fontWeight={600}>Label: </Typography>
              <Typography color="black">
                {currentPreview.name || "Select an assessment"}
              </Typography>
            </Stack>
            <Stack spacing={1} direction="row" justifyContent="space-between">
              <Typography fontWeight={600}>Description: </Typography>
              <Typography color="black">
                {currentPreview.description || "N/A"}
              </Typography>
            </Stack>
            <Stack spacing={1} direction="row" justifyContent="space-between">
              <Typography fontWeight={600}>Done: </Typography>
              <Checkbox
                checked={currentPreview.isDone === 1}
                sx={{ p: 0, cursor: "default" }}
              />
            </Stack>
            <Stack>
              <Stack spacing={1} direction="row" justifyContent="space-between">
                <Typography fontWeight={600}>Start Date: </Typography>
                <Typography color="black">
                  {currentPreview.startDateTime
                    ? formatDateTime(currentPreview.startDateTime)
                    : "N/A"}
                </Typography>
              </Stack>
              <Stack spacing={1} direction="row" justifyContent="space-between">
                <Typography fontWeight={600}>End Date: </Typography>
                <Typography color="black">
                  {currentPreview.endDateTime
                    ? formatDateTime(currentPreview.endDateTime)
                    : "N/A"}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              spacing={1}
              direction="row"
              justifyContent="space-between"
              alignItems="center" // This will vertically center the icon with the text
            >
              <Typography fontWeight={600}>Duration: </Typography>
              <Stack spacing={1} direction="row" alignItems="center">
                <AccessAlarmRoundedIcon />
                <Typography color="black">
                  {currentPreview.duration || "N/A"} minutes
                </Typography>
              </Stack>
            </Stack>

            <Stack spacing={1} direction="row" justifyContent="space-between">
              <Typography fontWeight={600}>Late Submission: </Typography>
              <Typography color="black">
                {currentPreview.allowedLate ? "Allowed" : "Not Allowed"}
              </Typography>
            </Stack>
            {currentPreview.total_score || currentPreview.max_score ? (
              <Stack
                spacing={1}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight={600}>Score:</Typography>
                <GradesProgress
                  variant="determinate"
                  value={
                    ((currentPreview.total_score || 0) /
                      (currentPreview.max_score || 1)) *
                    100
                  }
                  size="5rem"
                />
                <Typography color="black">
                  {currentPreview.total_score || "0"}/
                  {currentPreview.max_score || "0"}
                </Typography>
              </Stack>
            ) : <></>}
          </Stack>
          {/* <Box sx={{ minHeight: "100%", m: "1rem 0" }}>
            <StudentAssessResultTable />
          </Box> */}
          {currentPreview.id ? (
            currentPreview.isDone === 1 ? (
              <Button
                variant="contained"
                disableElevation
                size="large"
                sx={{ marginTop: "auto" }}
              >
                VIEW RESULT
              </Button>
            ) : (
              <Button
                variant="contained"
                disableElevation
                size="large"
                sx={{ marginTop: "auto" }}
                onClick={() => {
                  setConfirmTakeOpen(true);
                }}
              >
                TAKE ASSESSMENT
              </Button>
            )
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
      <Dialog
        open={confirmTakeOpen}
        onClose={() => {
          setConfirmTakeOpen(false);
        }}
      >
        <DialogTitle>Take "{currentPreview.name}"</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to start the "{currentPreview.name}"
            assessment? Once started, you won't be able to go back until it's
            completed.
            <br />
            Make sure you have a decent internet connection to avoid losing
            connection during the assessment duration.
            <br />
            Do not refresh the page to prevent exiting the assessment.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setConfirmTakeOpen(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleStartAssessment}
            color="secondary"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AssessmentsPanel;
