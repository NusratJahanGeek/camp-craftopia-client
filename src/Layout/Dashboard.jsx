import {
    Box,
    Badge,
    Button,
    Flex,
    Text,
    useDisclosure,
    useBreakpointValue,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Drawer,
    Avatar,
    Wrap,
    WrapItem,
    AvatarBadge,
    IconButton,
    Tooltip,
    VStack,
  } from "@chakra-ui/react";
  import { NavLink, Outlet } from "react-router-dom";
  import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
  import { AiOutlineUser } from "react-icons/ai";
  import { useContext } from "react";
  import { AuthContext } from "../providers/AuthProvider";
  import { FaArrowLeft, FaBookmark, FaCartPlus, FaLaptop, FaTachometerAlt } from "react-icons/fa";
import useBookings from "../hooks/useBookings";
 
  
  const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const [bookings] = useBookings();
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const isDesktop = useBreakpointValue({ base: false, md: true });
  
    const handleLogOut = () => {
      logOut()
        .then(() => {})
        .catch((error) => console.log(error));
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
              <Flex mr={4}   transform={
          isDesktop && isOpen ? "translateX(330px)" : "translateX(0)"
        }
       
        transition="transform 0.3s ease">
                <Tooltip label="Menu" placement="left" hasArrow bg='gray.300' color='black' fontSize='md'>
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
                <Tooltip label="Menu" placement="right" hasArrow bg='gray.300' color='black' fontSize='md'>
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
        isOpen={isOpen}
        initialFocusRef={null}
        onClose={() => {
          onClose();
          if (isDesktop) {
            window.scrollTo(0, 0);
          }
        }}
      >   
          <DrawerContent>
            <DrawerHeader>
              <Flex justify="space-between" align="center">
              <Text fontSize="16px" fontWeight="semibold" as={NavLink} to="/">
                    <IconButton
                      aria-label="Home"
                      icon={<FaArrowLeft />}
                      mr={2}
                    />
                 Back To Home
                </Text>
              <Tooltip label="Close" placement="bottom" hasArrow bg='gray.300' color='black' fontSize='md'>
                <IconButton
                  aria-label="Close"
                  icon={<CloseIcon />}
                  onClick={onClose}
                />
                </Tooltip>
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <VStack spacing={12} align="flex-start" pt={12}>
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

                <Text as={NavLink} to="/dashboard/student/enrolled-classes">
                    <IconButton
                      aria-label="My Enrolled Classes"
                      icon={<FaLaptop />}
                      mr={5}
                    />
                  My Enrolled Classes
                </Text>
                <Text as={NavLink} to="/dashboard/student/payment-history">
                    <IconButton
                      aria-label="Payment History"
                      icon={<FaCartPlus />}
                      mr={5}
                    />
                  Payment History
                </Text>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Outlet></Outlet>
      </div>
    );
  };
  
  export default Dashboard;
  