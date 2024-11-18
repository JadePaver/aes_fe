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
  Divider,
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
        rowSpacing={2}
        columnSpacing={0}
        sx={{
          width: "100%",
          height: "100%",
          p: "1rem",
          background: "white",
          borderRadius: "0.2rem",
          overflowY: "auto",
          maxHeight: "calc(100vh - 2rem)",
        }}
      >
        <Grid
          container
          size={12}
          sx={{
            height: "58%",
          }}
        >
          <Grid size={5.75} sx={{ height: "100%" }}>
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
              <Typography variant="h4" fontWeight={700}>
                THIS YEAR
              </Typography>
            </Grid>
            <Grid
              container
              size={12}
              sx={{
                m: 0,
                maxHeight: "85%",
                minHeight: "85%",
                justifyContent: "space-between",
              }}
            >
              <Grid
                item
                size={5.75}
                sx={{
                  minHeight: "100%",
                  maxWidth: 280,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    minWidth: "100%",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    minHeight: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "0.3rem solid green",
                    borderRadius: "0.4rem",
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
                      minHeight: "70%",
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <SchoolIcon
                        sx={{ fontSize: 50, mr: 1, color: "green" }}
                      />
                      <Typography variant="h4" sx={{ color: "green" }}>
                        155,000
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      bgcolor: "green", // Shortened syntax for backgroundColor
                      py: 1, // Vertical padding
                      color: "white",
                      minHeight: "30%",
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight={550}
                      sx={{ color: "white" }}
                    >
                      New Students
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
              <Grid
                item
                size={5.75}
                sx={{
                  minHeight: "100%",
                  maxWidth: 280,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    minWidth: "100%",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    minHeight: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "0.3rem solid green",
                    borderRadius: "0.4rem",
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
                      minHeight: "70%",
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <SchoolIcon
                        sx={{ fontSize: 50, mr: 1, color: "green" }}
                      />
                      <Typography variant="h4" sx={{ color: "green" }}>
                        53
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      bgcolor: "green", // Shortened syntax for backgroundColor
                      py: 1, // Vertical padding
                      color: "white",
                      minHeight: "30%",
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight={550}
                      sx={{ color: "white" }}
                    >
                      Subject Created
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item size={{ md: 0.5 }}>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                m: "0 auto",
                maxWidth: "1px",
                minHeight: "100%",
                borderRadius: "0.4rem",
                border: "5px solid",
              }}
            />
          </Grid>
          <Grid size={5.75} sx={{ height: "100%" }}>
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
              <Typography variant="h4" fontWeight={700}>
                OVERALL
              </Typography>
            </Grid>
            <Grid
              container
              size={12}
              sx={{
                m: 0,
                maxHeight: "85%",
                minHeight: "85%",
                justifyContent: "space-between",
              }}
            >
              <Grid
                item
                size={5.75}
                sx={{
                  minHeight: "100%",
                  maxWidth: 280,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    minWidth: "100%",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    minHeight: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "0.3rem solid green",
                    borderRadius: "0.4rem",
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
                      minHeight: "70%",
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <SchoolIcon
                        sx={{ fontSize: 50, mr: 1, color: "green" }}
                      />
                      <Typography variant="h4" sx={{ color: "green" }}>
                        155,000
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      bgcolor: "green", // Shortened syntax for backgroundColor
                      py: 1, // Vertical padding
                      color: "white",
                      minHeight: "30%",
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight={550}
                      sx={{ color: "white" }}
                    >
                      New Students
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
              <Grid
                item
                size={5.75}
                sx={{
                  minHeight: "100%",
                  maxWidth: 280,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    minWidth: "100%",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    minHeight: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "0.3rem solid green",
                    borderRadius: "0.4rem",
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
                      minHeight: "70%",
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <SchoolIcon
                        sx={{ fontSize: 50, mr: 1, color: "green" }}
                      />
                      <Typography variant="h4" sx={{ color: "green" }}>
                        53
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      bgcolor: "green", // Shortened syntax for backgroundColor
                      py: 1, // Vertical padding
                      color: "white",
                      minHeight: "30%",
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight={550}
                      sx={{ color: "white" }}
                    >
                      Subject Created
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          size={12}
          sx={{
            height: "40%",
            alignContent: "center",
          }}
        >
          <Grid item xs={12} sx={{ height: "100%", width: "100%" }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ height: "100%", width: "100%" }}
            >
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
                  { data: [4, 3, 5, 2, 1, 4] },
                  { data: [1, 6, 3, 5, 2, 3] },
                  { data: [2, 5, 6, 1, 4, 2] },
                  { data: [2, 5, 6, 3, 5, 1] },
                ]}
                sx={{
                  width: "100%",
                  height: "100%",
                  border: "2px solid",
                  borderRadius: "0.4rem",
                }}
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
