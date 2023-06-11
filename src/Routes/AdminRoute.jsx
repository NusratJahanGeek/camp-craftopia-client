import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin"
import { Navigate, useLocation } from "react-router-dom";
import { Center, CircularProgress } from "@chakra-ui/react";
import useInstructorDashboard from "../hooks/useInstructorDashboard";
import useStudentDashboard from "../hooks/useStudentDashboard";


const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isInstructor] = useInstructorDashboard();
    const [isStudent] = useStudentDashboard();
    const location = useLocation();

    if (loading || isAdminLoading) {
     return <Center marginTop={55} marginBottom={55}><CircularProgress isIndeterminate color="#FF6B6B" /></Center>
    }

    if (user) {
        if (isAdmin) {
          return children;
        } else {   
          if (isInstructor) {
            return <Navigate to="/dashboard/instructor" replace />;
          } else if (isStudent) {
            return <Navigate to="/dashboard/student" replace />;
          }
        }
      }

    return (
        <Navigate to="/dashboard" state={{from: location}} replace></Navigate>
    );
};

export default AdminRoute;