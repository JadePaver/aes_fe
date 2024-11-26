import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";

import { useEffect, useState } from "react";
import { useSnackbar } from "../../../layouts/root_layout";
import apiClient from "../../../axios/axiosInstance";
import { upload } from "@testing-library/user-event/dist/upload";

const ModuleDialog = ({ subjectID }) => {
  const { showSnackbar } = useSnackbar();

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [moduleData, setModuleData] = useState({});
  const [uploadFiles, setUploadFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModuleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setUploadFiles((prevFiles) => [...prevFiles, ...files]); // Append new files to the existing list
  };

  const formatFileSize = (sizeInBytes) => {
    const sizeInMB = sizeInBytes / (1024 * 1024); // Convert bytes to MB
    return sizeInMB.toFixed(2); // Format to 2 decimal places
  };

  const handleRemoveFile = (indexToRemove) => {
    setUploadFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const token = localStorage.getItem("token");

  const decodedUser = jwtDecode(token);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      const uploadFilesWithMeta = uploadFiles.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
      }));

      // Include file metadata in the data object
      const data = {
        ...moduleData,
        uploadFiles: uploadFilesWithMeta,
        subject_id: subjectID,
        user_id: decodedUser.id,
      };
      // Append key-value pairs from moduleData
      Object.entries(moduleData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append each file
      uploadFiles.forEach((file) => {
        formData.append("files", file); // Ensure field name matches Multer's expectation
      });

      console.log("final:", data);
      const serializedData = encodeURIComponent(JSON.stringify(data));

      const response = await apiClient.post(
        `/modules/create/${serializedData}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure proper content type
          },
        }
      );
      showSnackbar({
        message: response?.data?.message,
        severity: "success",
      });

      setIsOpen(false); // Close modal on success
    } catch (error) {
      console.error("Error submitting module data:", error);
      showSnackbar({
        message: error.response?.data?.error,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    console.log("uploadFiles:", uploadFiles);
  }, [uploadFiles]);
  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineRoundedIcon />}
        onClick={() => setIsOpen(true)}
      >
        NEW MODULE
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            width: "60vw", // Increase the width here
            maxWidth: "600px", // Optional: Set a max width
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h5" fontWeight={600}>
            Create New Module
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ p: "1rem 0" }}>
            <TextField
              name="name"
              label="Module Name"
              variant="outlined"
              value={moduleData.name}
              onChange={handleInputChange}
            />
            <TextField
              multiline
              rows={6}
              name="description"
              label="Description"
              variant="outlined"
              value={moduleData.description}
              onChange={handleInputChange}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel
                shrink
                htmlFor="file-upload"
                sx={{ bgcolor: "var(--accent)" }}
              >
                {uploadFiles.length ? "Add Files" : "Upload Files"}
              </InputLabel>
              <TextField
                id="file-upload"
                name="fileUpload"
                type="file"
                inputProps={{
                  multiple: true,
                }}
                variant="outlined"
                onChange={handleFileChange}
              />
            </FormControl>
            {uploadFiles.length > 0 && (
              <Stack spacing={1} sx={{ p: "0 1rem" }}>
                {uploadFiles.map((file, index) => (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    key={index}
                  >
                    <Typography>{file.name}</Typography>
                    <Stack spacing={2} direction="row" alignItems="center">
                      <Typography>{formatFileSize(file.size)} MB</Typography>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <DisabledByDefaultRoundedIcon
                          sx={{ fontSize: "2rem" }}
                        />
                      </IconButton>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            )}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Posting Date"
                value={moduleData.postingDate || null}
                onChange={(newValue) =>
                  handleInputChange({
                    target: { name: "postingDate", value: newValue },
                  })
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-evenly", p: "1.3rem" }}>
          {isEdit ? (
            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={handleSubmit}
              disableElevation
            >
              SUBMIT
            </Button>
          ) : (
            <Button
              fullWidth
              onClick={() => setIsOpen(false)}
              size="large"
              variant="contained"
              disableElevation
            >
              APPLY CHANGES
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModuleDialog;
