import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../../../assets/Camp Craftopia.png"

const NavBar = () => {

    return (
        <Box align="center" my={2}>
      <img src={logo} width={100} alt="" />
      <Flex
        bg="#FFD9EC"
        color="#000"
        px={28}
        mx={80}
        py={4}
        my={3}
        rounded="2xl"
        align="center"
        justify="center" // Center the items horizontally
      >
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
      </Flex>
    </Box>
    );
};

export default NavBar;