import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Avatar,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast,
  Center,
  CircularProgress,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { FaChalkboardTeacher, FaTrash, FaUserLock } from "react-icons/fa";
import Swal from "sweetalert2";
import DashboardBg from "../../Shared/DashboardBackground/DashboardBg";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const toast = useToast();

  const handleMakeAdmin = (user) => {
    fetch(`http://localhost:5000/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          const updatedUsers = users.map((u) =>
            u._id === user._id ? { ...u, role: "admin" } : u
          );
          refetch({ users: updatedUsers });
          toast({
            title: "User Role Updated!",
            description: `${user?.name} is an Admin Now!`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          description: "Failed to update user role",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleMakeInstructor = (user) => {
    fetch(
      `http://localhost:5000/users/instructor/${user._id}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          const updatedUsers = users.map((u) =>
            u._id === user._id ? { ...u, role: "instructor" } : u
          );
          refetch({ users: updatedUsers });
          toast({
            title: "User Role Updated!",
            description: `${user?.name} is an Instructor Now!`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          description: "Failed to update user role",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, delete '${user?.name}' from my list!`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${user._id}`, {
          method: "DELETE",
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
                isClosable: true,
              });
            }
          });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Camp Craftopia | Manage Users</title>
      </Helmet>
      <DashboardBg dataLength={users?.length} applyPadding>
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
                  Update Role
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
              {users.length > 0 ? (
                users.map((user, index) => (
                  <Tr align="center" key={user._id}>
                    <Td>{index + 1}</Td>
                    <Td textAlign="center">
                      <Flex alignItems="center">
                        <Avatar name={user.name} src={user.photo} mr={2} />
                        {user.name}
                      </Flex>
                    </Td>
                    <Td
                      mt={2}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      gap={3}
                    >
                      <Tooltip
                        label="Make Instructor"
                        hasArrow
                        bg="gray.300"
                        color="black"
                        fontSize="md"
                        placement="right"
                      >
                        <Button
                          onClick={() => handleMakeInstructor(user)}
                          isDisabled={user.role === "instructor"}
                        >
                          <FaChalkboardTeacher />
                        </Button>
                      </Tooltip>
                      <Tooltip
                        label="Make Admin"
                        hasArrow
                        bg="gray.300"
                        color="black"
                        fontSize="md"
                        placement="right"
                      >
                        <Button
                          onClick={() => handleMakeAdmin(user)}
                          isDisabled={user.role === "admin"}
                        >
                          <FaUserLock />
                        </Button>
                      </Tooltip>
                    </Td>

                    <Td textAlign="center">{user?.email}</Td>
                    <Td textAlign="center">{user?.phone || "Not Found"}</Td>
                    <Td textAlign="center">{user?.address || "Not Found"}</Td>
                    <Td textAlign="center">{user?.gender || "Not Found"}</Td>
                    <Td>
                      <Button onClick={() => handleDelete(user)}>
                        <FaTrash />
                      </Button>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={8} textAlign="center">
                    <Center marginTop={55} marginBottom={55}>
                      <CircularProgress isIndeterminate color="#FF6B6B" />
                    </Center>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </DashboardBg>
    </div>
  );
};

export default ManageUsers;
