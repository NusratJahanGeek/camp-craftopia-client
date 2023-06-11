import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Center, CircularProgress } from "@chakra-ui/react";
import useStudentDashboard from "../hooks/useStudentDashboard";
import useInstructorDashboard from "../hooks/useInstructorDashboard";
import useAdmin from "../hooks/useAdmin";



const StudentRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isStudent, isStudentLoading] = useStudentDashboard();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructorDashboard();
    const location = useLocation();

    if (loading || isStudentLoading) {
     return <Center marginTop={55} marginBottom={55}><CircularProgress isIndeterminate color="#FF6B6B" /></Center>
    }

    if (user) {
        if (isStudent) {
          return children;
        } else {   
          if (isAdmin) {
            return <Navigate to="/dashboard/admin" replace />;
          } else if (isInstructor) {
            return <Navigate to="/dashboard/instructor" replace />;
          }
        }
      }


    return (
        <Navigate to="/dashboard" state={{from: location}} replace></Navigate>
    );
};

export default StudentRoute;