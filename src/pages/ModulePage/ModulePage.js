import { Stack, Typography } from "@mui/material";

const ModulePage = () => {
  return (
    <>
      <Stack
        spacing={1}
        sx={{
          padding: "0.1rem",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            background: "white",
            borderRadius: "0.2rem",
            p: "1rem",
          }}
        >
          <Typography fullWidth textAlign="center" variant="h5" fontWeight={600}>CREATE NEW MODULE</Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default ModulePage;
