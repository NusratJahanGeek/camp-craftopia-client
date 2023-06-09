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
    Menu,
    MenuList,
    MenuItem,
    Avatar,
    Wrap,
    WrapItem,
    AvatarBadge,
    Center,
    IconButton,
    Tooltip,
    VStack, // Add this import
  } from "@chakra-ui/react";
  import { Link } from "react-router-dom";
  import { HamburgerIcon } from "@chakra-ui/icons";
  import { AiOutlineUser } from "react-icons/ai";
  import { useContext } from "react";
  import { AuthContext } from "../providers/AuthProvider";
import { FaHome } from "react-icons/fa";
  
  const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const isDesktop = useBreakpointValue({ base: false, md: true });
    const mxValue = useBreakpointValue({ base: 0, lg: 84 });
  
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
            <Text as={Link} to="/login" mx={5}>
              Login
            </Text>
          </>
        )}
      </Flex>
    );
  
    return (
      <div>
        <Flex bg="#FFD9EC" color="#000" py={4} justify="space-between" px={4}>
          {isDesktop ? (
            <>
              <Flex mr={4}>
                <Tooltip label="Menu" placement="left" hasArrow>
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
              <Box>{topMenu}</Box>
              <Flex ml={4}>
                <Tooltip label="Menu" placement="right" hasArrow>
                  <IconButton
                    aria-label="Menu"
                    icon={<HamburgerIcon />}
                    onClick={onOpen}
                  />
                </Tooltip>
              </Flex>
            </>
          )}
        </Flex>
  
        <Drawer
          placement="left"
          onClose={onClose}
          isOpen={isOpen}
          initialFocusRef={null}
        >
          <DrawerContent>
            <DrawerBody>
              <VStack spacing={4} align="flex-start" pt={4} px={4}>
                <Text as={Link} to="/">
                <Tooltip label="Home" placement="right" hasArrow>
                          <IconButton
                            aria-label="Home"
                            icon={<FaHome />}
                            mr={2}
                          />
                        </Tooltip>
                     
                </Text>
                <Text as={Link} to="/about">
                  About
                </Text>
                

                <Text as={Link} to="/instructors">
                  Instructors
                </Text>
                <Text as={Link} to="/classes">
                  Classes
                </Text>
                <Text as={Link} to="/dashboard">
                  Dashboard
                </Text>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    );
  };
  
  export default Dashboard;
  