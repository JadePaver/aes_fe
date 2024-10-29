import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";

import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e)=>{
    e.preventDefault()
    console.log("you've tried to login")
    navigate("/aes")
  }

  return (
    <>
      <Box
        sx={{
          backgroundImage: `
          linear-gradient(to bottom right,  rgba(0, 128, 0, 0), rgba(0, 128, 0, 0.7)),
          url('/aes_bg.jpg')`, 
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          backgroundRepeat: "no-repeat", 
          height: "100vh", 
          display: "flex",
          justifyContent: "center", 
          alignItems: "center",
        }}
      >
        <Stack
          direction="row"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            direction="row"
            sx={{
              p: "0 2vw",
              flex: 1.5,
            }}
          >
            <Box
              sx={{
                maxHeight: "300px",
                minHeight: "300px",
                maxWidth: "300px",
                minWidth: "300px",
                borderRadius: "50%", 
                bgcolor: "white",
                margin: "auto 0",
                boxShadow: 2, 
              }}
            />
            <Typography
              variant="white"
              sx={{
                fontSize: "4rem",
                fontWeight: 600,
                lineHeight: 2,
                maxWidth: "1rem",
                marginLeft: "2rem",
              }}
            >
              ADVANCE EDUCATIONAL SMART SYSTEM
            </Typography>
          </Stack>
          <Stack
            sx={{
              bgcolor: "var(--accent)",
              minHeight: "100%",
              width: "100%",
              flex: 1,
            }}
          >
            <Card
              sx={{
                m: "auto",
                p: "17% 10%",
                minWidth: "65%",
              }}
              elevation={3}
            >
              <Stack component="form" direction="column" sx={{ alignItems: "end" }} onSubmit={handleLogin}>
                <Stack
                  direction="column"
                  spacing={2}
                  fullWidth
                  sx={{ width: "100%" }}
                >
                  <TextField
                    fullWidth
                    color="primary"
                    label="Username"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
                <Button sx={{fontSize:"0.75rem"}} onClick={()=>{navigate("/aes/register")}}>Register</Button>
                <Button
                  size="large"
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: "20%" }}
                  disableElevation
                  type="submit"
                >
                  LOG IN
                </Button>
              </Stack>
            </Card>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Login;
