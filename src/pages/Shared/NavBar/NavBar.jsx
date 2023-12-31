import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import {
  Box,
  Center,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useBreakpointValue,
  Button,
  Wrap,
  WrapItem,
  Avatar,
  AvatarBadge,
  Badge,
  useColorMode,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import logo from "../../../assets/Camp Craftopia.png";
import { AiOutlineUser } from 'react-icons/ai';
import useAdmin from "../../../hooks/useAdmin"
import useInstructorDashboard from "../../../hooks/useInstructorDashboard"
import useStudentDashboard from "../../../hooks/useStudentDashboard"
import ThemeToggle from "../../../../ThemeToggle";


const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructorDashboard();
  const [isStudent] = useStudentDashboard();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const mxValue = useBreakpointValue({ base: 0, lg: 84 });

  const { colorMode } = useColorMode();

  const bgColor = colorMode === "dark" ? "#2D3748" : "#FFD9EC";
  const textColor = colorMode === "dark" ? "#FFFFFF" : "#000";

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch(error => console.log(error));
  }
  
  const navOptions = (
    <Center fontSize="lg">
      <Text as={NavLink} to="/" mx={5}>
        Home
      </Text>
      <Text as={NavLink} to="/instructors" mx={5}>
        Instructors
      </Text>
      <Text as={NavLink} to="/classes" mx={5}>
        Classes
      </Text>
    {
      isAdmin ? <Text as={NavLink} to="/dashboard/admin" mx={5}>Dashboard</Text> : 
      isInstructor ? <Text as={NavLink} to="/dashboard/instructor" mx={5}>Dashboard</Text> : 
      isStudent? <Text as={NavLink} to="/dashboard/student" mx={5}>Dashboard</Text> : 
      null
    }
      {user ? (
        <>
            
            <Wrap marginRight={5}>
            <WrapItem>
    <Avatar size='sm'  ml={5} name={user?.displayName} src={user?.photoURL} bg='#FF6B6B' icon={<AiOutlineUser fontSize='1.5rem' />}> <AvatarBadge boxSize='1.25em' bg='green.500' />
    
    </Avatar>
    <Badge ml='-2' mt='-2' zIndex={1} colorScheme='orange'>
    {user?.displayName}
      </Badge>
  </WrapItem>
            </Wrap>
           
            <Button onClick={handleLogOut}>Log Out</Button>
        </>
      ) : (
        <>
          <Text as={NavLink} to="/login" mx={5}>
            Login
          </Text>
        </>
      )}
    </Center>
  );

  return (
    <Box align="center" mt={2}>          
       <Flex justifyContent="space-between" alignItems="start">
  <Box mx="auto">
    <img src={logo} width={100} alt="" />
  </Box>
  <ThemeToggle />
</Flex>
      {isDesktop ? (
        <Flex
          position="relative"
          bg={bgColor}
          color={textColor}
          py={4}
          mt={3}
          mb={-5}
          mx={mxValue}
          rounded="2xl"
          align="center"
          justify="center"
          zIndex={999}
        >
          {navOptions}
        </Flex>
        
      ) : (
        <Box
          position="fixed"
          top={0}
          left={0}
          bg="#FFD9EC"
          py={4}
          px={6}
          zIndex={999}
        >
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon _hover={{ color: "#FF6B6B" }} />}
              variant="outline"
            />
            <MenuList color="#FF6B6B">
              {navOptions.props.children.map((item, index) => (
                <MenuItem key={index} color="#FF6B6B">
                  {item}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default NavBar;