import Swal from "sweetalert2";
import { Avatar, Box, Button, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, useDisclosure, useToast } from "@chakra-ui/react";
import DashboardBackground from "../../../assets/DashboardBackground.png";
import { Helmet } from "react-helmet-async";
import useBookings from "../../../hooks/useBookings";
import { FaFileInvoiceDollar, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SelectedClasses = () => {
  const [bookings, refetch] = useBookings();
  const toast = useToast();
  const { isOpen } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  //const totalPrice = bookings.reduce((sum, classData) => classData.price + sum, 0);

  const handlePayButtonClick = (classData) => {
    const selectedClassData = JSON.stringify(classData);
    localStorage.setItem('class-data', selectedClassData);
    window.location.href = '/dashboard/make-payment';
  }

  const handleDelete = (classData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/bookings/${classData._id}`, {
          method: "DELETE"
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              toast({
                title: "Done!",
                description: "You've successfully deleted the class from your list.",
                status: "success",
                duration: 9000,
                isClosable: true
              });
            }
          });
      }
    });
  };

  return (
   <div>
     <Helmet>
        <title>Camp Craftopia | Selected Classes</title>
      </Helmet>
      {bookings?.length > 0 ? (
        <Box
          pt={150}
          pb={20}
          pl={isDesktop && isOpen ? "250px" : 0}
          transition="padding-left 0.3s ease"
          textAlign="center"
          backgroundImage={`url(${DashboardBackground})`}
          backgroundSize="cover"
          height={bookings.length < 5 ? "100vh" : "full"}
        >
          <Flex justifyContent="center" alignItems="center" gap={8}>
            <Text fontSize="3xl" fontWeight="bold">
              Wishlist Items: {bookings.length}
            </Text>
           
          </Flex>
          <TableContainer mt={12} w={["100%", "100%", "65%"]} mx="auto">
            <Table>
              <Thead fontSize="34px">
                <Tr>
                  <Th fontSize="md" textAlign="center">
                    #
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Class Name
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Available Seats
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Instructor
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Price
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Pay
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Delete
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {bookings.map((classData, index) => (
                  <Tr align="center" key={classData._id}>
                    <Td>{index + 1}</Td>
                    <Td textAlign="center">
                      <Flex alignItems="center">
                        <Avatar name={classData.name} src={classData.image} mr={2} />
                        {classData.name}
                      </Flex>
                    </Td>
                    <Td textAlign="center">{classData.availableSeats}</Td>
                    <Td>{classData.instructor}</Td>
                    <Td textAlign="center">${classData.price}</Td>
                    <Td>
                      <Button onClick={() => handlePayButtonClick(classData)} textTransform="uppercase">
                        <FaFileInvoiceDollar />
                      </Button>
                    </Td>
                    <Td>
                      <Button onClick={() => handleDelete(classData)} textTransform="uppercase">
                        <FaTrash />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box pt={150} pb={20} pl={isDesktop && isOpen ? "250px" : 0} transition="padding-left 0.3s ease" textAlign="center" backgroundImage={`url(${DashboardBackground})`} backgroundSize="cover" height="100vh">
          <Flex flexDirection="column" alignItems="center" justifyContent="center" h="100%">
            <Text fontSize="3xl" fontWeight="bold" mb={4}>
              You have not selected anything yet!
            </Text>
            <Text fontSize="xl" mb={6}>
              Please select some classes first.
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

export default SelectedClasses;
