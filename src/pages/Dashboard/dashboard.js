import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import JoinSubButton from "./components/joinSubButton";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";

import { useEffect, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

import apiClient from "../../axios/axiosInstance";
import { useSubject } from "../../layouts/components/subjectProvider";
import { useSnackbar } from "../../layouts/root_layout";
import SubjectCard from "./components/subjectCard";

const Dashboard = () => {
  const { showSnackbar } = useSnackbar();
  const { subjectName, setSubjectName } = useSubject();
  const [subjects, setSubjects] = useState([]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, index) => currentYear - index); // Create an array of years

  const [selectedYear, setSelectedYear] = useState(currentYear); // Set default to current year

  const handleChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const token = localStorage.getItem("token");

  const decodedUser = jwtDecode(token);

  const getTeacherSubjects = async () => {
    try {
      const response = await apiClient.post(
        `/subjects/get_assigned/${decodedUser.id}`
      );

      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      showSnackbar({
        message: error.response?.data?.message,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    setSubjectName("");
    getTeacherSubjects();
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
          columnSpacing={5.5}
          sx={{
            width: "100%",
            height: "100%",
            background: "white",
            borderRadius: "0.2rem",
            p: "1rem",
            overflowY: "auto", // Enable vertical scrolling
            maxHeight: "calc(100vh - 2rem)",
          }}
        >
          <Grid item size={12}>
            <Stack
              direction="row"
              sx={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControl
                size="small"
                variant="outlined"
                sx={{ minWidth: 120 }}
              >
                <InputLabel id="year-select-label">Year</InputLabel>
                <Select
                  labelId="year-select-label"
                  id="year-select"
                  value={selectedYear}
                  onChange={handleChange}
                  label="Year"
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Stack direction="row" spacing={1}>
                <JoinSubButton />
                <TextField
                  size="small"
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  placeholder="Search something..."
                  slotProps={{
                    inputLabel: {
                      shrink: true, // This replaces InputLabelProps
                    },
                  }}
                />
              </Stack>
            </Stack>
          </Grid>
          {subjects.map((subject, index) => (
            <Grid item size={{ md: 2, sm: 4, xs: 6 }} key={index}>
              <SubjectCard subject={subject} />
            </Grid>
          ))}
          <Grid
            item
            size={12}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center", // Aligns children to the end
            }}
          >
            <Pagination count={10} color="primary" shape="rounded" />
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};
export default Dashboard;
