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
import JoinSubButton from "./joinSubButton";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import { useEffect, useState, useContext } from "react";

import { useSubject } from "../../layouts/components/subjectProvider";
import SubjectOptions from "./components/subjectOptions";

const Dashboard = () => {
  const { subjectName, setSubjectName } = useSubject();
  const courses = [
    {
      label: "GEC-4",
      year: 2024,
      instructor: "Mr. Hideo Kinshomi",
      subCode: "ABC-123",
    },
    {
      label: "GEC-5",
      year: 2024,
      instructor: "Ms. Ayaka Yoshida",
      status: "124",
      subCode: "ASD-475",
    },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, index) => currentYear - index); // Create an array of years

  const [selectedYear, setSelectedYear] = useState(currentYear); // Set default to current year

  const handleChange = (event) => {
    setSelectedYear(event.target.value);
  };
  useEffect(() => {
    setSubjectName("");
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
          {courses.map((course, index) => (
            <Grid item size={{ md: 2, sm: 4, xs: 6 }} key={index}>
              <Card
                elevation={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: "0.5rem",
                  // border: "0.5px solid var(--primary)",
                  borderRadius: "0.5rem",
                  minWidth: "215px",
                  minHeight: "305px",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "100%",
                    backgroundImage: `url('/bookshelf.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "0.6rem",
                    mb: "0.5rem",
                  }}
                />

                <Typography variant="h6">{course.label}</Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>{course.year} </Typography>

                  {course.status && (
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        alignItems: "center",
                        textAlign: "center",
                        border: "1px solid var(--yel)",
                        borderRadius: "0.2rem",
                        p: "0 0.25rem",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: "var(--yel)", fontWeight: 600 }}
                      >
                        Waiting for Approval
                      </Typography>
                      <AccessTimeIcon sx={{ color: "var(--yel)" }} />
                    </Stack>
                  )}
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center", textAlign: "center" }}
                  >
                    <SchoolIcon />
                    <Typography variant="caption" sx={{ color: "black" }}>
                      {course.instructor}
                    </Typography>
                  </Stack>
                  <SubjectOptions subCode={course.subCode} />
                </Stack>
              </Card>
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
