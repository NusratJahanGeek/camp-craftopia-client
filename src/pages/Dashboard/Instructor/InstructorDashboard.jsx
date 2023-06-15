import { Box, Grid, Stat, StatLabel, StatNumber, Text, useBreakpointValue, useColorMode, useDisclosure } from "@chakra-ui/react";
import backgroundLight from "../../../assets/DashboardBackground.png";
import backgroundDark from "../../../assets/backgroundDark.png";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useClasses from "../../../hooks/useClasses";

const InstructorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [classes] = useClasses();
  const { isOpen } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const gridColumnTemplate = useBreakpointValue({
    base: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
  });

  const { colorMode } = useColorMode();
  const DashboardBackground = colorMode === "light" ? backgroundLight : backgroundDark;

  const background = colorMode === "light" ? "#fff" : "#2d3748";

  const paddingXValue = useBreakpointValue({ base: "0", md: isDesktop && isOpen ? "250px" : "250px", lg: isDesktop && isOpen ? "250px" : "420px" });

  const paddingYValue = useBreakpointValue({ base: "100px" });

  const heightValue = useBreakpointValue({ base: "100%", md: isDesktop ? "100vh" : "100%"});

  const instructorClasses = classes.filter((c) => c.email === user.email);

  // Calculate instructor ranking based on the number of students
  const instructorStudentCounts = {};
  classes.forEach(classData => {
    const instructorEmail = classData.email;
    const studentCount = parseInt(classData.totalStudents) || 0;
    if (instructorStudentCounts[instructorEmail]) {
      instructorStudentCounts[instructorEmail] += studentCount;
    } else {
      instructorStudentCounts[instructorEmail] = studentCount;
    }
  });

  // Find the number #1 instructor based on the highest student count
  let topInstructor = null;
  let maxStudentCount = 0;
  for (const [instructorEmail, studentCount] of Object.entries(instructorStudentCounts)) {
    if (studentCount > maxStudentCount) {
      topInstructor = instructorEmail;
      maxStudentCount = studentCount;
    }
  }

  // Get the ranking of the logged-in user
  const userRanking = Object.entries(instructorStudentCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .findIndex(([instructorEmail]) => instructorEmail === user.email) + 1;

  const stats = {
    approvedClasses: instructorClasses.filter((c) => c.status === "Approved").length,
    deniedClasses: instructorClasses.filter((c) => c.status === "Denied").length,
    pendingClasses: instructorClasses.filter((c) => c.status === "Pending").length,
    totalStudents: instructorStudentCounts[user.email] || 0,
    totalAvailableSeats: instructorClasses.reduce((total, c) => total + c.availableSeats, 0),
    instructorRank: userRanking,
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      pl={isDesktop && isOpen ? "250px" : 0}
      paddingTop={paddingYValue}
      transition="padding-left 0.3s ease"
      textAlign="center"
      backgroundImage={`url(${DashboardBackground})`}
      backgroundSize="cover"
      height={heightValue}
    >
      <Helmet>
        <title>Camp Craftopia | Dashboard</title>
      </Helmet>
      <Text fontSize="5xl" fontWeight="bold" mb={4}>
        Welcome back, {user.displayName}!
      </Text>
      <Text fontSize="2xl" paddingTop={4} lineHeight={8} paddingX={paddingXValue}>
        Here are your stats as of today.
      </Text>
      <Grid templateColumns={gridColumnTemplate} gap={4} items="center" py={12}>
        <Stat backgroundColor={background} gap="4" px={10} py={2} mx={5} borderRadius={8}>
          <StatLabel fontSize={18}>Approved Classes</StatLabel>
          <StatNumber>{stats.approvedClasses}</StatNumber>
        </Stat>

        <Stat backgroundColor={background} gap="4" px={10} py={2} mx={5} borderRadius={8}>
          <StatLabel fontSize={18}>Denied Classes</StatLabel>
          <StatNumber>{stats.deniedClasses}</StatNumber>
        </Stat>

        <Stat backgroundColor={background} gap="4" px={10} py={2} mx={5} borderRadius={8}>
          <StatLabel fontSize={18}>Pending Classes</StatLabel>
          <StatNumber>{stats.pendingClasses}</StatNumber>
        </Stat>

        <Stat backgroundColor={background} gap="4" px={10} py={2} mx={5} borderRadius={8}>
          <StatLabel fontSize={18}>Total Students</StatLabel>
          <StatNumber>{stats.totalStudents}</StatNumber>
        </Stat>

        <Stat backgroundColor={background} gap="4" px={10} py={2} mx={5} borderRadius={8}>
          <StatLabel fontSize={18}>Total Available Seats</StatLabel>
          <StatNumber>{stats.totalAvailableSeats}</StatNumber>
        </Stat>

        <Stat backgroundColor={background} gap="4" px={10} py={2} mx={5} borderRadius={8}>
          <StatLabel fontSize={18}>Instructor Ranking</StatLabel>
          <StatNumber>{stats.instructorRank}</StatNumber>
        </Stat>
      </Grid>
    </Box>
  );
};

export default InstructorDashboard;
