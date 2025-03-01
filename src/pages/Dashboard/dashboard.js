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
import { Skeleton, FormControl } from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import apiClient from "../../axios/axiosInstance";
import { useSubject } from "../../layouts/components/subjectProvider";
import { useSnackbar } from "../../layouts/root_layout";
import { useUser } from "../../layouts/root_layout";
import SubjectCard from "./components/subjectCard";
import JoinSubButton from "./components/joinSubButton";
import SkeletonSubjectCard from "./components/Skeletons/SkeletonSubjectCard";

const Dashboard = () => {
  const { showSnackbar } = useSnackbar();
  const { setSubjectName } = useSubject();
  const navigate = useNavigate();

  const [isloading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, index) => currentYear - index); // Create an array of years

  const [selectedYear, setSelectedYear] = useState(currentYear); // Set default to current year

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter subjects by name
    const filtered = subjects.filter(
      (subject) =>
        subject.name.toLowerCase().includes(query) &&
        subject.year.includes(selectedYear)
    );
    setFilteredSubjects(filtered);
  };

  const handleChangeYear = (event) => {
    const year = event.target.value;
    setSelectedYear(year);

    // Filter subjects by year and search query
    const filtered = subjects.filter(
      (subject) =>
        (year ? subject.year.includes(year) : true) &&
        subject.name.toLowerCase().includes(searchQuery)
    );
    setFilteredSubjects(filtered);
  };

  const getUserSubjects = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.post(`/subjects/get_assigned`);

      console.log("subjects:", response.data);

      setSubjects(response.data);
      setFilteredSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      showSnackbar({
        message: error.response?.data?.error,
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/aes/login");
      return;
    }

    setSubjectName("");
    getUserSubjects();
  }, []);

  return (
    <>
      <Stack
        spacing={1}
        sx={{
          padding: "0.1rem",
          width: "100%",
          height: "100%",
          background: "white",
          borderRadius: "0.2rem",
          overflow: "hidden",
          p: "1rem",
          overflowY: "auto", // Enable vertical scrolling
          maxHeight: "calc(100vh - 2rem)",
        }}
      >
        <Grid container columnSpacing={2} rowSpacing={4}>
          <Grid item container size={{ md: 12 }}>
            <Grid
              item
              size={{ md: "auto", xs: 6 }}
              sx={{ order: { xs: 2, md: 1 } }}
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
                  onChange={handleChangeYear}
                  label="Year"
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              offset={{ md: "auto" }}
              size={{ md: "auto", xs: "auto" }}
              sx={{
                order: { xs: 3, md: 2 },
                marginLeft: "auto",
              }}
            >
              <JoinSubButton onRefresh={getUserSubjects} />
            </Grid>
            <Grid
              item
              size={{ md: "auto", xs: 12 }}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                order: { xs: 1, md: 3 },
              }}
            >
              <TextField
                size="small"
                id="outlined-basic"
                label="Search"
                variant="outlined"
                placeholder="Search something..."
                fullWidth
                onChange={handleSearchChange}
                slotProps={{
                  inputLabel: {
                    shrink: true, // This replaces InputLabelProps
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid item container columnSpacing={6} size={{md:12}}>
          {!isloading ? ( // Temporary truthy condition for loading simulation
            filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject, index) => (
                <Grid item size={{ md: 2, sm: 4, xs: 12 }} key={index}>
                  <SubjectCard subject={subject} />
                </Grid>
              ))
            ) : (
              <Grid size={{ md: 12 }} sx={{ alignContent: "center" }}>
                <Typography variant="h5" align="center">
                  No subject Found.
                </Typography>
              </Grid>
            )
          ) : (
            <>
              <Grid item size={{ md: 2, sm: 4, xs: 6 }}>
                <SkeletonSubjectCard />
              </Grid>
              <Grid item size={{ md: 2, sm: 4, xs: 6 }}>
                <SkeletonSubjectCard />
              </Grid>
              <Grid item size={{ md: 2, sm: 4, xs: 6 }}>
                <SkeletonSubjectCard />
              </Grid>
            </>
          )}
          </Grid>

          {/* <Grid
            item
            size={12}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center", // Aligns children to the end
            }}
          >
            <Pagination count={1} color="primary" shape="rounded" />
          </Grid> */}
        </Grid>
      </Stack>
    </>
  );
};
export default Dashboard;
