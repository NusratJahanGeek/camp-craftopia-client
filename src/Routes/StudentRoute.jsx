import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Center, CircularProgress } from "@chakra-ui/react";
import useStudentDashboard from "../hooks/useStudentDashboard";



const StudentRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isStudent, isStudentLoading] = useStudentDashboard();
    const location = useLocation();

    if (loading || isStudentLoading) {
     return <Center marginTop={55} marginBottom={55}><CircularProgress isIndeterminate color="#FF6B6B" /></Center>
    }

    if (user && isStudent) {
        return children;
    }

    return (
        <Navigate to="/" state={{from: location}} replace></Navigate>
    );
};

export default StudentRoute;