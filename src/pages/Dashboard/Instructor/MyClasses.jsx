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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UpdateClassForm from "../../../components/UpdateClassForm";
import useMyAddedClasses from "../../../hooks/useMyAddedClasses";
import { useState } from "react";
import DashboardBg from "../../Shared/DashboardBackground/DashboardBg";
import DashboardNoDataBg from "../../Shared/DashboardBackground/DashboardNoDataBg";

const MyClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const [addedClasses, refetch] = useMyAddedClasses();

  const [selectedClass, setSelectedClass] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

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
        <DashboardBg dataLength={addedClasses?.length} applyPadding>
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
        </DashboardBg>
      ) : (
        <DashboardNoDataBg title="You have not added anything yet!" subTitle="Please add a class first." CTA="Go to Classes">
         </DashboardNoDataBg>
      )}
    </div>
  );
};

export default MyClasses;
