import { Box, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import DashboardBackground from "../../../assets/DashboardBackground.png";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboard = () => {
  const {user} = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const {data: stats = {}} = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async() => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    }
  })

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
      <Text fontSize="5xl" fontWeight="bold" mb={4}>
      Welcome back, {user.displayName}!
      </Text>
      <Text fontSize="2xl" paddingTop={2} lineHeight={8} paddingX={paddingXValue}>
       Here are your stats as of today.
      </Text>
      <StatGroup mt={8}>
      <Stat backgroundColor="white" gap="4" px={10} py={2} mx={5} borderRadius={8}>
    <StatLabel fontSize={18}>Revenue</StatLabel>
    <StatNumber>{stats.revenue}</StatNumber>
    <StatHelpText>
      <StatArrow type='increase' />
      12%
    </StatHelpText>
  </Stat>

  <Stat backgroundColor="white" gap="4" px={10} py={2} mx={5} borderRadius={8}>
    <StatLabel fontSize={18}>Purchases</StatLabel>
    <StatNumber>{stats.purchases}</StatNumber>
    <StatHelpText>
      <StatArrow type='decrease' />
      2%
    </StatHelpText>
  </Stat>

  <Stat backgroundColor="white" gap="4" px={10} py={2} mx={5} borderRadius={8}>
    <StatLabel fontSize={18}>Users</StatLabel>
    <StatNumber>{stats.users}</StatNumber>
    <StatHelpText>
      <StatArrow type='increase' />
      4%
    </StatHelpText>
  </Stat>

  <Stat backgroundColor="white" gap="4" px={10} py={2} mx={5} borderRadius={8}>
    <StatLabel fontSize={18}>Classes</StatLabel>
    <StatNumber>{stats.classes}</StatNumber>
    <StatHelpText>
      <StatArrow type='increase' />
      8%
    </StatHelpText>
  </Stat>

</StatGroup>
    </Box>
    );
};

export default AdminDashboard;