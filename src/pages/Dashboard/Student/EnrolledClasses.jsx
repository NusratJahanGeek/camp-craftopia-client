import { Avatar, Box, Button, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import DashboardBackground from "../../../assets/DashboardBackground.png";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useClasses from "../../../hooks/useClasses";
import { useQuery } from "@tanstack/react-query";
import useInstructors from "../../../hooks/useInstructors";


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

  const enrolledClasses = payments.map((payment) => {
    const classDetails = payment.bookingId.map((bookingId) => {
      const foundClass = classes.find((classData) => classData._id === bookingId);
      return foundClass ? { ...foundClass } : null;
    });

    return {
      payment,
      classDetails,
    };
  });

  const enrolledClassNumber = enrolledClasses.reduce((total, { classDetails }) => total + classDetails.length, 0);

  const instructorEmail = (instructorName) => {
    const findInstructor = instructors.find((instructor) => instructor.name === instructorName);
    return findInstructor ? findInstructor.email : "";
  };

  const { isOpen } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <div>
      <Helmet>
        <title>Camp Craftopia | Selected Classes</title>
      </Helmet>
      {enrolledClassNumber > 0 ? (
        <Box
          pt={150}
          pb={20}
          pl={isDesktop && isOpen ? "250px" : 0}
          transition="padding-left 0.3s ease"
          textAlign="center"
          backgroundImage={`url(${DashboardBackground})`}
          backgroundSize="cover"
          height={enrolledClassNumber < 5 ? "100vh" : "full"}
        >
          <Text fontSize="3xl" fontWeight="bold">
            Enrolled Classes: {enrolledClassNumber}
          </Text>
          <TableContainer mt={12} w={["100%", "100%", "65%"]} mx="auto">
            <Table>
              <Thead fontSize="34px">
                <Tr>
                  <Th fontSize="md" textAlign="center">Class Name</Th>
                  <Th fontSize="md" textAlign="center">Instructor</Th>
                  <Th fontSize="md" textAlign="center">Support Email</Th>
                  <Th fontSize="md" textAlign="center">Purchase Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {enrolledClasses.map(({ payment, classDetails }) => {
                  return classDetails.map((classData, classIndex) => {
                    return (
                      <Tr align="center" key={`${payment._id}-${classIndex}`}>
                        <Td textAlign="center">
                          <Flex alignItems="center">
                            <Avatar name={classData.name} src={classData.image} mr={2} />
                            {classData.name}
                          </Flex>
                        </Td>
                        <Td>{classData.instructor}</Td>
                        <Td textAlign="center">{instructorEmail(classData.instructor)}</Td>
                        <Td textAlign="center">{payment.status}</Td>
                      </Tr>
                    );
                  });
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box
          pt={150}
          pb={20}
          pl={isDesktop && isOpen ? "250px" : 0}
          transition="padding-left 0.3s ease"
          textAlign="center"
          backgroundImage={`url(${DashboardBackground})`}
          backgroundSize="cover"
          height="100vh"
        >
          <Flex flexDirection="column" alignItems="center" justifyContent="center" h="100%">
            <Text fontSize="3xl" fontWeight="bold" mb={4}>
              You have not enrolled in any classes yet!
            </Text>
            <Text fontSize="xl" mb={6}>
              Please enroll in some classes first.
            </Text>
            <Link to="/classes">
              <Button fontSize="lg" textTransform="uppercase">
                Go to Classes
              </Button>
            </Link>
          </Flex>
        </Box>
      )}
    </div>
  );
};

export default EnrolledClasses;
