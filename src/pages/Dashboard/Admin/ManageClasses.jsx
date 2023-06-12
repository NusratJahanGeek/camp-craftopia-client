import { Avatar, Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useBreakpointValue, useDisclosure, useToast } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { FaCheck, FaComment, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import DashboardBackground from "../../../assets/DashboardBackground.png";
import useClasses from "../../../hooks/useClasses";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import FeedbackForm from "../../../components/FeedbackForm";

const ManageClasses = () => {
  const [classes, , refetch] = useClasses();
  const [axiosSecure] = useAxiosSecure();
  const [classStatus, setClassStatus] = useState({}); 

  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedClass, setSelectedClass] = useState(null);


  const toast = useToast();
  const { isOpen } = useDisclosure();

  const isDesktop = useBreakpointValue({ base: false, lg: true });

  useEffect(() => {
    refetch(); 
  }, []);

  const handleApproveClass = async (classData) => {
    await axiosSecure.patch(`/classes/${classData._id}`, { status: 'Approved' });
    setClassStatus((prevState) => ({
      ...prevState,
      [classData._id]: 'Approved',
    }));
    refetch();
    toast({
      title: 'Class Approved!',
      description: `${classData.name} is now live!`,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  const handleDenyClass = async (classData) => {
    await axiosSecure.patch(`/classes/${classData._id}`, { status: 'Denied' });
    setClassStatus((prevState) => ({
      ...prevState,
      [classData._id]: 'Denied',
    }));
    refetch();
    toast({
      title: 'Class Denied!',
      description: `${classData.name} is no longer active.`,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  
  useEffect(() => {
    const statusMap = {};
    for (const classData of classes) {
      statusMap[classData._id] = classData.status;
    }
    setClassStatus(statusMap);
  }, [classes]);


  const handleSendFeedback = async (classData, feedback) => {
      await axiosSecure.patch(`/classes/${classData._id}`, { feedback });
      handleCloseModal();
  };

  const handleOpenModal = (classData) => {
    setSelectedClass(classData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
  };


  return (
    <div>
      <Helmet>
        <title>Camp Craftopia | My Classes</title>
      </Helmet>
      {classes?.length > 0 ? (
        // Render class table if there are classes
        <Box
          pt={150}
          pb={20}
          pl={isDesktop && isOpen ? '250px' : 0}
          transition="padding-left 0.3s ease"
          textAlign="center"
          backgroundImage={`url(${DashboardBackground})`}
          backgroundSize="cover"
          height={classes.length < 5 ? '100vh' : 'full'}
        >
          <Text fontSize="3xl" fontWeight="bold">
            Total Classes: {classes.length}
          </Text>
          <TableContainer mt={12} w={['100%', '100%', '100%']} mx="auto" px={8}>
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
                    Email
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Price
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Status
                  </Th>
                  <Th fontSize="md" textAlign="center">
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {classes.map((classData, index) => (
                  <Tr align="center" key={classData._id}>
                    <Td>{index + 1}</Td>
                    <Td textAlign="center">
                      <Flex alignItems="center">
                        <Avatar name={classData.name} src={classData.image} mr={2} />
                        {classData.name}
                      </Flex>
                    </Td>
                    <Td textAlign="center">{classData.availableSeats}</Td>
                    <Td textAlign="center">{classData.instructor}</Td>
                    <Td textAlign="center">{classData.email}</Td>
                    <Td textAlign="center">${classData.price}</Td>
                    <Td textAlign="center">{classData.status}</Td>
                    <Td textAlign="center">
                      <Flex gap={4}>
                        <Tooltip label="Approve" hasArrow bg="gray.300" color="black" fontSize="md" placement="bottom">
                          <Button
                            isDisabled={classStatus[classData._id] === 'Approved' || classStatus[classData._id] === 'Denied'}
                            onClick={() => handleApproveClass(classData)}
                            textTransform="uppercase"
                          >
                            <FaCheck />
                          </Button>
                        </Tooltip>
                        <Tooltip label="Deny" hasArrow bg="gray.300" color="black" fontSize="md" placement="bottom">
                          <Button
                            isDisabled={classStatus[classData._id] === 'Approved' || classStatus[classData._id] === 'Denied'}
                            onClick={() => handleDenyClass(classData)}
                            textTransform="uppercase"
                          >
                            <FaTimes />
                          </Button>
                        </Tooltip>
                        <Tooltip label="Send Feedback" hasArrow bg="gray.300" color="black" fontSize="md" placement="bottom">
                        <Button onClick={() => handleOpenModal(classData)} textTransform="uppercase">
                            <FaComment />
                          </Button>
                        </Tooltip>
                        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send Feedback</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedClass && (
              <FeedbackForm classData={selectedClass} onSubmit={handleSendFeedback} />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        // Render placeholder message if there are no classes
        <Box
          pt={150}
          pb={20}
          pl={isDesktop && isOpen ? '250px' : 0}
          transition="padding-left 0.3s ease"
          textAlign="center"
          backgroundImage={`url(${DashboardBackground})`}
          backgroundSize="cover"
          height="100vh"
        >
          <Flex flexDirection="column" alignItems="center" justifyContent="center" h="100%">
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

export default ManageClasses;
