import { Box, Center, Flex, IconButton, Menu, MenuButton, MenuList, MenuItem, Text, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import logo from "../../../assets/Camp Craftopia.png";

const NavBar = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true }); 
  const mxValue = useBreakpointValue({ base: 0, lg: 84 });

  const navOptions = (
    <Center fontSize="lg">
      <Text as={Link} to="/">
        Home
      </Text>
      <Text as={Link} to="/about" mx={5}>
        About
      </Text>
      <Text as={Link} to="/instructors" mx={5}>
        Instructors
      </Text>
      <Text as={Link} to="/classes" mx={5}>
        Classes
      </Text>
      <Text as={Link} to="/dashboard" mx={5}>
        Dashboard
      </Text>
      <Text as={Link} to="/login" mx={5}>
        Login
      </Text>
    </Center>
  );

  return (
    <Box align="center" mt={2}>
      <img src={logo} width={100} alt="" />
      {isDesktop ? (
        <Flex
          position="relative"
          bg="#FFD9EC"
          color="#000"
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
          zIndex={999} // Set a higher z-index value
        >
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon _hover={{ color: "#FF6B6B"}} />}
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
