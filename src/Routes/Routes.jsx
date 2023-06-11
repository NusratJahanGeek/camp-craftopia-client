import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Instructors from "../pages/Instructors/Instructors/Instructors";
import Classes from "../pages/Classes/Classes/Classes";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
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
import MyClasses from "../pages/Dashboard/Instructor/MyClasses";
import MakePayment from "../pages/Dashboard/Student/MakePayment";
import StudentRoute from "./StudentRoute";
import EnrolledClasses from "../pages/Dashboard/Student/EnrolledClasses";
import PaymentHistory from "../pages/Dashboard/Student/PaymentHistory";

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
          element: <StudentRoute><StudentDashboard></StudentDashboard></StudentRoute>
        },
        {
          path: 'selected-classes',
          element: <StudentRoute><SelectedClasses></SelectedClasses></StudentRoute>
        },
        {
          path: 'make-payment',
          element: <StudentRoute><MakePayment></MakePayment></StudentRoute>
        },
        {
          path: 'payment-history',
          element: <StudentRoute><PaymentHistory></PaymentHistory></StudentRoute>
        },
        {
          path: 'enrolled-classes',
          element: <StudentRoute><EnrolledClasses></EnrolledClasses></StudentRoute>
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
        {
          path: 'my-classes',
          element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
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