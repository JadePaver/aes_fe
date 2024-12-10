import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";

import { useSubject } from "../../layouts/components/subjectProvider";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { useSnackbar } from "../../layouts/root_layout";
import MembersPanel from "./components/membersPanel";
import ModuleDialog from "./components/moduleDialog";
import ModulePanel from "./components/modulePanel";
import AssessmentsPanel from "./components/assessmentsPanel";

import apiClient from "../../axios/axiosInstance";

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

const SubjectPage = () => {
  const { showSnackbar } = useSnackbar();
  const location = useLocation();
  const navigate = useNavigate();

  const [modules, setModules] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const { subject_id } = useParams();
  const { subjectName, setSubjectName } = useSubject();
  const [value, setValue] = useState(0);
  const [subjectDetails, setSubjectDetails] = useState();

  const handleChangePanel = (event, newValue) => {
    if (newValue !== undefined) {
      setValue(newValue); // Only update state if newValue is not undefined
    }
  };



  const getModules = async () => {
    try {
      const response = await apiClient.post(
        `/modules/by_subject/${subject_id}`
      );
      setModules(response.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
      showSnackbar({
        message: error.response?.data?.message,
        severity: "error",
      });
    }
  };

  const getAssessments = async () => {
    try {
      const response = await apiClient.post(
        `/assessments/get_all_assigned/${subject_id}`
      );
      setAssessments(response.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
      showSnackbar({
        message: error.response?.data?.message,
        severity: "error",
      });
    }
  };

  const getSubjectDetails = async () => {
    try {
      const response = await apiClient.post(`/subjects/details/${subject_id}`);
      setSubjectDetails(response.data);
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
    getModules();
    getAssessments();
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
            p: "0",
            // overflowY: "auto",
            // maxHeight: "calc(100vh - 2rem)",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Tabs value={value} onChange={handleChangePanel}>
              <Tab
                icon={<ChecklistRoundedIcon />}
                label="Assessment"
                value={0}
              />
              <Tab icon={<MenuBookRoundedIcon />} label="Modules" value={1} />
              <Tab icon={<GroupsRoundedIcon />} label="Members" value={2} />

              <Stack
                direction="row"
                spacing={1}
                sx={{ m: "0 1rem 0 auto", alignItems: "center" }}
              >
                <Button
                  variant="outlined"
                  startIcon={<AddCircleOutlineRoundedIcon />}
                  onClick={() => navigate(`assessment_create`)}
                >
                  NEW ASSESSMENT
                </Button>
                <ModuleDialog subjectID={subject_id} refresh={getModules} />
              </Stack>
            </Tabs>
            <TabPanel value={value} index={0}>
              <AssessmentsPanel
                subjectID={subject_id}
                assessments={assessments}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ModulePanel
                subjectID={subject_id}
                getModules={getModules}
                modules={modules}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <MembersPanel subjectId={subject_id} />
            </TabPanel>
          </Box>
        </Grid>
      </Stack>
    </>
  );
};
export default SubjectPage;
