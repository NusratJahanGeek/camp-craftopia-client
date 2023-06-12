import { useEffect, useState } from "react";
import TopClass from "./TopClass";
import { SimpleGrid } from "@chakra-ui/react";
import SectionTitle from "../../../components/SectionTitle";

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await fetch("http://localhost:5000/classes");
      const data = await response.json();
      const approvedClasses = data.filter((classData) => classData.status === "Approved");
      setClasses(approvedClasses);
    };

    fetchClasses();
  }, []);

  const sortedClasses = classes.sort((a, b) => b.totalStudents - a.totalStudents);
  const topClasses = sortedClasses.slice(0, 6);

  return (
    <div className="px-4 mb-10 z-999">
      <SectionTitle
        heading={"Experience Thrilling Camp Activities"}
        subHeading={"Embark on an Epic Adventure with Our Popular Classes"}
      /> 
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        {topClasses.map((classData) => (
          <TopClass key={classData._id} classData={classData} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default PopularClasses;
