import { Stack, Button, Typography, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";

import { formatDateTime } from "../../../const/formatter";
import apiClient from "../../../axios/axiosInstance";
import { useSnackbar } from "../../../layouts/root_layout";

const ModulePanel = ({ subjectID }) => {
  const { showSnackbar } = useSnackbar();
  const [selected, setSelected] = useState();
  const [modules, setModules] = useState([]);
  const [files, setFiles] = useState([]);

  const getModules = async () => {
    try {
      console.log("SUBJECTID:", subjectID);
      const response = await apiClient.post(`/modules/by_subject/${subjectID}`);

      console.log("modules:", response.data);
      setModules(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      showSnackbar({
        message: error.response?.data?.message,
        severity: "error",
      });
    }
  };

  const handleLoadModule = async (module) => {
    try {
      console.log("SUBJECTID:", module);
      const response = await apiClient.post(
        `/modules/get_attached_files/${module?.id}`
      );

      console.log("modules:", response.data);

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

      console.log("modulesWithFileUrls:", modulesWithFileUrls);
      // Set the modules state to the transformed data
      setFiles(modulesWithFileUrls);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      showSnackbar({
        message: error.response?.data?.message,
        severity: "error",
      });
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
          {files.map((file) => {
            return (
              <a
                key={file.id}
                href={file.fileUrl}
                download={file.label} // This will set the download file name as the label
                style={{ textDecoration: "none", color: "blue" }} // Optional styling
              >
                {file.label}
              </a>
            );
          })}

          {/* <Stack
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
          </Stack> */}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ModulePanel;
