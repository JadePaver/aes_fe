import Container from "@mui/material/Container";
import Box from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoodBadRoundedIcon from "@mui/icons-material/MoodBadRounded";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <>
      <Stack
        spacing={1}
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack direction="row" justifyContent="center" alignItems="center">
          <MoodBadRoundedIcon sx={{fontSize:"25rem"}}/>
          <Typography color="primary" sx={{fontSize:"12rem", fontWeight:600, maxWidth:"50%", lineHeight:"10rem"}}>
            404 PAGE
          </Typography>
        </Stack>

        <Typography variant="h4" color="primary">
          We’re Sorry! The Page Took a Detour
        </Typography>
        <Typography sx={{maxWidth:"32.5%", justifyContent:"center", textAlign:"center"}}>
        (Unless you were looking for a page with a sentiment dissatisfied face and a 404 number. If that’s the case, it definitely exist and you definitely found it.)
        </Typography>
        <Button
          variant="outlined"
          autoFocus
          onClick={() => navigate("aes/login")}
        >
          Redirect Me
        </Button>
      </Stack>
    </>
  );
};
export default Page404;
