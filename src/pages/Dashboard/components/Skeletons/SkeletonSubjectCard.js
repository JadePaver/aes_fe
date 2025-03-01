import React from "react";
import { Card, Box, Stack, Skeleton } from "@mui/material";

const SkeletonSubjectCard = () => {
  return (
    <Card
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: "0.5rem",
        borderRadius: "0.5rem",
        minWidth: "215px",
        minHeight: "305px",
      }}
    >
      <Box sx={{ cursor: "pointer" }}>
        <Stack>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200} // Adjust height based on your design
            sx={{ borderRadius: "0.6rem", mb: "0.5rem" }}
          />
          <Skeleton variant="text" width="60%" height={30} />
          <Stack direction="row" justifyContent="space-between">
            <Skeleton variant="text" width="30%" height={20} />
          </Stack>
        </Stack>
      </Box>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", textAlign: "center" }}>
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width="50%" height={20} />
        </Stack>

        <Skeleton variant="rectangular" width={50} height={25} sx={{ borderRadius: "0.5rem" }} />
      </Stack>
    </Card>
  );
};

export default SkeletonSubjectCard;
