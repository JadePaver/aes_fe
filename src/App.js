import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import RootLayout from "./layouts/root_layout";
import Dashboard from "./pages/Dashboard/dashboard";
import Login from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import TestPage from "./pages/Test";
import Page404 from "./pages/Page404";
import SubjectPage from "./pages/SubjectPage";

import { SubjectProvider } from "./layouts/components/subjectProvider";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
    allVariants: {
      color: "#008000", // You can also use theme.palette.primary.main
    },
    white: {
      fontFamily: "Poppins, sans-serif",
      color: "#FFFFFF", // Custom variant for white text
    },
  },
  palette: {
    primary: {
      main: "#008000",
    },
    secondary: {
      main: "#7B9971",
    },
    accent: {
      main: "#FFFFFF",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "Poppins, sans-serif",
        },
        color: "primary.main",
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "Poppins, sans-serif",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "primary.main",
            },
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
            },
          },
        },
      },
    },
  },
});
document.title = "A.E.S.";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/aes" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route exact path="subject" element={<SubjectPage />} />
      </Route>
      <Route exact path="/aes/login" element={<Login />} />
      <Route exact path="/aes/register" element={<RegisterPage />} />
      <Route exact path="/aes/test" element={<TestPage />} />
      {/* <Route exact path="/fpsms/shopping" element={<Shopping />} >*/}
      <Route path="*" element={<Page404 />} />
    </>
  )
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SubjectProvider>
        <RouterProvider router={router} />
      </SubjectProvider>
    </ThemeProvider>
  );
}

export default App;
