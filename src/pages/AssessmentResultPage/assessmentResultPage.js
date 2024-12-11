import {
  TextField,
  Box,
  Stack,
  Typography,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import apiClient from "../../axios/axiosInstance";
import { useSnackbar } from "../../layouts/root_layout";

const AssessmentResultPage = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { assessment_id } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [userAnswers, setUserAnswers] = useState(null);
  const [assessment, setAssessment] = useState();

  const getAssessmentResult = async () => {
    try {
      const response = await apiClient.post(
        `/result_assessments/view/${assessment_id}`
      );

      if (response.data.assessment.questions) {
        const questionsWithFileUrls = response.data.assessment.questions.map(
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
        response.data.assessment.questions = questionsWithFileUrls;
      }

      setAssessmentResult(response.data);

      setAssessment(response.data.assessment);
      setUserAnswers(response.data.user_answers);
    } catch (error) {
      console.error("Error getting result of assessmentf:", error);
      showSnackbar({
        message: error.response?.data?.error,
        severity: "error",
      });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    getAssessmentResult();
  }, []);

  const currentQuestion = assessment?.questions[currentQuestionIndex];

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
            p: "1rem",
            overflowY: "auto",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              padding: "1rem",
              background: "#f9f9f9",
              borderRadius: "0.2rem",
            }}
          >
            <Grid item size={{ md: 6 }}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {assessment?.name}
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
              <Typography variant="h6">
                Score: {assessmentResult?.total_score}/
                {assessmentResult?.max_score}
              </Typography>
            </Grid>

            <Grid
              item
              size={{ md: 12 }}
              sx={{
                textAlign: "center",
              }}
            >
              <Typography variant="h6">
                Question {currentQuestionIndex + 1} of{" "}
                {assessment?.questions.length}
              </Typography>
            </Grid>
            {currentQuestion ? (
              <>
                <Grid item size={{ md: 6 }}>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {typeof currentQuestion?.type?.name === "string"
                      ? currentQuestion.type.name
                      : JSON.stringify(currentQuestion.type.name)}
                  </Typography>
                </Grid>
                <Grid item size={{ md: 6 }} sx={{ textAlign: "end" }}>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Earned Points (
                    {userAnswers.find(
                      (userAns) => userAns.question_id === currentQuestion.id
                    )?.points_earned || 0}
                    / {currentQuestion.points})
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
                  <Typography variant="body1" fontWeight={600} sx={{ mt: 1 }}>
                    {typeof currentQuestion?.label === "string"
                      ? currentQuestion.label
                      : JSON.stringify(currentQuestion.label)}
                  </Typography>
                </Grid>

                {(() => {
                  const userAnswer = userAnswers.find(
                    (userAns) => userAns.question_id === currentQuestion.id
                  );

                  switch (currentQuestion.type_id) {
                    case 1:
                      return (
                        currentQuestion.choices.length > 0 && (
                          <RadioGroup sx={{ mt: 2 }}>
                            {currentQuestion.choices.length > 0 &&
                              currentQuestion.choices.map((choice) => {
                                // Check if the choice is a user answer
                                const isUserAnswer = userAnswers.some(
                                  (answer) =>
                                    answer.question_id === currentQuestion.id &&
                                    answer.choice_id === choice.id
                                );

                                // Check if the choice is a correct answer
                                const isCorrectAnswer = choice.isCorrect === 1;

                                // Determine if the user's answer is incorrect
                                const isIncorrectUserAnswer =
                                  isUserAnswer && !isCorrectAnswer;

                                return (
                                  <Box
                                    key={choice.id}
                                    display="flex"
                                    alignItems="center"
                                    sx={{
                                      backgroundColor: isCorrectAnswer
                                        ? "rgba(0, 255, 0, 0.1)" // Light green for correct answers
                                        : isUserAnswer
                                        ? "rgba(255, 0, 0, 0.1)" // Light blue for user answers
                                        : "inherit", // Default background
                                      borderRadius: 1,
                                    }}
                                  >
                                    <Radio
                                      checked={isUserAnswer || isCorrectAnswer}
                                      disabled
                                      sx={{
                                        color: isCorrectAnswer
                                          ? "green" // Green for correct answers
                                          : isUserAnswer
                                          ? "red" // Blue for user answers
                                          : "default", // Default color
                                      }}
                                    />

                                    <Typography
                                      sx={{
                                        ml: 1,
                                        color: isCorrectAnswer
                                          ? "green" // Green text for correct answers
                                          : isUserAnswer
                                          ? "red" // Blue text for user answers
                                          : "inherit", // Default color
                                      }}
                                    >
                                      {choice.label}
                                    </Typography>
                                    <Box
                                      sx={{
                                        ml: 2,
                                        justifyContent: "center",
                                        display: "flex",
                                      }}
                                    >
                                      {isCorrectAnswer && (
                                        <CheckRoundedIcon
                                          sx={{ color: "green", fontSize: 24 }}
                                        />
                                      )}
                                      {isIncorrectUserAnswer && (
                                        <CloseRoundedIcon
                                          sx={{ color: "red", fontSize: 24 }}
                                        />
                                      )}
                                    </Box>
                                  </Box>
                                );
                              })}
                          </RadioGroup>
                        )
                      );

                    case 2:
                      return (
                        <>
                          <Grid item size={{ md: 12 }}>
                            <Stack
                              direction="row"
                              spacing={2}
                              sx={{ alignItems: "center" }}
                            >
                              <Typography>Your Answer:</Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  backgroundColor: userAnswer?.isCorrect
                                    ? "rgba(0, 255, 0, 0.2)"
                                    : "rgba(255, 0, 0, 0.2)",
                                  borderRadius: 1,
                                  padding: 1,
                                }}
                              >
                                <TextField
                                  variant="filled"
                                  value={
                                    userAnswer?.string_ans ||
                                    "No answer provided"
                                  }
                                  slotProps={{
                                    input: {
                                      readOnly: true,
                                    },
                                  }}
                                  sx={{
                                    backgroundColor: "transparent",
                                  }}
                                />
                                {userAnswer?.isCorrect ? (
                                  <CheckRoundedIcon
                                    sx={{ color: "green", fontSize: 20, ml: 1 }}
                                  />
                                ) : (
                                  <CloseRoundedIcon
                                    sx={{ color: "red", fontSize: 20, ml: 1 }}
                                  />
                                )}
                              </Box>
                            </Stack>
                          </Grid>

                          <Grid item size={{ md: 12 }}>
                            <Stack
                              direction="row"
                              spacing={2}
                              sx={{ alignItems: "center" }}
                            >
                              <Typography>Correct Answer:</Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  backgroundColor: "rgba(0, 255, 0, 0.2)", // Highlighting correct answer
                                  borderRadius: 1,
                                  padding: 1,
                                }}
                              >
                                <TextField
                                  variant="filled"
                                  value={
                                    currentQuestion?.choices[0]?.label ||
                                    "No answer provided"
                                  }
                                  slotProps={{
                                    input: {
                                      readOnly: true,
                                    },
                                  }}
                                  sx={{
                                    backgroundColor: "transparent",
                                  }}
                                />
                                <CheckRoundedIcon
                                  sx={{ color: "green", fontSize: 20, ml: 1 }}
                                />
                              </Box>
                            </Stack>
                          </Grid>
                        </>
                      );
                    case 3:
                      return (
                        <Grid item size={{ md: 12 }}>
                          <TextField
                            label="Your Answer"
                            variant="filled"
                            multiline
                            fullWidth
                            rows={4} // Adjust the number of rows as needed
                            value={
                              userAnswer
                                ? userAnswer.string_ans
                                : "No answer provided"
                            }
                            slotProps={{
                              input: {
                                readOnly: true, // Makes the input non-editable
                              },
                            }}
                            sx={{ mt: 1 }}
                          />
                        </Grid>
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
            ) : null}

            <Grid
              item
              size={{ md: 12 }}
              sx={{
                mt: "auto", // Push the buttons to the bottom
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                variant="outlined"
                onClick={handlePrevious}
                disabled={currentQuestionIndex <= 0}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  navigate(-1);
                }}
                disableElevation
              >
                Go Back
              </Button>
              <Button
                variant="outlined"
                onClick={handleNext}
                disabled={
                  currentQuestionIndex >= assessment?.questions?.length - 1
                }
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default AssessmentResultPage;
