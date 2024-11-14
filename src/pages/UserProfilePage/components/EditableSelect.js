import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Typography } from "@mui/material";

const EditableSelect = ({ value, handleChange, isEditable, sex, errors }) => {
  const [customSexId, setCustomSexId] = useState(value || ""); // State to handle custom input

  useEffect(() => {
    setCustomSexId(value || ""); // Update customSexId if the value changes
  }, [value]);

  const handleCustomInputChange = (event) => {
    setCustomSexId(event.target.value); // Update custom input value
    handleChange(event); // Also handle the formData update
  };

  return (
    <>
      {isEditable ? (
        <TextField
          required
          select
          value={customSexId} // Use customSexId for selected value
          variant="outlined"
          onChange={handleCustomInputChange} // Custom input change handler
          error={!!errors?.sex}
          helperText={errors?.sex}
          sx={{
            m: 0, // Remove margin
            "& .MuiOutlinedInput-root": {
              height: "32px",
              padding: 0, // Remove padding in the root element
              display: "flex",
              alignItems: "center",
              fontSize: "1rem", // Adjust font size as needed
              color: "inherit", // Ensure color consistency
            },
            "& .MuiInputBase-input": {
              padding: "0 0 0 0.5rem", // Custom padding inside the input field
              fontSize: "1rem",
              color: "inherit",
            },
          }}
          inputProps={{
            style: { fontSize: "1rem", color: "inherit" }, // Consistent font styling
          }}
        >
          {sex.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              <Typography variant="body1" color="black">
                {option.label.charAt(0).toUpperCase() + option.label.slice(1)}
              </Typography>
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <Typography variant="black">
          {sex.find((option) => option.id === customSexId)?.label || "N/A"}
        </Typography>
      )}
    </>
  );
};

export default EditableSelect;
