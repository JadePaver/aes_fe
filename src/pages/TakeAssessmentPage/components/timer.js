import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import { formatTime } from "../../../const/formatter";

const Timer = ({ time, onTimerExpire }) => {
  const [remainingTime, setRemainingTime] = useState(time);

  useEffect(() => {
    if (remainingTime !== null && remainingTime > 0) {
      const intervalId = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(intervalId); // Clear the timer when it expires
            onTimerExpire(); // Call the function on timer expiry
            return 0;
          }
          return prevTime - 1000; // Decrement by 1 second (1000ms)
        });
      }, 1000);

      return () => clearInterval(intervalId); // Clean up interval on unmount
    }
  }, [remainingTime]);

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          alignItems: "center",
          color: remainingTime < 300000 ? "#E8000C" : "inherit",
        }}
      >
        {remainingTime !== null && remainingTime > 0 ? (
          <>
            <AccessTimeRoundedIcon sx={{ marginRight: 1, fontSize: "2rem" }} />{" "}
            {/* Timer Icon */}
            {formatTime(remainingTime)}
          </>
        ) : (
          <h1>Time's Up!</h1>
        )}
      </Typography>
    </>
  );
};

export default Timer;
