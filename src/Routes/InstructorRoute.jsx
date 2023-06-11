import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Center, CircularProgress } from "@chakra-ui/react";
import useInstructorDashboard from "../hooks/useInstructorDashboard";
import useAdmin from "../hooks/useAdmin";
import useStudentDashboard from "../hooks/useStudentDashboard";


const InstructorRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isInstructor, isInstructorLoading] = useInstructorDashboard();
    const [isAdmin] = useAdmin();
  const [isStudent] = useStudentDashboard();
    const location = useLocation();

    if (loading || isInstructorLoading) {
     return <Center marginTop={55} marginBottom={55}><CircularProgress isIndeterminate color="#FF6B6B" /></Center>
    }

    if (user) {
        if (isInstructor) {
          return children;
        } else {   
          if (isAdmin) {
            return <Navigate to="/dashboard/admin" replace />;
          } else if (isStudent) {
            return <Navigate to="/dashboard/student" replace />;
          }
        }
      }

    return (
        <Navigate to="/dashboard" state={{from: location}} replace></Navigate>
    );
};

export default InstructorRoute;