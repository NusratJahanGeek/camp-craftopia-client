import { Avatar, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useToast } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { FaCheck, FaComment, FaTimes } from "react-icons/fa";
import useClasses from "../../../hooks/useClasses";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import FeedbackForm from "../../../components/FeedbackForm";
import DashboardNoDataBg from "../../Shared/DashboardBackground/DashboardNoDataBg";
import DashboardBg from "../../Shared/DashboardBackground/DashboardBg";

const ManageClasses = () => {
  const [classes, , refetch] = useClasses();
  const [axiosSecure] = useAxiosSecure();
  const [classStatus, setClassStatus] = useState({}); 

  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedClass, setSelectedClass] = useState(null);


  const toast = useToast();

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
        <DashboardBg dataLength={classes?.length} applyPadding>
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
        </DashboardBg>
      ) : (
       
        <DashboardNoDataBg title="You have not added anything yet!" subTitle="Please add a class first." CTA="Go to Classes"></DashboardNoDataBg>
      )}
    </div>
  );
};

export default ManageClasses;
