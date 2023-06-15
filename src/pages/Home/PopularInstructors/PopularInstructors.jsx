import { Button, SimpleGrid, useColorMode, useMediaQuery } from "@chakra-ui/react";
import SectionTitle from "../../../components/SectionTitle";
import TopInstructors from "./TopInstructors";
import { useEffect, useState } from "react";
import useInstructorData from "../../../hooks/useInstructorData";
import { motion } from "framer-motion"
import { Link } from "react-router-dom";

const PopularInstructors = () => {
  const instructorData = useInstructorData();
  const [topInstructors, setTopInstructors] = useState([]);
  const [isDesktop] = useMediaQuery("(min-width: 768px)");

  const { colorMode } = useColorMode();

  const backgroundColor = colorMode === "dark" ? "#2D3748" : "#FFD9EC";

  useEffect(() => {
    if (instructorData.length > 0) {
      const sortedData = instructorData.sort(
        (a, b) => b.totalStudents - a.totalStudents
      );
      const topInstructors = sortedData.slice(0, 6);
      setTopInstructors(topInstructors);
    }
  }, [instructorData]);

  return (
    <div
      style={{
        margin: isDesktop ? "50px" : 0
      }}
    >
      <div
        style={{
          backgroundColor,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          padding: isDesktop ? "0 40px 40px" : "0 0 40px" ,
          borderRadius: isDesktop ? "150px 150px 20px 20px" : "20px",
        }}
      >
        <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
        <SectionTitle
          heading={"Meet Our Expert Instructors"}
          subHeading={"Learn from the Best in the Field"}
        />
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} padding={2}>
          {topInstructors.map((instructorData) => (
            <TopInstructors
              key={instructorData._id}
              instructorsData={instructorData}
            />
          ))}
        </SimpleGrid>
        <div style={{ margin: "auto", maxWidth: "300px", width: "100%" }}>
          <Link to="/instructors">
          <Button size="lg" padding={4} marginTop={8} width="100%">
            See All
          </Button>
          </Link>
        </div>
     
        </motion.div>
      </div>
  
    </div>
  );
};

export default PopularInstructors;
