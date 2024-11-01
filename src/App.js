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
import ModulePage from "./pages/ModulePage";
import AssignClassroom from "./pages/AssignClassroom";
import { SubjectProvider } from "./layouts/components/subjectProvider";
import AssessmentEditorPage from "./pages/AssessmentEditorPage.js";

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
    black: {
      fontFamily: "Poppins, sans-serif",
      color: "#000000", // Custom variant for white text
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
    gray: {
      main: "#757575", // Adjust this value to your preferred shade of gray
      contrastText: "#fff",
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
        icon: ({ ownerState, theme }) => ({
          padding: "0.25rem",
          minWidth: 0,
          width: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette[ownerState.color].main}`,
          color: theme.palette[ownerState.color].main,

          "&:hover": {
            color:
              theme.palette[ownerState.color].dark || theme.palette.grey[700],
            borderColor:
              theme.palette[ownerState.color].dark || theme.palette.grey[700],
            backgroundColor: theme.palette.action.hover,
          },
        }),
      },
    },
    variants: [
      {
        props: { variant: "icon" },
        style: {
          padding: "0.25rem",
          minWidth: 0,
          width: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    ],
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
        <Route path="assign_classroom">
          <Route index element={<AssignClassroom />} />
          <Route path="members" element={<>members</>} />
        </Route>
        <Route path="user_management" element={<>user_management</>} />
        Explanation
        <Route exact path="subject/" element={<></>} />
        <Route exact path="subject/:id" element={<SubjectPage />} />
        <Route
          exact
          path="assessment_editor/:assessmentId?"
          element={<AssessmentEditorPage />}
        />
        <Route exact path="module" element={<ModulePage />} />
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
