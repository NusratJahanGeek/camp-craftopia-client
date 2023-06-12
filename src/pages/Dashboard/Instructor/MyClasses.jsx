import {
  Avatar,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
  useToast,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import DashboardBackground from "../../../assets/DashboardBackground.png";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UpdateClassForm from "../../../components/UpdateClassForm";
import useMyAddedClasses from "../../../hooks/useMyAddedClasses";
import { useState } from "react";

const MyClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const [addedClasses, refetch] = useMyAddedClasses();

  const [selectedClass, setSelectedClass] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const handleOpenUpdateModal = (classData) => {
    setSelectedClass(classData);
    onOpen();
  };

  const handleUpdate = (classData, updatedValues) => {
    const updatedClassData = {
      ...classData,
      ...updatedValues,
    };

    axiosSecure
      .put(`/my-classes/${classData._id}`, updatedClassData)
      .then(() => {
        refetch();
        toast({
          title: "Done!",
          description: "You've successfully updated the class details.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log("Update Error", error);
        toast({
          title: "Error",
          description: "An error occurred while updating the class details.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <div>
      <Helmet>
        <title>Camp Craftopia | My Classes</title>
      </Helmet>
      {addedClasses?.length > 0 ? (
        <Box
          pt={150}
          pb={20}
          pl={isDesktop && isOpen ? "250px" : 0}
          transition="padding-left 0.3s ease"
          textAlign="center"
          backgroundImage={`url(${DashboardBackground})`}
          backgroundSize="cover"
          height={addedClasses.length < 5 ? "100vh" : "full"}
        >
          <Text fontSize="3xl" fontWeight="bold">
            Total Classes: {addedClasses.length}
          </Text>
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
                    Price
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Available Seats
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Enrolled
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Status
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Feedback
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {addedClasses.map((classData, index) => (
                  <Tr align="center" key={classData._id}>
                    <Td>{index + 1}</Td>
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
                    <Td textAlign="center">${classData.price}</Td>
                    <Td textAlign="center">{classData.availableSeats}</Td>
                    <Td textAlign="center">{classData.totalStudents || 0}</Td>
                    <Td textAlign="center">{classData.status}</Td>
                    <Td textAlign="center" whiteSpace="normal" lineHeight={1.5}>
                      {classData.status === "Denied" && (
                        <Box maxW="150px" mx="auto" overflowWrap="break-word">
                          <Text>{classData.feedback || null}</Text>
                        </Box>
                      )}
                    </Td>
                    <Td>
                      <Button
                        onClick={() => handleOpenUpdateModal(classData)}
                        textTransform="uppercase"
                      >
                        <FaEdit />
                      </Button>
                      <Modal
                        isOpen={isOpen && selectedClass === classData}
                        onClose={onClose}
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Update Class</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <UpdateClassForm
                              classData={classData}
                              onUpdate={handleUpdate}
                            />
                          </ModalBody>
                          <ModalFooter>
                            <Button onClick={onClose}>Close</Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </Td>
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
              You have not added anything yet!
            </Text>
            <Text fontSize="xl" mb={6}>
              Please add a class first.
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

export default MyClasses;
