import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AccessAlarmRoundedIcon from "@mui/icons-material/AccessAlarmRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

import { useSubject } from "../../layouts/components/subjectProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GradesProgress from "./components/gradesProgress";
import MemberListTable from "./components/memberListTable";
import ModuleDialog from "./components/moduleDialog";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ height: "100%" }}
    >
      {value === index && (
        <Box sx={{ p: "1rem 0", height: "100%" }}>{children}</Box>
      )}
    </div>
  );
}

const data = [
  {
    assessment_id: 1,
    label: "Exam#1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ex repellendus aperiam natus accusantium hic.",
    isDone: 0,
    StartDate: "01/01/2024 7:45AM",
    EndDate: "02/01/2024 11:59PM",
    duration: 60,
    allowLate: 1,
    score: 30,
    totalScore: 100,
  },
  {
    assessment_id: 2,
    label: "Quiz#1",
    description:
      "Quisquam maiores veniam sit ab magnam, culpa atque unde aliquam.",
    isDone: 1,
    StartDate: "01/10/2024 8:00AM",
    EndDate: "01/10/2024 10:00AM",
    duration: 45,
    allowLate: 0,
    score: 20,
    totalScore: 30,
  },
];

const modules = [
  {
    module_id: 1,
    label: "MODULE#1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ex repellendus aperiam natus accusantium hic.",
    attachedFiles: [
      { label: "File#2.pdf" },
      { label: "File#2214214214.pdf" },
      { label: "File#3214214241214124214.pdf" },
    ],
    postedDate: "02/15/2024 1:00PM",
  },
];

const SubjectPage = () => {
  const navigate = useNavigate();
  const { subjectName, setSubjectName } = useSubject();
  const [currentPreview, setCurrentPreview] = useState({});
  const [value, setValue] = useState(0);

  const handleChangePreview = (data) => {
    setCurrentPreview(data);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const subject = { id: 1, label: "GEC - 4" };

  useEffect(() => {
    setSubjectName(subject.label);
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
          container
          rowSpacing={3}
          columnSpacing={5.95}
          sx={{
            width: "100%",
            height: "100%",
            background: "white",
            borderRadius: "0.2rem",
            p: "1rem 0",
            // overflowY: "auto",
            // maxHeight: "calc(100vh - 2rem)",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Assessment" />
              <Tab label="Modules" />
              <Tab
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                label={
                  <Stack
                    spacing={1}
                    direction="row"
                    textAlign="center"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <GroupsRoundedIcon />
                    <Typography variant="body">MEMBERS</Typography>
                  </Stack>
                }
              />

              <Stack
                direction="row"
                spacing={1}
                sx={{ m: "0 1rem 0 auto", alignItems: "center" }}
              >
                <Button
                  variant="outlined"
                  startIcon={<AddCircleOutlineRoundedIcon />}
                  onClick={() => navigate(`/aes/assessment_editor/${2}`)}
                >
                  NEW ASSESSMENT
                </Button>
                <ModuleDialog />
                <Button variant="contained" disableElevation>
                  <GroupsRoundedIcon />
                </Button>
              </Stack>
            </Tabs>
            <TabPanel value={value} index={0}>
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
                    {data.map((assessment) => (
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
                            color: assessment.isDone
                              ? "var(--accent)"
                              : "black",
                          }} // Set text color based on isDone
                        >
                          <Typography
                            fontWeight={600}
                            color={
                              assessment.isDone ? "var(--accent)" : "black"
                            }
                          >
                            {" "}
                            {/* Change color conditionally */}
                            {assessment.label}
                          </Typography>
                          <Stack spacing={1} direction="row">
                            <Typography
                              color={
                                assessment.isDone ? "var(--accent)" : "black"
                              }
                            >
                              Deadline:
                            </Typography>{" "}
                            {/* Change color conditionally */}
                            <Typography
                              color={
                                assessment.isDone ? "var(--accent)" : "black"
                              }
                            >
                              {assessment.EndDate}
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
                  }}
                >
                  <Stack spacing={2}>
                    <Stack
                      spacing={1}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Typography fontWeight={600}>Label: </Typography>
                      <Typography color="black">
                        {currentPreview.label || "Select an assessment"}
                      </Typography>
                    </Stack>
                    <Stack
                      spacing={1}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Typography fontWeight={600}>Description: </Typography>
                      <Typography color="black">
                        {currentPreview.description || "N/A"}
                      </Typography>
                    </Stack>
                    <Stack
                      spacing={1}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Typography fontWeight={600}>Done: </Typography>
                      <Checkbox
                        checked={currentPreview.isDone === 1}
                        sx={{ p: 0, cursor: "default" }}
                      />
                    </Stack>
                    <Stack>
                      <Stack
                        spacing={1}
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Typography fontWeight={600}>Start Date: </Typography>
                        <Typography color="black">
                          {currentPreview.StartDate || "N/A"}
                        </Typography>
                      </Stack>
                      <Stack
                        spacing={1}
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Typography fontWeight={600}>End Date: </Typography>
                        <Typography color="black">
                          {currentPreview.EndDate || "N/A"}
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

                    <Stack
                      spacing={1}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Typography fontWeight={600}>
                        Late Submission:{" "}
                      </Typography>
                      <Typography color="black">
                        {currentPreview.allowLate ? "Allowed" : "Not Allowed"}
                      </Typography>
                    </Stack>
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
                          ((currentPreview.score || 0) /
                            (currentPreview.totalScore || 1)) *
                          100
                        }
                        size="5rem"
                      />
                      <Typography color="black">
                        {currentPreview.score || "0"}/
                        {currentPreview.totalScore || "0"}
                      </Typography>
                    </Stack>
                  </Stack>
                  {currentPreview.isDone === 1 ? (
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
                    >
                      START ASSESSMENT
                    </Button>
                  )}
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              {/* Content for Modules view */}
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
                    {modules.map((module) => (
                      <Button
                        key={module.module_id}
                        variant="outlined"
                        sx={{ mb: 2 }}
                        onClick={() => handleChangePreview(module)}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          sx={{ width: "100%", p: "1rem 0" }}
                        >
                          <Typography fontWeight={600} color="black">
                            {module.label}
                          </Typography>
                          <Stack spacing={1} direction="row">
                            <Typography>Posted:</Typography>
                            <Typography color="black">
                              {module.postedDate}
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
                  }}
                >
                  <Stack spacing={2}>
                    <Stack
                      spacing={1}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Typography fontWeight={600}>Label: </Typography>
                      <Typography color="black">
                        {currentPreview.label || "Select an module"}
                      </Typography>
                    </Stack>
                    <Stack
                      spacing={1}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Typography fontWeight={600}>Description: </Typography>
                      <Typography color="black">
                        {currentPreview.description || "N/A"}
                      </Typography>
                    </Stack>
                    <Stack spacing={1}>
                      <Typography fontWeight={600}>Attached Files: </Typography>
                      {currentPreview.attachedFiles &&
                      currentPreview.attachedFiles.length > 0 ? (
                        currentPreview.attachedFiles.map((file, index) => (
                          <Button
                            key={index}
                            variant="outlined"
                            startIcon={<FileDownloadOutlinedIcon />}
                            sx={{ width: "fit-content", p: "0.35rem 1rem" }}
                          >
                            {file.label}
                          </Button>
                        ))
                      ) : (
                        <Typography color="grey">No files attached.</Typography>
                      )}
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Stack sx={{ p: "0rem 1rem 2rem 1rem", height: "100%" }}>
                <Box sx={{ height: "100%", width: "100%" }}>
                  <Paper elevation={1} sx={{ height: "100%" }}>
                    <MemberListTable />
                  </Paper>
                </Box>
              </Stack>
            </TabPanel>
          </Box>
        </Grid>
      </Stack>
    </>
  );
};

export default SubjectPage;
