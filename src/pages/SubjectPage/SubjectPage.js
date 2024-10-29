import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { useSubject } from "../../layouts/components/subjectProvider";
import { useEffect, useState } from "react";

import GradesProgress from "./components/gradesProgress";

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
  const { subjectName, setSubjectName } = useSubject();
  const [value, setValue] = useState(0);

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
            </Tabs>
            <TabPanel value={value} index={0}>
              {/* Content for Assessment view */}
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
                    <Button variant="outlined">
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ width: "100%",p:"1rem 0" }}
                      >
                        <Typography fontWeight={600}>Exam#1</Typography>
                        <Stack spacing={1} direction="row">
                        <Typography>Deadline:</Typography>
                        <Typography>01/01/2024</Typography>
                        </Stack>

                      </Stack>
                    </Button>
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
                      <Typography color="black">Assessment#1</Typography>
                    </Stack>
                    <Stack
                      spacing={1}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Typography fontWeight={600}>Description: </Typography>
                      <Typography color="black">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Inventore rerum, facere iusto quam sit laudantium ipsum
                        odit tempore libero perferendis expedita, dolorem
                        dolorum. Ducimus labore quia explicabo rem, minima
                        inventore voluptatem optio eum odio, rerum autem
                        officia? Ratione culpa harum, sit nobis exercitationem
                        vitae voluptas nemo placeat earum dolore possimus!
                      </Typography>
                    </Stack>
                    <Stack
                      spacing={1}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Typography fontWeight={600}>Done: </Typography>
                      <Checkbox checked sx={{ p: 0, cursor: "default" }} />
                    </Stack>
                    <Stack>
                      <Stack
                        spacing={1}
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Typography fontWeight={600}>Start Date: </Typography>
                        <Typography color="black">01/01/2024 7:45AM</Typography>
                      </Stack>
                      <Stack
                        spacing={1}
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Typography fontWeight={600}>End Date: </Typography>
                        <Typography color="black">
                          02/01/2024 11:59PM
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack
                      spacing={1}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Typography fontWeight={600}>Duration: </Typography>
                      <Typography color="black">60 minutes</Typography>
                    </Stack>
                    <Stack
                      spacing={1}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Typography fontWeight={600}>
                        Late Submission:{" "}
                      </Typography>
                      <Typography color="black">Allowed</Typography>
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
                        value={75}
                        size="5rem"
                      />
                      <Typography color="black">36/60</Typography>
                    </Stack>
                  </Stack>
                  <Button
                    variant="contained"
                    disableElevation
                    size="large"
                    sx={{ marginTop: "auto" }}
                  >
                    Start Assement
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              {/* Content for Modules view */}
              <Typography variant="h6">Modules Content</Typography>
            </TabPanel>
          </Box>
        </Grid>
      </Stack>
    </>
  );
};

export default SubjectPage;
