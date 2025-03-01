import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { formatDate } from "../../../const/formatter";
import dayjs from "dayjs";

const EditableDatePicker = ({
  value,
  isEditable,
  onChange,
  name,
  placeholder,
  width = "100%",
  fontSize = "0.875rem", // default font size
  color = "text.primary", // default color from theme
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (value && dayjs(value).isValid()) {
      setSelectedDate(dayjs(value));
    }
  }, [value]);

  return (
    <>
      {isEditable ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedDate}
            onChange={(newValue) => {
              setSelectedDate(newValue);
              const isoDate = newValue ? newValue.toISOString() : null;
              onChange(isoDate);
            }}
            maxDate={dayjs()}
            slotProps={{
              textField: {
                variant: "outlined",
                size: "small",
                fullWidth: true,
              },
            }}
            sx={{
              width,
              m: 0,
              transition: "all 0.3s ease",
            }}
          />
        </LocalizationProvider>
      ) : (
        <Typography variant="black">
          {selectedDate ? formatDate(selectedDate) : "Date not available"}
        </Typography>
      )}
    </>
  );
};

export default EditableDatePicker;
