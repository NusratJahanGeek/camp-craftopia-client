import Swal from "sweetalert2";
import { Avatar, Button, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import useBookings from "../../../hooks/useBookings";
import { FaFileInvoiceDollar, FaTrash } from "react-icons/fa";
import DashboardNoDataBg from "../../Shared/DashboardBackground/DashboardNoDataBg";
import DashboardBg from "../../Shared/DashboardBackground/DashboardBg";

const SelectedClasses = () => {
  const [bookings, refetch] = useBookings();
  const toast = useToast();

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
        fetch(`https://camp-craftopia-server.vercel.app/bookings/${classData._id}`, {
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
        <DashboardBg dataLength={bookings?.length} applyPadding>
          <Flex justifyContent="center" alignItems="center" gap={8}>
            <Text fontSize="3xl" fontWeight="bold">
              Wishlist Items: {bookings.length}
            </Text>
           
          </Flex>
          <TableContainer mt={12} w={["100%", "100%", "80%"]} mx="auto">
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
        </DashboardBg>
      ) : (
        <DashboardNoDataBg title="You have not selected anything yet!" subTitle="Please select some classes first." CTA="Go to Classes">
             </DashboardNoDataBg>
      )}
    </div>
  );
};

export default SelectedClasses;
