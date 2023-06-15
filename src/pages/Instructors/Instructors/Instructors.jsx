import { Helmet } from "react-helmet-async";
import { Heading, Text, useColorMode, Box, useBreakpointValue } from "@chakra-ui/react";
import Banner from "../../Shared/Banner/Banner";
import useInstructorData from "../../../hooks/useInstructorData";
import backgroundLight from "../../../assets/DashboardBackground.png";
import backgroundDark from "../../../assets/backgroundDark.png"

const Instructors = () => {

  const instructorData = useInstructorData();

  const { colorMode } = useColorMode();
  const background = colorMode === "light" ? backgroundLight : backgroundDark;

  const backgroundColor = colorMode === "dark" ? "#2D3748" : "#FFF";
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <div>
      <Helmet>
        <title>Camp Craftopia | Instructors</title>
      </Helmet>
      <Banner title="Our Expert Instructors" />
      <div
  style={{
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    paddingTop: "50px"
  }}
>
  <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))" justifyItems="center" gap={8} p={isMobile ? 0 : 12}>
    {instructorData.map((instructor) => (
      <Box
        key={instructor._id}
        bg={backgroundColor}
        borderRadius={isMobile ? "lg" : "xl"}
        p={isMobile ? 4 : 6}
        mt={isMobile ? 4 : 6}
        alignItems="center"
        textAlign="center"
      >
        <Box
          width={isMobile ? 48 : 64}
          height={isMobile ? 48 : 64}
          borderRadius="full"
          overflow="hidden"
          mb={4}
          mx="auto"
        >
          <img
            src={instructor.image}
            alt={instructor.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Box>
        <Heading fontSize={ { base: "3xl", md: "5xl" }} py={4}>{instructor.name}</Heading>
        <Text fontSize={ {base: "md", md: "lg"} }>Email: {instructor.email}</Text>
        <Text fontSize={ {base: "md", md: "lg"} } py={2}>Total Classes: {instructor.totalClasses}</Text>
        <Box display="flex" flexDirection="column" gap={2} mt={2} alignItems="center">
          {instructor.classes.map((className, index) => (
            <Box
              key={className}
              bg="gray.200"
              color="gray.600"
              borderRadius="full"
              p={2}
              mb={3}
              mt={index > 0 ? -2 : 0}
              fontSize={isMobile ? "sm" : undefined}
            >
              {index + 1}. {className}
            </Box>
          ))}
        </Box>
      </Box>
    ))}
  </Box>
</div>


    </div>
  );
};

export default Instructors;
