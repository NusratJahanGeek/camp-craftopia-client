import {
  Avatar,
  Box,
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
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import DashboardBg from "../../Shared/DashboardBackground/DashboardBg";
import DashboardNoDataBg from "../../Shared/DashboardBackground/DashboardNoDataBg";

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

  const totalPrice = payments.reduce(
    (sum, classData) => classData.price + sum,
    0
  );

  return (
    <div>
      <Helmet>
        <title>Camp Craftopia | Payment History</title>
      </Helmet>
      {payments?.length > 0 ? (
        <DashboardBg applyPadding height={payments?.length > 0}>
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
                      <Flex alignItems="center">
                        <Avatar
                          name={payment.className}
                          src={payment.classImage}
                          mr={2}
                        />
                        {payment.className}
                      </Flex>
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
        </DashboardBg>
      ) : (
        <DashboardNoDataBg title="You have not made any payment yet!" subTitle="Please enroll in some classes first." CTA="Go to Classes">    
        </DashboardNoDataBg>
      )}
    </div>
  );
};

export default PaymentHistory;
