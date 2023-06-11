import { Box, Badge, Button, Flex, Text, useDisclosure,
  useBreakpointValue, DrawerContent, DrawerHeader, DrawerBody, Drawer, Avatar, Wrap, WrapItem, AvatarBadge, IconButton, Tooltip, VStack } from "@chakra-ui/react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { AiOutlineUser } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaArrowLeft, FaBookmark, FaCartPlus, FaChalkboardTeacher, FaLaptop,  FaPeopleArrows, FaPlusSquare, FaTachometerAlt } from "react-icons/fa";
import useBookings from "../hooks/useBookings";
import useUsers from "../hooks/useUsers";
import useAdmin from "../hooks/useAdmin";
import useInstructorDashboard from "../hooks/useInstructorDashboard";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const [bookings] = useBookings();
  const [users] = useUsers();

  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructorDashboard();

  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [initialOpen, setInitialOpen] = useState(false);

  useEffect(() => {
    setInitialOpen(true);
  }, []);

  const handleClose = () => {
    onClose();
    setInitialOpen(false);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
      navigate('/');
  };

  const topMenu = (
    <Flex align="center">
      {user ? (
        <>
          <Wrap marginRight={5}>
            <WrapItem>
              <Avatar
                size="sm"
                name={user?.displayName}
                src={user?.photoURL}
                bg="#FF6B6B"
                icon={<AiOutlineUser fontSize="1.5rem" />}
              >
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
              <Badge ml="-2" mt="-2" zIndex={1} colorScheme="orange">
                {user?.displayName}
              </Badge>
            </WrapItem>
          </Wrap>
          <Button onClick={handleLogOut}>Log Out</Button>
        </>
      ) : (
        <>
          <Text as={NavLink} to="/login" mx={5}>
            s
          </Text>
        </>
      )}
    </Flex>
  );

  return (
    <div>
      <Flex
        bg="#FFD9EC"
        color="#000"
        py={4}
        justify="space-between"
        px={4}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={999}
      >
        {isDesktop ? (
          <>
            <Flex
              mr={4}
              transform={
                isDesktop && isOpen ? "translateX(330px)" : "translateX(0)"
              }
              transition="transform 0.3s ease"
            >
              <Tooltip
                label="Menu"
                placement="left"
                hasArrow
                bg="gray.300"
                color="black"
                fontSize="md"
              >
                <IconButton
                  aria-label="Menu"
                  icon={<HamburgerIcon />}
                  onClick={onOpen}
                />
              </Tooltip>
            </Flex>
            <Box>{topMenu}</Box>
          </>
        ) : (
          <>
            <Flex ml={4}>
              <Tooltip
                label="Menu"
                placement="right"
                hasArrow
                bg="gray.300"
                color="black"
                fontSize="md"
              >
                <IconButton
                  aria-label="Menu"
                  icon={<HamburgerIcon />}
                  onClick={onOpen}
                />
              </Tooltip>
            </Flex>
            <Box>{topMenu}</Box>
          </>
        )}
      </Flex>

      <Drawer
        placement="left"
        isOpen={isOpen || initialOpen}
        initialFocusRef={null}
        onClose={handleClose}
      >
        <DrawerContent>
          <DrawerHeader>
            <Flex justify="space-between" align="center">
              <Text fontSize="16px" fontWeight="semibold" as={NavLink} to="/">
                <IconButton aria-label="Home" icon={<FaArrowLeft />} mr={2} />
                Back To Home
              </Text>
              <Tooltip
                label="Close"
                placement="bottom"
                hasArrow
                bg="gray.300"
                color="black"
                fontSize="md"
              >
               <IconButton
                aria-label="Close"
                icon={<CloseIcon />}
                onClick={handleClose}
                />

              </Tooltip>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={12} align="flex-start" pt={12}>
            {isAdmin ? (
                <>
                  <Text as={NavLink} to="/dashboard/admin">
                    <IconButton
                      aria-label="Dashboard"
                      icon={<FaTachometerAlt />}
                      mr={5}
                    />
                    Dashboard
                  </Text>
                  <Text as={NavLink} to="/dashboard/manage-classes">
                    <Flex alignItems="center">
                      <IconButton
                        aria-label="Manage Classes"
                        icon={<FaLaptop />}
                        mr={5}
                      />
                      <Text>Manage Classes</Text>
                      <Badge colorScheme="orange" ml={2} py={1}>
                        + {bookings?.length || 0}
                      </Badge>
                    </Flex>
                  </Text>
                  <Text as={NavLink} to="/dashboard/manage-users">
                    <Flex alignItems="center">
                      <IconButton
                        aria-label="Manage Users"
                        icon={<FaPeopleArrows />}
                        mr={5}
                      />
                      <Text>Manage Users</Text>
                      { users.length > 0 ? <Badge colorScheme="orange" ml={2} py={1}>
                        + {users?.length || 0}
                      </Badge> : null}
                    </Flex>
                  </Text>
                </>
              ) : isInstructor ? (
                <>
                  <Text as={NavLink} to="/dashboard/instructor">
                    <IconButton
                      aria-label="Dashboard"
                      icon={<FaTachometerAlt />}
                      mr={5}
                    />
                    Dashboard
                  </Text>
                  <Text as={NavLink} to="/dashboard/add-class">
                    <IconButton
                      aria-label="Add A Class"
                      icon={<FaPlusSquare />}
                      mr={5}
                    />
                    Add A Class
                  </Text>
                  <Text as={NavLink} to="/dashboard/my-classes">
                    <Flex alignItems="center">
                      <IconButton
                        aria-label="My Classes"
                        icon={<FaChalkboardTeacher />}
                        mr={5}
                      />
                      <Text>My Classes</Text>
                      <Badge colorScheme="orange" ml={2} py={1}>
                        + {bookings?.length || 0}
                      </Badge>
                    </Flex>
                  </Text>

                </>
             ) : (
                <>
                  <Text as={NavLink} to="/dashboard/student">
                    <IconButton
                      aria-label="Dashboard"
                      icon={<FaTachometerAlt />}
                      mr={5}
                    />
                    Dashboard
                  </Text>
                  <Text as={NavLink} to="/dashboard/selected-classes">
                    <Flex alignItems="center">
                      <IconButton
                        aria-label="My Selected Classes"
                        icon={<FaBookmark />}
                        mr={5}
                      />
                      <Text>My Selected Classes</Text>
                      <Badge colorScheme="orange" ml={2} py={1}>
                        + {bookings?.length || 0}
                      </Badge>
                    </Flex>
                  </Text>

                  <Text as={NavLink} to="/dashboard/enrolled-classes">
                    <IconButton
                      aria-label="My Enrolled Classes"
                      icon={<FaLaptop />}
                      mr={5}
                    />
                    My Enrolled Classes
                  </Text>
                  <Text as={NavLink} to="/dashboard/payment-history">
                    <IconButton
                      aria-label="Payment History"
                      icon={<FaCartPlus />}
                      mr={5}
                    />
                    Payment History
                  </Text>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Outlet></Outlet>
    </div>
  );
};

export default Dashboard;
