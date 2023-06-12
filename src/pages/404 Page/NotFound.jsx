import { Box, Button, Flex, Text, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import DashboardBackground from "../../assets/DashboardBackground.png"
import { Link } from "react-router-dom";

const NotFound = () => {

    const { isOpen } = useDisclosure();
    const isDesktop = useBreakpointValue({ base: false, md: true });
  
    const paddingXValue = useBreakpointValue({ base: "0", md: isDesktop && isOpen ? "250px" : "420px" });

    return (
        <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      pl={isDesktop && isOpen ? "250px" : 0}
      transition="padding-left 0.3s ease"
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