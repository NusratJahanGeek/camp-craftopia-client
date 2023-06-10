import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Instructors from "../pages/Instructors/Instructors/Instructors";
import Classes from "../pages/Classes/Classes/Classes";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Secret from "../pages/Secret/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import SelectedClasses from "../pages/Dashboard/Student/SelectedClasses";
import StudentDashboard from "../pages/Dashboard/Student/StudentDashboard";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import InstructorDashboard from "../pages/Dashboard/Instructor/InstructorDashboard";
import AddClass from "../pages/Dashboard/Instructor/AddClass";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/instructors',
          element: <Instructors></Instructors>
        },
        {
          path: '/classes',
          element: <Classes></Classes>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Registration></Registration>
        },
        {
          path: '/secret',
          element: <PrivateRoute><Secret></Secret></PrivateRoute>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        // Student Dashboard
        {
          path: 'student',
          element: <PrivateRoute><StudentDashboard></StudentDashboard></PrivateRoute>
        },
        {
          path: 'selected-classes',
          element: <PrivateRoute><SelectedClasses></SelectedClasses></PrivateRoute>
        },
        // Instructor Dashboard
        {
          path: 'instructor',
          element: <InstructorRoute><InstructorDashboard></InstructorDashboard></InstructorRoute>
        },
        {
          path: 'add-class',
          element: <InstructorRoute><AddClass></AddClass></InstructorRoute>
        },
        // Admin Dashboard
        {
          path: 'admin',
          element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>
        },
        {
          path: 'manage-classes',
          element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
        },
        {
          path: 'manage-users',
          element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        }
      ]
    }
  ]);