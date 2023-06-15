import { Box, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text, useBreakpointValue, useColorMode, useDisclosure } from "@chakra-ui/react";
import backgroundLight from "../../../assets/DashboardBackground.png";
import backgroundDark from "../../../assets/backgroundDark.png";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    }
  });

  const { isOpen } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const paddingXValue = useBreakpointValue({ base: 4, md: isOpen ? 8 : 20 });

  const { colorMode } = useColorMode();
  const DashboardBackground = colorMode === "light" ? backgroundLight : backgroundDark;

  const background = colorMode === "light" ? "#fff" : "#2d3748";

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      pl={isOpen ? (isDesktop ? "250px" : "0") : "0"}
      transition="padding-left 0.3s ease"
      textAlign="center"
      backgroundImage={`url(${DashboardBackground})`}
      backgroundSize="cover"
      minHeight="100vh"
    >
      <Helmet>
        <title>Camp Craftopia | Dashboard</title>
      </Helmet>
      <Text fontSize={{ base: "2xl", md: "5xl" }} fontWeight="bold" mb={4}>
        Welcome back, {user.displayName}!
      </Text>
      <Text fontSize={{ base: "lg", md: "2xl" }} paddingTop={2} lineHeight="tall" paddingX={paddingXValue}>
        Here are your stats as of today.
      </Text>
      <StatGroup mt={8}>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          <Box margin={2}>
            <Stat backgroundColor={background} px={4} py={2} borderRadius={8}>
              <StatLabel fontSize={{ base: "md", md: 18 }}>Revenue</StatLabel>
              <StatNumber>${stats.revenue}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                12%
              </StatHelpText>
            </Stat>
          </Box>
          <Box margin={2}>
            <Stat backgroundColor={background} px={4} py={2} borderRadius={8}>
              <StatLabel fontSize={{ base: "md", md: 18 }}>Purchases</StatLabel>
              <StatNumber>{stats.purchases}</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                2%
              </StatHelpText>
            </Stat>
          </Box>
        </Box>

        <Box display="flex" flexWrap="wrap" justifyContent="center">
          <Box margin={2}>
            <Stat backgroundColor={background} px={4} py={2} borderRadius={8}>
              <StatLabel fontSize={{ base: "md", md: 18 }}>&nbsp;&nbsp;Users&nbsp;&nbsp;</StatLabel>
              <StatNumber>&nbsp;&nbsp;{stats.users}&nbsp;&nbsp;</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                4%
              </StatHelpText>
            </Stat>
          </Box>
          <Box margin={2}>
            <Stat backgroundColor={background} px={4} py={2} borderRadius={8}>
              <StatLabel fontSize={{ base: "md", md: 18 }}>&nbsp;&nbsp;Classes&nbsp;&nbsp;</StatLabel>
              <StatNumber>&nbsp;{stats.classes}&nbsp;</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                8%
              </StatHelpText>
            </Stat>
          </Box>
        </Box>
      </StatGroup>
    </Box>
  );
};

export default AdminDashboard;
