import {
  Box,
  Stack,
  Typography,
  TextField,
  Switch,
  IconButton,
  Button,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
  matchPath,
} from "react-router-dom";

import { useSubject } from "../../layouts/components/subjectProvider";
import apiClient from "../../axios/axiosInstance";
import { useSnackbar } from "../../layouts/root_layout";

const AssessmentEditorPage = () => {
  const navigate = useNavigate();
  const { subject_id } = useParams();
  const location = useLocation();
  const { showSnackbar } = useSnackbar();
  const { setSubjectName } = useSubject();
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });
  const [newAssessment, setNewAssessment] = useState({
    subject_id: subject_id,
    name: "",
    description: "",
    duration: 0,
    allowLate: false,
    startDate: dayjs(),
    endDate: dayjs(),
  });

  const [questions, setQuestions] = useState([
    {
      id: 1,
      label: "",
      points: 0,
      type: 1,
      choices: [],
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevData) => ({
      ...prevData,
      [name]: "",
    }));
    setNewAssessment((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setQuestions((prevQuestions) =>
        prevQuestions.map((question, i) =>
          i === index
            ? { ...question, fileBlob: fileUrl, file: file }
            : question
        )
      );
    }
  };

  const handleCreateAssessment = async () => {
    try {
      const transformedQuestions = questions.map((question) => {
        if (question.file && question.file.name) {
          return {
            ...question,
            file: {
              originalName: question.file.name,
              size: question.file.size,
              type: question.file.type,
            },
          };
        }
        return {
          ...question,
          file: null, // Retain an empty object if no valid file is present
        };
      });

      const data = { ...newAssessment, questions: transformedQuestions };
      const formData = new FormData();

      if (validateAssessmentData(data)) {
        const serializedData = encodeURIComponent(JSON.stringify(data));
        // Add files from questions array to FormData
        questions.forEach((question) => {
          if (question.file) {
            formData.append("files", question.file); // Ensure `question.file` is a valid File object
          }
        });
        const response = await apiClient.post(
          `/assessments/create/${serializedData}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Ensure proper content type
            },
          }
        );
        navigate(-1);
        showSnackbar({
          message: response?.data?.message,
          severity: "success",
        });
      }
    } catch (error) {
      console.error("Error submitting new Assessment data's:", error);
      showSnackbar({
        message: error.response?.data?.error,
        severity: "error",
      });
    }
  };

  const validateAssessmentData = (data) => {
    console.log("Validate:", data);
    let validateErrors = {};
    let questionErrors = {};

    // General validation for assessment data
    if (!data.name || data.name.trim() === "") {
      validateErrors.name = "Assessment name cannot be empty.";
    }
    if (!data.description || data.description.trim() === "") {
      validateErrors.description = "Description cannot be empty.";
    }
    if (!data.duration || data.duration < 1) {
      validateErrors.duration = "Duration can't be lower than 1 minute.";
    }

    // Validation for each question
    data.questions.forEach((question) => {
      let qErrors = {};

      if (!question.label || question.label.trim() === "") {
        qErrors.label = "Question text cannot be empty.";
      }
      if (question.points == null || question.points < 1) {
        qErrors.points = "Points must be at least 1.";
      }

      if (Object.keys(qErrors).length > 0) {
        questionErrors[question.id] = qErrors; // Store errors by question ID
      }
    });

    // Combine all errors
    if (Object.keys(questionErrors).length > 0) {
      validateErrors.questions = questionErrors;
    }

    setErrors(validateErrors);

    return Object.keys(validateErrors).length === 0;
  };

  const getSubjectDetails = async () => {
    try {
      const response = await apiClient.post(`/subjects/details/${subject_id}`);
      setSubjectName(response.data?.name);
    } catch (error) {
      console.error("Error fetching subjectdetails:", error);
      showSnackbar({
        message: error.response?.data?.message,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    getSubjectDetails();
  }, []);

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
          columnSpacing={2}
          rowGap={2}
          container
          sx={{
            width: "100%",
            background: "white",
            borderRadius: "0.2rem",
            p: "1rem",
            overflowY: "auto", // Enable vertical scrolling
            maxHeight: "calc(100vh - 2rem)",
          }}
        >
          <Grid item size={12}>
            <Typography
              fullWidth
              textAlign="center"
              variant="h5"
              fontWeight={600}
            >
              CREATE NEW ASSESSMENT
            </Typography>
          </Grid>
          <Grid item size={12}>
            <TextField
              variant="outlined"
              name="name"
              value={newAssessment.name}
              onChange={handleChange}
              label="Assessment Name"
              placeholder="Write your Assessment name here"
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid item size={{ md: 12 }}>
            <TextField
              variant="outlined"
              name="description"
              label="Description"
              value={newAssessment.description}
              onChange={handleChange}
              multiline
              rows={10}
              fullWidth
              error={!!errors.description}
              helperText={errors.description}
              placeholder="Your description..."
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid item size={{ md: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date"
                value={newAssessment.startDate}
                onChange={(newValue) =>
                  setNewAssessment({ ...newAssessment, startDate: newValue })
                }
                renderInput={(params) => <TextField {...params} fullWidth />}
                minDateTime={dayjs()}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item size={{ md: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Date"
                value={newAssessment.endDate}
                onChange={(newValue) =>
                  setNewAssessment({ ...newAssessment, endDate: newValue })
                }
                renderInput={(params) => <TextField {...params} fullWidth />}
                minDateTime={newAssessment.startDate || dayjs()}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item size={{ md: 3 }}></Grid>

          <Grid item size={{ md: 1.5 }}>
            <TextField
              variant="outlined"
              name="duration"
              value={newAssessment.duration}
              type="number"
              onChange={handleChange}
              label="Duration"
              fullWidth
              error={!!errors.duration}
              helperText={errors.duration}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <TimerOutlinedIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">Minutes</InputAdornment>
                  ),
                },
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid item size={{ md: 1.5 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ height: "100%", alignItems: "center" }}
            >
              <Typography>Allow late Submission:</Typography>
              <Switch
                value={newAssessment.allowLate}
                onChange={() => {
                  setNewAssessment({
                    ...newAssessment,
                    allowLate: !newAssessment.allowLate,
                  });
                }}
              />
            </Stack>
          </Grid>
          <Grid item size={12}>
            <Typography
              fullWidth
              textAlign="center"
              variant="h6"
              fontWeight={600}
            >
              Your Questions:
            </Typography>
          </Grid>
          {questions && questions.length > 0 ? (
            questions.map((question, index) => {
              const questionError = errors?.questions?.[question.id] || {};
              return (
                <Grid
                  key={index} // Set a unique key
                  container
                  spacing={2}
                  size={12} // Adjust spacing directly on the container
                  sx={{
                    border:
                      questionError.label || questionError.points
                        ? "2px solid red"
                        : "1px solid var(--primary)",
                    borderRadius: "1rem",
                    p: "1rem",
                  }}
                >
                  <Grid item size={12}>
                    <Box>
                      {question.file && (
                        <img
                          src={question.fileBlob}
                          alt={`Upload preview for question ${index + 1}`}
                          style={{
                            maxWidth: "40%",
                            height: "auto",
                          }}
                        />
                      )}
                    </Box>
                  </Grid>
                  <Grid item size={11}>
                    <Typography
                      variant="body1"
                      fontSize="1.25rem"
                      fontWeight={600}
                      sx={{ height: "100%" }}
                    >
                      Q#{index + 1}
                    </Typography>
                  </Grid>

                  <Grid item size={1}>
                    <Stack direction="row" justifyContent="center">
                      <IconButton
                        color="primary"
                        component="label" // Allows opening file dialog
                      >
                        <AddPhotoAlternateOutlinedIcon
                          sx={{ fontSize: "2rem" }}
                        />
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) => handleFileChange(e, index)}
                        />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() =>
                          setQuestions(
                            questions.filter((q) => q.id !== question.id)
                          )
                        }
                      >
                        <DisabledByDefaultRoundedIcon fontSize="large" />
                      </IconButton>
                    </Stack>
                  </Grid>

                  <Grid item size={11}>
                    <TextField
                      variant="outlined"
                      name="type"
                      label="Type"
                      select
                      fullWidth
                      value={question?.type}
                      onChange={(event) => {
                        const newType = Number(event.target.value);
                        setQuestions((prevQuestions) =>
                          prevQuestions.map((q, i) =>
                            i === index ? { ...q, type: newType } : q
                          )
                        );
                      }}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                    >
                      <MenuItem value={1}>Multiple Choices</MenuItem>
                      <MenuItem value={2}>Fill-in the Blanks</MenuItem>
                      <MenuItem value={3}>Essay</MenuItem>
                      <MenuItem value={4}>DropBox</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item size={1}>
                    <TextField
                      variant="outlined"
                      name="points"
                      label="Points"
                      type="number"
                      value={question?.points}
                      fullWidth
                      error={!!questionError.points} // Highlight TextField with error
                      helperText={questionError.points} // Display specific error message
                      onChange={(event) => {
                        const newPoints = Number(event.target.value);
                        setQuestions((prevQuestions) =>
                          prevQuestions.map((q, i) =>
                            i === index ? { ...q, points: newPoints } : q
                          )
                        );
                        // Remove the error for this question's points field
                        setErrors((prevErrors) => {
                          const newErrors = { ...prevErrors };
                          if (newErrors?.questions?.[question.id]?.points) {
                            newErrors.questions[question.id].points = "";
                          }
                          return newErrors;
                        });
                      }}
                      slotProps={{
                        htmlInput: {
                          min: 0,
                        },
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item size={12}>
                    <TextField
                      variant="outlined"
                      name="label"
                      label="Question"
                      value={question?.label}
                      fullWidth
                      error={!!questionError.label} // Highlight TextField with error
                      helperText={questionError.label} // Display specific error message
                      onChange={(event) => {
                        setQuestions((prevQuestions) =>
                          prevQuestions.map((q, i) =>
                            i === index
                              ? { ...q, label: event.target.value }
                              : q
                          )
                        );

                        setErrors((prevErrors) => {
                          const newErrors = { ...prevErrors };
                          if (newErrors?.questions?.[question.id]?.label) {
                            newErrors.questions[question.id].label = "";
                          }
                          return newErrors;
                        });
                      }}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                    />
                  </Grid>

                  <Grid container item size={12}>
                    {(() => {
                      switch (question?.type) {
                        case 1:
                          return (
                            <>
                              <FormControl fullWidth>
                                <RadioGroup
                                  aria-labelledby="demo-controlled-radio-buttons-group"
                                  name="controlled-radio-buttons-group"
                                  onChange={(event) => {
                                    const selectedLabel = event.target.value;
                                    setQuestions((prevQuestions) =>
                                      prevQuestions.map((q) =>
                                        q === question
                                          ? {
                                              ...q,
                                              choices: q.choices.map((choice) =>
                                                choice.label === selectedLabel
                                                  ? { ...choice, isCorrect: 1 }
                                                  : { ...choice, isCorrect: 0 }
                                              ),
                                            }
                                          : q
                                      )
                                    );
                                  }}
                                >
                                  <Grid
                                    container
                                    item
                                    size={12}
                                    spacing={1}
                                    columnSpacing={3}
                                    sx={{ p: "0 1rem" }}
                                  >
                                    {question.choices?.map((choice) => (
                                      <Grid item size={6} key={choice.id}>
                                        <FormControlLabel
                                          key={choice.id}
                                          value={choice.label}
                                          control={
                                            <Radio sx={{ m: "auto 0" }} />
                                          }
                                          sx={{
                                            border: "1px solid var(--primary)",
                                            borderRadius: "0.2rem",
                                            m: "0",
                                            width: "100%",
                                            overflow: "hidden",
                                            alignItems: "flex-start",
                                            ".MuiFormControlLabel-label": {
                                              width: "100%", // Ensures the label takes up full width
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }, // Align contents to the top for consistent layout
                                          }}
                                          label={
                                            <Stack
                                              direction="row"
                                              sx={{
                                                minWidth: "100%",
                                                overflow: "hidden",
                                                justifyContent: "center",
                                                alignItems: "stretch",
                                                m: "auto 0",
                                              }}
                                            >
                                              <TextField
                                                variant="filled"
                                                value={choice.label}
                                                sx={{
                                                  width: "100%",
                                                  "& .MuiFilledInput-root": {
                                                    height: "100%",
                                                    padding: "auto", // Removes padding around the input area
                                                  },
                                                  "& .MuiFilledInput-input": {
                                                    height: "100%",
                                                    padding: "auto", // Removes padding inside the input area
                                                  },
                                                }}
                                                InputProps={{
                                                  disableUnderline: true, // Disables the underline in the filled variant
                                                }}
                                                onChange={(event) => {
                                                  const newLabel =
                                                    event.target.value; // Get the new label value
                                                  setQuestions(
                                                    (prevQuestions) =>
                                                      prevQuestions.map((q) =>
                                                        q === question
                                                          ? {
                                                              ...q,
                                                              choices:
                                                                q.choices.map(
                                                                  (c) =>
                                                                    c.id ===
                                                                    choice.id
                                                                      ? {
                                                                          ...c,
                                                                          label:
                                                                            newLabel,
                                                                        } // Update the label
                                                                      : c
                                                                ),
                                                            }
                                                          : q
                                                      )
                                                  );
                                                }}
                                              />
                                              <Button
                                                variant="outlined"
                                                color="error"
                                                sx={{ zIndex: 2 }}
                                                onClick={() => {
                                                  setQuestions(
                                                    (prevQuestions) =>
                                                      prevQuestions.map((q) =>
                                                        q === question
                                                          ? {
                                                              ...q,
                                                              choices:
                                                                q.choices.filter(
                                                                  (c) =>
                                                                    c.id !==
                                                                    choice.id
                                                                ),
                                                            }
                                                          : q
                                                      )
                                                  );
                                                }}
                                              >
                                                <ClearRoundedIcon />
                                              </Button>
                                            </Stack>
                                          }
                                        />
                                      </Grid>
                                    ))}
                                    <Grid item size={6}>
                                      <Button
                                        variant="outlined"
                                        fullWidth
                                        sx={{
                                          height: "100%",
                                        }}
                                        onClick={() => {
                                          const newChoice = {
                                            id: Date.now(),
                                            label: "",
                                            isCorrect: 0,
                                          }; // Create a new choice with a unique id
                                          setQuestions((prevQuestions) =>
                                            prevQuestions.map((q) =>
                                              q === question
                                                ? {
                                                    ...q,
                                                    choices: [
                                                      ...q.choices,
                                                      newChoice,
                                                    ],
                                                  }
                                                : q
                                            )
                                          );
                                        }}
                                      >
                                        <Stack direction="row" spacing={1}>
                                          <AddRoundedIcon />
                                          <Typography>
                                            Add new choice
                                          </Typography>
                                        </Stack>
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </RadioGroup>
                              </FormControl>
                            </>
                          );
                        case 2:
                          return (
                            <>
                              <Grid item size={10}>
                                <TextField
                                  variant="filled"
                                  name="fill_answer"
                                  label="Correct Answer"
                                  value={question?.fill_ans}
                                  fullWidth
                                  onChange={(e) =>
                                    setQuestions((prev) =>
                                      prev.map((q, idx) =>
                                        idx === index
                                          ? { ...q, fill_ans: e.target.value }
                                          : q
                                      )
                                    )
                                  }
                                  slotProps={{
                                    inputLabel: {
                                      shrink: true,
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid item size={2}>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                  sx={{ height: "100%", alignItems: "center" }}
                                >
                                  <Typography>
                                    Enable Case Sensitivity:
                                  </Typography>
                                  <Switch
                                    value={question?.caseSensitive}
                                    onChange={(e) =>
                                      setQuestions((prev) =>
                                        prev.map((q, idx) =>
                                          idx === index
                                            ? {
                                                ...q,
                                                caseSensitive: e.target.checked,
                                              }
                                            : q
                                        )
                                      )
                                    }
                                  />
                                </Stack>
                              </Grid>
                            </>
                          );
                        case 3:
                          return (
                            <>
                              <Typography variant="caption">
                                This is an essay, which means you will grade the
                                response after it has been answered.
                              </Typography>
                            </>
                          );
                        case 4:
                          return (
                            <>
                              {" "}
                              <Typography variant="caption">
                                A 15MB file upload dropbox will be available for
                                students to submit their files.
                              </Typography>
                            </>
                          );
                        default:
                          return <>Unknown Type</>;
                      }
                    })()}
                  </Grid>
                </Grid>
              );
            })
          ) : (
            <></>
          )}

          <Grid item size={12}>
            <Button
              fullWidth
              size="large"
              variant="outlined"
              disableElevation
              onClick={() => {
                setQuestions([
                  ...questions,
                  {
                    id: Date.now(),
                    text: "",
                    type: 1,
                    choices: [],
                    points: 0,
                    caseSensitive: false,
                  }, // Add a new question with unique ID
                ]);
              }}
            >
              Add Question
            </Button>
          </Grid>
          <Grid item size={12}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              disableElevation
              onClick={handleCreateAssessment}
            >
              SUBMIT ASSESSMENT
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default AssessmentEditorPage;
