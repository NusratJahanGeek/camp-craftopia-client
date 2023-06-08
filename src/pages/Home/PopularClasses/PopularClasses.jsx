import SectionTitle from "../../../components/SectionTitle";
import TopClass from "../../Shared/TopClass/TopClass";
import { SimpleGrid } from "@chakra-ui/react";
import useClasses from "../../../hooks/useClasses";

const PopularClasses = () => {
    const [classes] = useClasses();
    const sortedClasses = classes.sort(
        (a, b) => b.totalStudents - a.totalStudents
      );
      const topClasses = sortedClasses.slice(0, 6);

  return (
    <div className="px-20 mb-10">
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
