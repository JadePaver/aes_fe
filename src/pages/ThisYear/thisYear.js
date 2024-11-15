import * as React from "react";
import Grid from "@mui/material/Grid2";
import MoveUpRoundedIcon from "@mui/icons-material/MoveUpRounded";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import {
  Button,
  Stack,
  Tooltip,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import apiClient from "../../axios/axiosInstance";
const ThisYear = () => {
  const [sex, setSex] = useState([]);
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    const getSex = async () => {
      const response = await apiClient.get("/users/getAlls");
      setSex(response.data);
    };
    const getRoles = async () => {
      const response = await apiClient.get("/roles/filtered");
      setRoles(response.data);
    };
    getRoles();
    getSex();
  }, []);

  useEffect(() => {
    console.log("Sex:", sex);
    console.log("Roles:", roles);
  }, [sex, roles]);
  return (
    <Stack
      spacing={0}
      sx={{
        // padding: "0.1rem",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Grid
        container
        rowSpacing={0}
        columnSpacing={0}
        sx={{
          width: "100%",
          height: "100%",
          background: "white",
          borderRadius: "0.2rem",
          // p: "1rem 0",
          overflowY: "auto",
          maxHeight: "calc(100vh - 2rem)",
        }}
      >
        <Grid
          container
          size={12}
          sx={{
            p: "0.5rem",
            m: 0,
            height: "50%",
            alignContent: "center",
          }}
        >
          <Grid size={6} sx={{ height: "100%" }}>
            <Grid
              size={12}
              sx={{
                m: 0,
                height: "15%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignContent="center"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  borderBottom: "2px solid",
                  width: "30%",
                  textAlign: "center",
                }}
              >
                THIS YEAR
              </Box>
            </Grid>
            <Grid
              size={12}
              sx={{
                m: 0,
                height: "85%",
                alignContent: "center",
              }}
            >
              <Grid
                container
                size={12}
                sx={{
                  m: 0,
                  height: "85%",
                  alignContent: "center",
                }}
              >
                <Grid size={6}>
                  <Box display="flex" justifyContent="center">
                    <Card
                      sx={{
                        maxWidth: "100%",
                        m: "0.5rem",
                        maxHeight: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "0.2rem solid",
                        borderColor: "green",
                        // p:
                      }}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          textAlign: "center",
                          pt: 5,
                          pb: 5,
                        }}
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          sx={{ fontSize: 40, color: "green" }}
                        >
                          <SchoolIcon sx={{ fontSize: 50, mr: 1 }} />
                          1000
                        </Box>
                      </CardContent>
                      <CardActions
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                          bgcolor: "green", // Shortened syntax for backgroundColor
                          py: 1, // Vertical padding
                          px: 2, // Horizontal padding
                          mt: "auto", // Pushes CardActions to the bottom of the card if needed
                          fontSize: 25,
                          color: "white",
                        }}
                      >
                        New Students
                      </CardActions>
                    </Card>
                  </Box>
                </Grid>
                <Grid size={6}>
                  <Box display="flex" justifyContent="center">
                    <Card
                      sx={{
                        maxWidth: "100%",
                        m: "0.5rem",
                        maxHeight: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "0.2rem solid",
                        borderColor: "green",
                        // p:
                      }}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          textAlign: "center",
                          pt: 5,
                          pb: 5,
                        }}
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          sx={{ fontSize: 40, color: "green" }}
                        >
                          <MenuBookIcon sx={{ fontSize: 50, mr: 1 }} />
                          1000
                        </Box>
                      </CardContent>
                      <CardActions
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                          bgcolor: "green", // Shortened syntax for backgroundColor
                          py: 1, // Vertical padding
                          px: 2, // Horizontal padding
                          mt: "auto", // Pushes CardActions to the bottom of the card if needed
                          fontSize: 23.5,
                          color: "white",
                        }}
                      >
                        Subjects Created
                      </CardActions>
                    </Card>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={6} sx={{ height: "100%" }}>
            <Grid
              size={12}
              sx={{
                m: 0,
                height: "15%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignContent="center"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  borderBottom: "2px solid",
                  width: "27%",
                  textAlign: "center",
                }}
              >
                OVERALL
              </Box>
            </Grid>
            <Grid
              // container
              size={12}
              sx={{
                // p: "0.5rem",
                m: 0,
                height: "85%",
                alignContent: "center",
              }}
            >
              <Grid
                container
                size={12}
                sx={{
                  // p: "0.5rem",
                  m: 0,
                  height: "85%",
                  alignContent: "center",
                }}
              >
                <Grid size={6}>
                  <Box display="flex" justifyContent="center">
                    <Card
                      sx={{
                        maxWidth: "100%",
                        m: "0.5rem",
                        maxHeight: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "0.2rem solid",
                        borderColor: "green",
                        // p:
                      }}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          textAlign: "center",
                          pt: 5,
                          pb: 5,
                        }}
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          sx={{ fontSize: 40, color: "green" }}
                        >
                          <SchoolIcon sx={{ fontSize: 50, mr: 1 }} />
                          1000
                        </Box>
                      </CardContent>
                      <CardActions
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                          bgcolor: "green", // Shortened syntax for backgroundColor
                          py: 1, // Vertical padding
                          px: 2, // Horizontal padding
                          mt: "auto", // Pushes CardActions to the bottom of the card if needed
                          fontSize: 25,
                          color: "white",
                        }}
                      >
                        Students
                      </CardActions>
                    </Card>
                  </Box>
                </Grid>
                <Grid size={6}>
                  <Box display="flex" justifyContent="center">
                    <Card
                      sx={{
                        maxWidth: "100%",
                        m: "0.5rem",
                        maxHeight: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "0.2rem solid",
                        borderColor: "green",
                        // p:
                      }}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          textAlign: "center",
                          pt: 5,
                          pb: 5,
                        }}
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          sx={{ fontSize: 40, color: "green" }}
                        >
                          <MenuBookIcon sx={{ fontSize: 50, mr: 1 }} />
                          1000
                        </Box>
                      </CardContent>
                      <CardActions
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                          bgcolor: "green", // Shortened syntax for backgroundColor
                          py: 1, // Vertical padding
                          px: 2, // Horizontal padding
                          mt: "auto", // Pushes CardActions to the bottom of the card if needed
                          fontSize: 23.5,
                          color: "white",
                        }}
                      >
                        Subjects Created
                      </CardActions>
                    </Card>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          size={12}
          sx={{
            p: "0.5rem",
            m: 0,
            height: "50%",
            alignContent: "center",
          }}
        >
          <Grid size={12}>
            <Box display="flex" justifyContent="center">
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: [
                      "group A",
                      "group B",
                      "group C",
                      "group D",
                      "group E",
                      "group F",
                    ],
                  },
                ]}
                series={[
                  { data: [4, 3, 5, 2, 1, 4] }, // Updated to include values for all six groups
                  { data: [1, 6, 3, 5, 2, 3] },
                  { data: [2, 5, 6, 1, 4, 2] },
                  { data: [2, 5, 6, 3, 5, 1] },
                ]}
                width={1000}
                height={300}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Modal component */}
      </Grid>
    </Stack>
  );
};
export default ThisYear;
