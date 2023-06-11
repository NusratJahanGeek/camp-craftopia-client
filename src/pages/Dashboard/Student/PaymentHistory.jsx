import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import DashboardBackground from "../../../assets/DashboardBackground.png";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const PaymentHistory = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const sortedPayments = [...payments].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  const { isOpen } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const totalPrice = payments.reduce(
    (sum, classData) => classData.price + sum,
    0
  );

  return (
    <div>
      <Helmet>
        <title>Camp Craftopia | Selected Classes</title>
      </Helmet>
      {payments?.length > 0 ? (
        <Box
          pt={150}
          pb={20}
          pl={isDesktop && isOpen ? "250px" : 0}
          transition="padding-left 0.3s ease"
          textAlign="center"
          backgroundImage={`url(${DashboardBackground})`}
          backgroundSize="cover"
          height={payments.length < 5 ? "100vh" : "full"}
        >
          <Box>
            <Text fontSize="3xl" fontWeight="bold">
              Total Paid: ${totalPrice}
            </Text>
          </Box>
          <TableContainer mt={12} w={["100%", "100%", "80%"]} mx="auto">
            <Table>
              <Thead fontSize="34px">
                <Tr>
                  <Th fontSize="md" textAlign="center">
                    #
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Enrolled Classes
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Total Paid
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Class Status
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Transaction Id
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Payment Date
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {sortedPayments.map((payment, index) => (
                  <Tr align="center" key={payment._id}>
                    <Td>{index + 1}</Td>

                    <Td textAlign="center">
                      {payment.classNames.map((individualClass, index) => (
                        <p className="py-1" key={index}>{individualClass}</p>
                      ))}
                    </Td>
                    <Td textAlign="center">${payment.price}</Td>
                    <Td>{payment.status}</Td>
                    <Td textAlign="center">{payment.transactionId}</Td>
                    <Td textAlign="center">{formatDate(payment.date)}</Td>
                  </Tr>
                ))}
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
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            h="100%"
          >
            <Text fontSize="3xl" fontWeight="bold" mb={4}>
              You have not made any payment yet!
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

export default PaymentHistory;
