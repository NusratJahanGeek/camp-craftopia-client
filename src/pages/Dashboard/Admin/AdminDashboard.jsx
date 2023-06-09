import { Box, Text, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import DashboardBackground from "../../../assets/DashboardBackground.png";
import { Helmet } from "react-helmet-async";

const AdminDashboard = () => {
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
        <title>Camp Craftopia | Dashboard</title>
      </Helmet>
      <Text fontSize="4xl" fontWeight="bold" mb={4}>
        Welcome to Camp Craftopia!
      </Text>
      <Text fontSize="xl" paddingTop={4} lineHeight={8} paddingX={paddingXValue}>
        Explore and learn from our talented camp counselors. Check out the lessons they offer and start your adventure today!
      </Text>
    </Box>
    );
};

export default AdminDashboard;