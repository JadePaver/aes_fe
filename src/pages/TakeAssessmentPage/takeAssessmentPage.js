import Grid from "@mui/material/Grid2";
import {
  Box,
  Stack,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";

import apiClient from "../../axios/axiosInstance";
import { useSnackbar } from "../../layouts/root_layout";
import Timer from "./components/timer";

const TakeAssessmentPage = ({}) => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { assessment_id } = useParams();
  const [assessment, setAssessment] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [assessmentResult, setAssessmentResult] = useState();
  const [remainingTime, setRemainingTime] = useState();

  const getAssessments = async () => {
    try {
      const response = await apiClient.post(
        `/assessments/get_by_id/${assessment_id}`
      );
      const data = response.data;

      if (response.data.questions) {
        const questionsWithFileUrls = response.data.questions.map(
          (question) => {
            if (question.question_images?.length > 0) {
              question.question_images = question.question_images.map(
                (file) => {
                  if (file.fileBase64) {
                    try {
                      // Decode base64 string to binary data
                      const binaryString = atob(file.fileBase64);

                      // Convert the binary string to a Uint8Array
                      const byteArray = new Uint8Array(binaryString.length);
                      for (let i = 0; i < binaryString.length; i++) {
                        byteArray[i] = binaryString.charCodeAt(i);
                      }

                      // Create a Blob from the byte array
                      const fileBlob = new Blob([byteArray], {
                        type: "image/jpeg", // Update MIME type based on the file, e.g., "image/png" or "application/pdf"
                      });

                      // Create a Blob URL from the Blob
                      file.fileUrl = URL.createObjectURL(fileBlob);
                    } catch (err) {
                      console.error("Error creating Blob URL:", err);
                    }
                  } else {
                    console.warn("file.fileBase64 is missing:", file);
                  }

                  return file;
                }
              );
            }

            return question;
          }
        );
        data.questions = questionsWithFileUrls;
      }

      setAssessment(data);

      setRemainingTime(response.data.timeRemaining);
    } catch (error) {
      let errorMessage = "An unexpected error occurred.";
      if (error.response) {
        errorMessage =
          error.response.data?.message || error.response.statusText;
      } else if (error.request) {
        errorMessage =
          "Unable to connect to the server. Please try again later.";
      }

      console.error("Error fetching assessment:", error);
      showSnackbar({
        message: errorMessage,
        severity: "error",
      });
      navigate(-1);
    }
  };

  const getLastResult = async () => {
    try {
      const response = await apiClient.post(
        `/assessments/last_record/${assessment_id}`
      );
      setAssessmentResult(response.data);
    } catch (error) {
      console.error("Error getting lastResult data:", error);
      showSnackbar({
        message: error.response?.data?.error,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    getLastResult();
    getAssessments();
  }, []);

  // Handle navigation
  const handleNext = () => {
    if (currentQuestionIndex < assessment.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleAnswerChange = (questionId, choiceId, answer) => {
    const updatedAnswers = [...answers];
    const existingAnswerIndex = updatedAnswers.findIndex(
      (answer) => answer.question_id === questionId
    );

    if (existingAnswerIndex !== -1) {
      updatedAnswers[existingAnswerIndex] = {
        ...updatedAnswers[existingAnswerIndex],
        choice_id: choiceId, // for multiple choice
        stringAnswer: answer, // for fill-in or essay questions
      };
    } else {
      updatedAnswers.push({
        question_id: questionId,
        choice_id: choiceId,
        stringAnswer: answer,
      });
    }
    setAnswers(updatedAnswers);
  };

  if (!assessment) {
    return <Typography>Loading...</Typography>;
  }

  const currentQuestion = assessment.questions[currentQuestionIndex];

  const handleSubmit = async () => {
    try {
      const data = { answers: answers, assessmentResult: assessmentResult };
      const response = await apiClient.post(
        `/assessments/record_result/${assessment_id}`,
        data
      );
      showSnackbar({
        message: response.data?.message,
        severity: "success",
      });
      navigate(-1);
    } catch (error) {
      console.error("error:", error);
      showSnackbar({
        message: error.response?.data?.error,
        severity: "error",
      });
      navigate(-1);
    }
  };

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
          rowSpacing={3}
          columnSpacing={5.95}
          sx={{
            width: "100%",
            height: "100%",
            background: "white",
            borderRadius: "0.2rem",
            p: "0",
            overflowY: "auto",
            // maxHeight: "calc(100vh - 2rem)",
          }}
        >
          <Stack
            spacing={2}
            sx={{
              padding: "1rem",
              width: "100%",
              height: "100%",
              overflow: "hidden",
              background: "white",
              borderRadius: "0.2rem",
            }}
          >
            <Stack
              sx={{
                minHeight: "100%",
                justifyContent: "space-between",
              }}
            >
              <Grid
                container
                sx={{
                  width: "100%",
                  padding: "1rem",
                  background: "#f9f9f9",
                  borderRadius: "0.2rem",
                }}
              >
                <Grid container size={{ md: 12 }}>
                  <Grid item size={{ md: 6 }}>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {assessment.name}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    size={{ md: 6 }}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Timer time={remainingTime} onTimerExpire={handleSubmit} />
                  </Grid>
                </Grid>
                {currentQuestionIndex === assessment.questions.length ? (
                  <>
                    <Grid
                      item
                      size={{ md: 12 }}
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h6">
                        You've reach the end of this test. review your answer's
                        and submit to record result
                      </Typography>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid
                      item
                      size={{ md: 12 }}
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h6">
                        Question {currentQuestionIndex + 1} of{" "}
                        {assessment.questions.length}
                      </Typography>
                    </Grid>
                    <Grid item size={{ md: 12 }}>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        {currentQuestion.type?.name}
                      </Typography>
                    </Grid>
                    {currentQuestion.question_images.map((image, index) => (
                      <Grid item size={{ md: 12 }} key={index}>
                        <Box
                          component="img"
                          src={image.fileUrl}
                          sx={{
                            width: "400px",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Grid>
                    ))}

                    <Grid item size={{ md: 12 }}>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        {currentQuestion.label}
                      </Typography>
                    </Grid>

                    {(() => {
                      switch (currentQuestion.type_id) {
                        case 1:
                          return (
                            currentQuestion.choices.length > 0 && (
                              <RadioGroup
                                sx={{ mt: 2 }}
                                value={
                                  answers.find(
                                    (answer) =>
                                      answer.question_id === currentQuestion.id
                                  )?.choice_id || ""
                                }
                                onChange={(e) =>
                                  handleAnswerChange(
                                    currentQuestion.id,
                                    e.target.value,
                                    ""
                                  )
                                }
                              >
                                {currentQuestion.choices.map((choice) => (
                                  <FormControlLabel
                                    key={choice.id}
                                    value={choice.id}
                                    control={<Radio />}
                                    label={choice.label}
                                  />
                                ))}
                              </RadioGroup>
                            )
                          );

                        case 2:
                          return (
                            <TextField
                              label="Answer Fill In"
                              variant="outlined"
                              fullWidth
                              sx={{ mt: 2 }}
                              value={
                                answers.find(
                                  (answer) =>
                                    answer.question_id === currentQuestion.id
                                )?.stringAnswer || ""
                              }
                              onChange={(e) =>
                                handleAnswerChange(
                                  currentQuestion.id,
                                  null,
                                  e.target.value
                                )
                              }
                            />
                          );

                        case 3:
                          return (
                            <TextField
                              label="Essay"
                              variant="outlined"
                              fullWidth
                              multiline
                              rows={6}
                              sx={{ mt: 2 }}
                              value={
                                answers.find(
                                  (answer) =>
                                    answer.question_id === currentQuestion.id
                                )?.stringAnswer || ""
                              }
                              onChange={(e) =>
                                handleAnswerChange(
                                  currentQuestion.id,
                                  null,
                                  e.target.value
                                )
                              }
                            />
                          );

                        default:
                          return (
                            <Typography variant="body2">
                              Unsupported question type
                            </Typography>
                          );
                      }
                    })()}
                  </>
                )}
              </Grid>

              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                sx={{ mt: 2 }}
              >
                <Button
                  disableElevation
                  variant="contained"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                {currentQuestionIndex < assessment.questions.length ? (
                  <Button
                    disableElevation
                    variant="contained"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    disableElevation  
                    variant="contained"
                    onClick={handleSubmit} // Handle submission
                  >
                    Submit
                  </Button>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Stack>
    </>
  );
};

export default TakeAssessmentPage;
