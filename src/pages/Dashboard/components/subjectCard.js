// SubjectCard.js
import React, { useState } from "react";
import { Card, Stack, Box, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SubjectOptions from "./subjectOptions";

import { useNavigate } from "react-router-dom";

const SubjectCard = ({ course }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

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
        transform: isHovered ? "translateY(-0.5rem) " : "translateY(0) ",
        transition: "transform 0.2s ease-out",
        boxShadow: isHovered ? 3 : 1, // Optional: Add shadow on hover
        cursor: "pointer",
      }}
    >
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{ cursor: "pointer" }}
      >
        <Stack
          onClick={() => {
            navigate(`subject/${course.id}`);
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              paddingTop: "100%",
              backgroundImage: `url('/bookshelf.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "0.6rem",
              mb: "0.5rem",
            }}
          />
          <Typography variant="h6">{course.label}</Typography>
          <Stack direction="row" justifyContent="space-between">
            <Typography>{course.year}</Typography>
            {course.status && (
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "center",
                  textAlign: "center",
                  border: "1px solid var(--yel)",
                  borderRadius: "0.2rem",
                  p: "0 0.25rem",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: "var(--yel)", fontWeight: 600 }}
                >
                  Waiting for Approval
                </Typography>
                <AccessTimeIcon sx={{ color: "var(--yel)" }} />
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>
      <Stack direction="row" justifyContent="space-between">
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", textAlign: "center" }}
        >
          <SchoolIcon />
          <Typography variant="caption" sx={{ color: "black" }}>
            {course.instructor}
          </Typography>
        </Stack>
        <SubjectOptions subCode={course.subCode} />
      </Stack>
    </Card>
  );
};

export default SubjectCard;
