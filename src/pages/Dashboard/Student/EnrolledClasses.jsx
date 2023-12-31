import {
  Avatar,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useClasses from "../../../hooks/useClasses";
import { useQuery } from "@tanstack/react-query";
import useInstructors from "../../../hooks/useInstructors";
import DashboardBg from "../../Shared/DashboardBackground/DashboardBg";
import DashboardNoDataBg from "../../Shared/DashboardBackground/DashboardNoDataBg";

const EnrolledClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [instructors] = useInstructors();
  const [axiosSecure] = useAxiosSecure();
  const [classes] = useClasses();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  const enrolledClasses = payments.flatMap((payment) => {
    if (payment.bookingId) {
      if (Array.isArray(payment.bookingId)) {
        const classDetails = payment.bookingId.map((bookingId) => {
          const foundClass = classes.find(
            (classData) => classData._id === bookingId
          );
          return foundClass ? { ...foundClass } : null;
        });
        return classDetails.filter((classData) => classData !== null);
      } else {
        const foundClass = classes.find(
          (classData) => classData._id === payment.bookingId
        );
        return foundClass ? [{ ...foundClass }] : [];
      }
    }
    return [];
  });

  const instructorEmail = (instructorName) => {
    const findInstructor = instructors.find(
      (instructor) => instructor.name === instructorName
    );
    return findInstructor ? findInstructor.email : "";
  };


  return (
    <div>
      <Helmet>
        <title>Camp Craftopia | Enrolled Classes</title>
      </Helmet>
      {enrolledClasses.length > 0 ? (
        <DashboardBg applyPadding dataLength={enrolledClasses?.length > 0}>
          <Text fontSize="3xl" fontWeight="bold">
            Enrolled Classes: {enrolledClasses.length}
          </Text>
          <TableContainer mt={12} w={["100%", "100%", "65%"]} mx="auto">
            <Table>
              <Thead fontSize="34px">
                <Tr>
                  <Th fontSize="md" textAlign="center">
                    Class Name
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Instructor
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Support Email
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Purchase Status
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {enrolledClasses.map((classData) => {
                  const payment = payments.find(
                    (payment) => payment.bookingId === classData._id
                  );
                  const status = payment ? payment.status : "";

                  return (
                    <Tr align="center" key={classData._id}>
                      <Td textAlign="center">
                        <Flex alignItems="center">
                          <Avatar
                            name={classData.name}
                            src={classData.image}
                            mr={2}
                          />
                          {classData.name}
                        </Flex>
                      </Td>
                      <Td textAlign="center">{classData.instructor}</Td>
                      <Td textAlign="center">
                        {instructorEmail(classData.instructor)}
                      </Td>
                      <Td textAlign="center">{status}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </DashboardBg>
      ) : (
        <DashboardNoDataBg title="You have not enrolled in any classes yet!" subTitle="Please enroll in some classes first." CTA="Go To Classes">
        </DashboardNoDataBg>
      )}
    </div>
  );
};

export default EnrolledClasses;
