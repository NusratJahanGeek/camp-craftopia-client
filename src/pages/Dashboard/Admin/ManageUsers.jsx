import { useQuery } from "@tanstack/react-query";
import { Avatar, Box, Button, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useBreakpointValue, useDisclosure, useToast, Center, CircularProgress } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import DashboardBackground from "../../../assets/DashboardBackground.png";
import { FaChalkboardTeacher, FaTrash, FaUser, FaUserLock } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const {data: users = [], refetch} = useQuery(['users'], async() => {
      const res = await axiosSecure.get('/users')
      return res.data;
  });

  console.log(users);
  
  const { isOpen } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const toast = useToast();

  const handleMakeAdmin = (user) => {
    fetch(`http://localhost:5000/users/admin/${user._id}`, {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          refetch();
          toast({
            title: 'User Role Updated!',
            description: `${user?.name} is an Admin Now!`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
      })
  }

  const handleMakeInstructor = (user) => {
    fetch(`http://localhost:5000/users/instructor/${user._id}`, {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.modifiedCount) {
          refetch();
          toast({
            title: 'User Role Updated!',
            description: `${user?.name} is an Instructor Now!`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
      })
  }

  const handleMakeStudent = (user) => {
    fetch(`http://localhost:5000/users/student/${user._id}`, {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          refetch();
          toast({
            title: 'User Role Updated!',
            description: `${user?.name} is a Student Now!`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
      });

    }

      const handleDelete = (user) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: `Yes, delete '${user?.name}' from my list!`
        }).then((result) => {
            
                if (result.isConfirmed) {
                  fetch(`http://localhost:5000/users/${user._id}`, {
                    method: "DELETE"
                  })
                    .then((res) => res.json())
                    .then((data) => {
                     
                          if (data.deletedCount > 0) {
                            refetch();
                            toast({
                              title: "Done!",
                              description: `You've successfully deleted ${user?.name} from your list.`,
                              status: "success",
                              duration: 9000,
                              isClosable: true
                            });
                          }                      
                    })
                }          
        });
  }

  return (
    <Box
      pt={150}
      pb={20}
      pl={isDesktop && isOpen ? "250px" : 0}
      transition="padding-left 0.3s ease"
      textAlign="center"
      backgroundImage={`url(${DashboardBackground})`}
      backgroundSize="cover"
      height={users.length < 5 ? "100vh" : "full"}
    >
      <Helmet>
        <title>Camp Craftopia | Manage Users</title>
      </Helmet>
      <Text fontSize="3xl" fontWeight="bold">
        Total Users: {users.length}
      </Text>

      <TableContainer mt={12} w={["100%", "100%", "90%"]} mx="auto">
        <Table>
          <Thead fontSize="34px">
            <Tr>
              <Th fontSize="md" textAlign="center">
                #
              </Th>
              <Th fontSize="md" textAlign="center">
                User Name
              </Th>
              <Th fontSize="md" textAlign="center">
                Role
              </Th>
              <Th fontSize="md" textAlign="center">
                Email
              </Th>
              <Th fontSize="md" textAlign="center">
                Phone
              </Th>
              <Th fontSize="md" textAlign="center">
                Address
              </Th>
              <Th fontSize="md" textAlign="center">
                Gender
              </Th>
              <Th fontSize="md" textAlign="center">
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            { users.length > 0 ? (users.map((user, index) => (
              <Tr align="center" key={user._id}>
                <Td>{index + 1}</Td>
                <Td textAlign="center">
                  <Flex alignItems="center">
                    <Avatar name={user.name} src={user.photo} mr={2} />
                    {user.name}
                  </Flex>
                </Td>
                <Td display="flex" justifyContent="center" alignItems="center">
                  {user.role === "admin" ? (
                    <Tooltip label="Admin" hasArrow bg='gray.300' color='black' fontSize='md' placement="right">
                   <Button
                    onClick={() => handleMakeInstructor(user)}>
                     <FaUserLock />
                  </Button>
                  </Tooltip>
                  ) : user.role === "instructor" ? (
                    <Tooltip label="Instructor" hasArrow bg='gray.300' color='black' fontSize='md' placement="right">
                    <Button
                    onClick={() => handleMakeStudent(user)}>
                    <FaChalkboardTeacher />
                  </Button>
                  </Tooltip>
                  ) : (
                    <Tooltip label="Student" hasArrow bg='gray.300' color='black' fontSize='md' placement="right">
                    <Button
                      onClick={() => handleMakeAdmin(user)}>
                     <FaUser />
                    </Button>
                    </Tooltip>
                  )}
                </Td>

                <Td textAlign="center">{user?.email}</Td>
                <Td textAlign="center">{user?.phone || 'Not Found'}</Td>
                <Td textAlign="center">{user?.address || 'Not Found'}</Td>
                <Td textAlign="center">{user?.gender || 'Not Found'}</Td>
                <Td>
                  <Button
                    onClick={() => handleDelete(user)}
                  >
                    <FaTrash />
                  </Button>
                </Td>
              </Tr>
            ))) : (
              <Tr>
              <Td colSpan={8} textAlign="center">
              <Center marginTop={55} marginBottom={55}><CircularProgress isIndeterminate color="#FF6B6B" /></Center>
              </Td>
            </Tr>
          )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageUsers;
