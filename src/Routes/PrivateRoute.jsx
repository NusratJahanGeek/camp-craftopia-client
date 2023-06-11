import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Center, CircularProgress } from "@chakra-ui/react";
import useUsers from "../hooks/useUsers";


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [users] = useUsers();

    console.log(users)
    const location = useLocation();

    if (loading) {
     return <Center marginTop={55} marginBottom={55}><CircularProgress isIndeterminate color="#FF6B6B" /></Center>
    }

    if (user) {
        return children;
    }


    return (
        <Navigate to="/login" state={{from: location}} replace></Navigate>
    );
};

export default PrivateRoute;