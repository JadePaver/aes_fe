import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
  Button,
  Box,
  CircularProgress,
  AppBar,
  Tabs,
  Tab,
  IconButton,
  Snackbar
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import UploadFileIcon from "@mui/icons-material/UploadFile";


const exam = {
  exam_id: 99,
  questions: [
    {
      id: 23,
      label: "What is 1+1?",
      type: "multiple",
      correct_answer_id: 4,
      points: 6,
      choices: [
        { id: 1, label: "1" },
        { id: 2, label: "4" },
        { id: 3, label: "3" },
        { id: 4, label: "2" },
      ],
    },
    {
      id: 24,
      label: "What is 2+2?",
      type: "multiple",
      correct_answer_id: 2,
      points: 6,
      choices: [
        { id: 1, label: "1" },
        { id: 2, label: "4" },
        { id: 3, label: "3" },
        { id: 4, label: "2" },
      ],
    },
    {
      id: 25,
      label: "What is the next alphabet after b?",
      type: "fill_in",
      fill_in_ans: "c",
      points: 6,
    },
    {
      id: 26,
      label: "Write a 5-sentence paragraph about apples",
      type: "essay",
      points: 10,
    },
  ],
};

const ExamQuestion = ({ question, handleAnswer, questionNumber, examId }) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setAnswer(selectedValue);

    // Call the parent handler with question_id, exam_id, answer, type, and choice_id if applicable
    handleAnswer({
      question_id: question.id,
      answer: selectedValue,
      type: question.type,
      points: question.points,
      choice_id: question.type === "multiple" ? parseInt(selectedValue) : null,
    });
  };

  return (
    <Box mb={2}>
      <Typography variant="h6">
        {questionNumber}. {question.label}
      </Typography>
      {question.type === "multiple" && (
        <RadioGroup value={answer} onChange={handleChange}>
          {question.choices.map((choice) => (
            <FormControlLabel
              key={choice.id}
              value={choice.id.toString()}
              control={<Radio />}
              label={choice.label}
            />
          ))}
        </RadioGroup>
      )}
      {question.type === "fill_in" && (
        <TextField
          variant="outlined"
          value={answer}
          onChange={handleChange}
          placeholder="Your answer"
          fullWidth
        />
      )}
      {question.type === "essay" && (
        <TextField
          variant="outlined"
          value={answer}
          onChange={handleChange}
          placeholder="Write your essay here"
          multiline
          rows={5}
          fullWidth
        />
      )}
    </Box>
  );
};

function App() {
  // const value =75;
  // const red = Math.min(255, (100 - value) * 2.55);  // Decreases from 255 to 0 as value goes from 0 to 100
  // const green = Math.min(255, value * 2.55);

  // const progressColor = `rgb(${red}, ${green}, 0)`;

  const [answers, setAnswers] = useState([]);

  // Handle storing the answer for each question
  const handleAnswer = (answer) => {
    setAnswers((prevAnswers) => {
      const existingIndex = prevAnswers.findIndex(
        (a) => a.question_id === answer.question_id
      );
      if (existingIndex !== -1) {
        // Update existing answer
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingIndex] = answer;
        return updatedAnswers;
      } else {
        // Add new answer
        return [...prevAnswers, answer];
      }
    });
  };
  // Submit handler
  const handleSubmit = () => {
    const data = {
      exam_id: exam.exam_id, // Get exam_id from the exam object
      result: answers.map((answer) => ({
        question_id: answer.question_id,
        answer: answer.answer,
        type: answer.type,
        points: answer.points,
        choice_id: answer.choice_id,
      })),
    };
    console.log("User Answers:", data);
    // Here, you can process answers and calculate the score
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const textToCopy = "This is the example text to be copied!";

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        // Show snackbar confirmation
        setOpenSnackbar(true);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };




  const [fileList, setFileList] = useState([]);

  // const handleFileChange = (event) => {
  //   const selectedFiles = event.target.files; // FileList object
  //   const filesArray = Array.from(selectedFiles); // Convert FileList to Array

  //   setFileList(filesArray);
  //   console.log(filesArray); // Log the array of file objects
  // };


  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file change
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log("Selected file:", event.target.files[0]);
  };

  // Trigger file input when clicking the button
  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <>
    <Box display="flex" alignItems="center">
      {/* Hidden file input */}
      <input
        id="fileInput"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Icon Button styled to 32x32px */}
      <IconButton
        onClick={handleButtonClick}
        sx={{
          width: "32px",
          height: "32px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <UploadFileIcon sx={{ fontSize: 32 }} />
      </IconButton>

      {/* Display selected file name (optional) */}
      <TextField
        value={selectedFile ? selectedFile.name : ""}
        placeholder="No file chosen"
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
        size="small"
        sx={{ ml: 2 }}
      />
    </Box>
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <ul>
        {fileList.map((file, index) => (
          <li key={index}>
            {file.name} - {file.size} bytes
          </li>
        ))}
      </ul>
    </div>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Dynamic Exam
        </Typography>
        {exam.questions.map((question, index) => (
          <ExamQuestion
            key={question.id}
            question={question}
            examId={exam.exam_id}
            questionNumber={index + 1} // Pass question number
            handleAnswer={handleAnswer}
          />
        ))}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      <Box>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab value="one" label="Tab One" />
            <Tab value="two" label="Tab Two" />
            <Tab value="three" label="Tab Three" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index="one">Content for Tab One</TabPanel>
        <TabPanel value={value} index="two">Content for Tab Two</TabPanel>
        <TabPanel value={value} index="three">Content for Tab Three</TabPanel>
      </Box>
      <div>
      <Typography variant="body1">
        {textToCopy}
      </Typography>
      <IconButton onClick={handleCopy}>
        <ContentCopyIcon />
      </IconButton>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Text copied to clipboard!"
      />
    </div>
    </>
  );
}

export default App;
