import Grid from "@mui/material/Grid2";
import {
  Stack,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

import apiClient from "../../axios/axiosInstance";
import { useSnackbar } from "../../layouts/root_layout";
import { useParams } from "react-router-dom";

const TakeAssessmentPage = ({}) => {
  const { showSnackbar } = useSnackbar();
  const { assessment_id } = useParams();
  const [assessment, setAssessment] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [assessmentResult, setAssessmentResult] = useState();

  const getAssessments = async () => {
    try {
      const response = await apiClient.post(
        `/assessments/get_by_id/${assessment_id}`
      );

      console.log("assessment:", response.data);

      setAssessment(response.data);
    } catch (error) {
      console.error("Error submitting module data:", error);
      showSnackbar({
        message: error.response?.data?.error,
        severity: "error",
      });
    }
  };

  const getLastResult = async () => {
    try {
      const response = await apiClient.post(
        `/assessments/last_record/${assessment_id}`
      );
      setAssessmentResult(response.data);

      console.log("lastResult:", response.data);
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
    console.log("updatedAnswers:", updatedAnswers);
    console.log("currentQuestion:", currentQuestion);
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
      console.log("submitted");
    } catch (error) {
      console.error("error:", error);
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
            // overflowY: "auto",
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
            <Typography variant="h4">{assessment.name}</Typography>
            <Grid
              container
              sx={{
                width: "100%",
                padding: "1rem",
                background: "#f9f9f9",
                borderRadius: "0.2rem",
              }}
            >
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
                variant="contained"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              {currentQuestionIndex < assessment.questions.length ? (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleSubmit} // Handle submission
                >
                  Submit
                </Button>
              )}
            </Stack>
          </Stack>
        </Grid>
      </Stack>
    </>
  );
};

export default TakeAssessmentPage;
