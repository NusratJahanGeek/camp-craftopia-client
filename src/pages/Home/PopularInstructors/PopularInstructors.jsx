import { Button, SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import SectionTitle from "../../../components/SectionTitle";
import TopInstructors from "../../Shared/TopInstructors/TopInstructors";
import { useEffect, useState } from "react";
import useInstructorData from "../../../hooks/useInstructorData";

const PopularInstructors = () => {
  const instructorData = useInstructorData();
  const [topInstructors, setTopInstructors] = useState([]);
  const [isDesktop] = useMediaQuery("(min-width: 768px)");

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
          backgroundColor: "#FFD9EC",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "0 40px 40px",
          borderRadius: "150px 150px 20px 20px",
        }}
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
          <Button size="lg" padding={4} marginTop={8} width="100%">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopularInstructors;
