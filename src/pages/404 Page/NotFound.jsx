import { Box, Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import backgroundLight from "../../assets/DashboardBackground.png"
import backgroundDark from "../../assets/backgroundDark.png"
import { Link } from "react-router-dom";

const NotFound = () => {
    const { colorMode } = useColorMode();
    const DashboardBackground = colorMode === "light" ? backgroundLight : backgroundDark;

    return (
        <Box
      display="flex"   
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      backgroundImage={`url(${DashboardBackground})`}
      backgroundSize="cover"
      height="100vh"
    >
      <Helmet>
        <title>Camp Craftopia | Not Found</title>
      </Helmet>
      
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            h="100%"
          >
            <Text fontSize="3xl" fontWeight="bold" mb={4}>
              Page Not Found!
            </Text>
            <Text fontSize="xl" mb={6}>
              The Page You're Trying To Search For Doesn't Exist.
            </Text>
            <Link to="/">
              <Button fontSize="lg" textTransform="uppercase">
                Go To Home
              </Button>
            </Link>
          </Flex>
        </Box>
      
    );
};

export default NotFound;