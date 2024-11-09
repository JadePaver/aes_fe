import React from 'react';
import { Typography, TextField } from '@mui/material';

const EditableTextField = ({ 
  value, 
  isEditable, 
  onChange, 
  name, 
  placeholder, 
  error,
  helperText, 
  width = "100%", 
  fontSize = "1rem", 
  color = "text.primary" 
}) => {


  
  return (
    <>
      {isEditable ? (
        <TextField
          name={name}
          value={value}
          onChange={onChange}
          variant="outlined"
          size="small"
          margin="dense"
          placeholder={placeholder}
          fullWidth
          error={error} // Pass the error prop to TextField
          helperText={helperText} // Pass the helperText prop to TextField
          sx={{
            width,
            m:0,
            '& .MuiOutlinedInput-root': {
              height: "32px",
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              fontSize,
              color,
            },
            '& .MuiInputBase-input': {
              padding: "0 0 0 0.5rem", // Custom padding for the input field
              fontSize,
              color,
            },
          }}
          inputProps={{
            style: { fontSize, color }, // ensures consistent font styling
          }}
        />
      ) : (
        <Typography 
          variant="body2"
          sx={{
            width,
            height: "32px",
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            margin: 0,
            paddingLeft: '8px',
            fontSize,
            color,
          }}
        >
          {value || "N/A"}
        </Typography>
      )}
    </>
  );
};

export default EditableTextField;
