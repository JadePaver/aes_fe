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
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const AssessmentEditorPage = () => {
  const [newAssessment, setNewAssessment] = useState({
    label: "",
    Description: "",
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
      file: "",
      choices: [
        { id: 1, label: "Apples", isCorrect: 0 },
        { id: 2, label: "Oranges", isCorrect: 0 },
        { id: 3, label: "Banana", isCorrect: 0 },
      ],
    },
  ]);

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setQuestions((prevQuestions) =>
        prevQuestions.map((question, i) =>
          i === index ? { ...question, file: fileUrl } : question
        )
      );
    }
  };

  useEffect(() => {
    console.log("q:", questions);
  }, [questions]);
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
              name="label"
              label="Assessment Label"
              placeholder="Write your Assessment name here"
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid item size={12}>
            <TextField
              variant="outlined"
              name="description"
              label="Description"
              multiline
              rows={10}
              fullWidth
              placeholder="Your description..."
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid item size={5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date"
                value={newAssessment.startDate}
                onChange={(newValue) =>
                  setNewAssessment({ ...newAssessment, startDate: newValue })
                }
                renderInput={(params) => <TextField {...params} fullWidth />}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item size={5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Date"
                value={newAssessment.endDate}
                onChange={(newValue) =>
                  setNewAssessment({ ...newAssessment, endDate: newValue })
                }
                renderInput={(params) => <TextField {...params} fullWidth />}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item size={2}>
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
            questions.map((question, index) => (
              <Grid
                key={index} // Set a unique key
                container
                spacing={2}
                size={12} // Adjust spacing directly on the container
                sx={{
                  border: "1px solid var(--primary)",
                  borderRadius: "1rem",
                  p: "1rem",
                }}
              >
                <Grid item size={12}>
                  <Box>
                    {question.file && (
                      <img
                        src={question.file}
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
                    onChange={(event) => {
                      const newPoints = Number(event.target.value);
                      setQuestions((prevQuestions) =>
                        prevQuestions.map((q, i) =>
                          i === index ? { ...q, points: newPoints } : q
                        )
                      );
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
                    onChange={(event) => {
                      setQuestions((prevQuestions) =>
                        prevQuestions.map((q, i) =>
                          i === index ? { ...q, label: event.target.value } : q
                        )
                      );
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
                                        control={<Radio sx={{ m: "auto 0" }} />}
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
                                                setQuestions((prevQuestions) =>
                                                  prevQuestions.map((q) =>
                                                    q === question
                                                      ? {
                                                          ...q,
                                                          choices:
                                                            q.choices.map((c) =>
                                                              c.id === choice.id
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
                                                setQuestions((prevQuestions) =>
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
                                        <Typography>Add new choice</Typography>
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
            ))
          ) : (
            <></>
          )}

          <Grid item size={12}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              disableElevation
              onClick={() => {
                setQuestions([
                  ...questions,
                  {
                    id: Date.now(),
                    text: "",
                    type: 1,
                    choices: [],
                  }, // Add a new question with unique ID
                ]);
              }}
            >
              Add Question
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default AssessmentEditorPage;
