import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useStudentDashboard = () => {
    const {user} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const {data: isStudent, isLoading: isStudentLoading} = useQuery({
        queryKey: ['isStudent', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/student/${user?.email}`);
            console.log('Is Student Response', res);
            console.log(res.data)
            return res.data.student;
        }
    })

    return [isStudent, isStudentLoading];
}

export default useStudentDashboard;