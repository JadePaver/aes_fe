import { Stack, Button, Typography, Divider, Box } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";

import { formatDateTime } from "../../../const/formatter";
import apiClient from "../../../axios/axiosInstance";

const ModulePanel = ({ getModules, modules }) => {
  const [selected, setSelected] = useState();
  const [files, setFiles] = useState([]);

  const handleLoadModule = async (module) => {
    try {
      setSelected(module);
      const response = await apiClient.post(
        `/modules/get_attached_files/${module?.id}`
      );

      // Assuming the response contains the files with base64 strings
      const modulesWithFileUrls = response.data.files.map((file) => {
        // Convert the base64 string to a Blob using atob() and Uint8Array
        if (file.fileBase64) {
          // Decode base64 string to binary data
          const binaryString = atob(file.fileBase64);

          // Convert the binary string to a Uint8Array
          const byteArray = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            byteArray[i] = binaryString.charCodeAt(i);
          }

          // Create a Blob from the byte array
          const fileBlob = new Blob([byteArray], {
            type: "application/pdf", // Set correct MIME type based on the file (e.g., application/pdf)
          });

          // Create a Blob URL from the Blob
          file.fileUrl = URL.createObjectURL(fileBlob);
        } else {
          console.warn("file.fileBase64 is missing:", file);
        }

        return file;
      });

      setFiles(modulesWithFileUrls);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    getModules();
  }, []);

  return (
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
            <>
              <Button
                key={module.id}
                variant="outlined"
                sx={{ mb: 2 }}
                onClick={() => handleLoadModule(module)}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: "100%", p: "1rem 0" }}
                >
                  <Typography fontWeight={600} color="black">
                    {module.name}
                  </Typography>
                  <Stack spacing={1} direction="row">
                    <Typography>Posted:</Typography>
                    <Typography color="black">
                      {formatDateTime(module.availableDate)}
                    </Typography>
                  </Stack>
                </Stack>
              </Button>
            </>
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
          <Stack spacing={1} direction="row" justifyContent="space-between">
            <Typography fontWeight={600}>Label: </Typography>
            <Typography color="black">
              {selected?.name || "Select an module"}
            </Typography>
          </Stack>
          <Stack spacing={1} direction="row" justifyContent="space-between">
            <Typography fontWeight={600}>Description: </Typography>
            <Typography color="black">
              {selected?.description || "N/A"}
            </Typography>
          </Stack>
          {files.map((file) => {
            // Extract file extension or MIME type
            const fileExtension = file.label.split(".").pop().toLowerCase();
            const isImage = [
              "jpg",
              "jpeg",
              "png",
              "gif",
              "bmp",
              "webp",
            ].includes(fileExtension);

            return isImage ? (
              <Box key={file.id} sx={{ mb: 2 }}>
                <img
                  src={file.fileUrl}
                  alt={file.label}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            ) : (
              <Box key={file.id} sx={{ mb: 2 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  component="a"
                  href={file.fileUrl}
                  download={file.label} // Set the download filename
                  sx={{ textTransform: "none" }}
                  startIcon={<FileDownloadOutlinedIcon />}
                  disableElevation
                >
                  {file.label}
                </Button>
              </Box>
            );
          })}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ModulePanel;
