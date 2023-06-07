import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import TopClass from "../../Shared/TopClass/TopClass";
import { Box, SimpleGrid } from "@chakra-ui/react";

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("classes.json")
      .then((res) => res.json())
      .then((data) => {
        const sortedClasses = data.sort(
          (a, b) => b.totalStudents - a.totalStudents
        );
        const topClasses = sortedClasses.slice(0, 6);
        setClasses(topClasses);
      });
  }, []);

  return (
    <div className="px-20 mb-10">
      <SectionTitle
        heading={"Experience Thrilling Camp Activities"}
        subHeading={"Embark on an Epic Adventure with Our Popular Classes"}
      />
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}> 
  {classes.map((classData) => (
   
      <TopClass key={classData._id} classData={classData} />
  
  ))}
</SimpleGrid>


    </div>
  );
};

export default PopularClasses;
