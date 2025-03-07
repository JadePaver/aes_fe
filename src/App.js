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
import ClassroomManagementPage from "./pages/ClassroomManagementPage";
import UserManagement from "./pages/UserManagementPage";
import SubjectManagement from "./pages/SubjectManagement";
import StudentMangement from "./pages/StudentManagement";
import ThisYear from "./pages/ThisYear";
import AssessmentEditorPage from "./pages/AssessmentEditorPage";
import UserProfilePage from "./pages/UserProfilePage";
import TakeAssessmentPage from "./pages/TakeAssessmentPage";
import AssessmentResultPage from "./pages/AssessmentResultPage";

import GetServerIP from "./config/getServerIP.js";
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
    yellow: {
      main: "#BEC400",
    },
    group: {
      main: "#34D399",
    },
    edit: {
      main: "#007BFF",
    },
    remove: {
      main: "#FF0000",
    },
    //
    yeloh: {
      main: "#BEC400",
    },
    lock: {
      main: "#E8000C",
    },
    unlock: {
      main: "#34D399",
    },
    reset: {
      main: "#000000",
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
          minWidth: "2rem",
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
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-cell": {
            color: "#000000", // Set the default text color for cells to black
          },
        },
      },
    },
  },
});
document.title = "A.E.S.";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<GetServerIP />}>
      <Route path="/aes" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="user_profile" element={<UserProfilePage />} />
        <Route path="classroom_management">
          <Route index element={<ClassroomManagementPage />} />
        </Route>
        <Route path="user_management" element={<UserManagement />} />
        <Route path="thisyear" element={<ThisYear />} />
        <Route path="subject_management" element={<SubjectManagement />} />
        <Route path="student_management" element={<StudentMangement />} />
        <Route path="subject/:subject_id">
          <Route index element={<SubjectPage />} />
          <Route exact path="assessment_create" element={<AssessmentEditorPage />} />
          <Route exact path="assessment_take/:assessment_id" element={<TakeAssessmentPage />} />
          <Route exact path="assessment_result/:assessment_id" element={<AssessmentResultPage />}/>
        </Route>
        <Route path="unauthorized" element={<>Unauthorized</>} />

      </Route>
      <Route exact path="/aes/login" element={<Login />} />
      <Route exact path="/aes/register" element={<RegisterPage />} />
      <Route exact path="/aes/test" element={<TestPage />} />
      {/* <Route exact path="/fpsms/shopping" element={<Shopping />} >*/}
      <Route path="*" element={<Page404 />} />
    </Route>
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
//I was here
