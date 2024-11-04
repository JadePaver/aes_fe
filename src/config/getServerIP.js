import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { Stack, LinearProgress } from "@mui/material";

import axios from "axios";
import { serverIP } from "../const/var";
import { apiClient, setApiClientBaseURL } from "../axios/axiosInstance";

const GetServerIP = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServerIP = async () => {
      try {
        const response = await axios.get("http://localhost:5001/getserver_ip");
        console.log("Fetched server IP:", response.data.localIP); // Log to confirm
        serverIP.value = response.data.localIP;
        setApiClientBaseURL(); // Ensure correct assignment
      } catch (err) {
        setError("Error fetching server IP");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServerIP();
  }, []);

  // const fetchData = async () => {
  //   if (!serverIP.value) {
  //     console.error("serverIP is not set");
  //     return;
  //   }

  //   try {
  //     const response = await apiClient.get("/test");
  //     console.log("Fetched data:", response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  if (loading)
    return (
      <>
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="primary" />
        </Stack>
      </>
    );
  if (error) return <div>{error}</div>;

  return (
    <>
      <Outlet />
    </>
  );
};

export default GetServerIP;
