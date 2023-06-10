import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Center, CircularProgress } from "@chakra-ui/react";
import useInstructorDashboard from "../hooks/useInstructorDashboard";


const InstructorRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isInstructor, isInstructorLoading] = useInstructorDashboard();
    const location = useLocation();

    if (loading || isInstructorLoading) {
     return <Center marginTop={55} marginBottom={55}><CircularProgress isIndeterminate color="#FF6B6B" /></Center>
    }

    if (user && isInstructor) {
        return children;
    }

    return (
        <Navigate to="/" state={{from: location}} replace></Navigate>
    );
};

export default InstructorRoute;