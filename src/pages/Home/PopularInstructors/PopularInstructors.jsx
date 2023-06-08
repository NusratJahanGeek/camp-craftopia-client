import { SimpleGrid } from "@chakra-ui/react";
import SectionTitle from "../../../components/SectionTitle";
import useInstructors from "../../../hooks/useInstructors";
import TopInstructors from "../../Shared/TopInstructors/TopInstructors";
import useClasses from "../../../hooks/useClasses";
import { useEffect, useState } from "react";

const PopularInstructors = () => {
    const [instructors] = useInstructors();
    const [classes] = useClasses();
    const [topInstructors, setTopInstructors] = useState([]);

    useEffect(() => {
        if(instructors.length > 0 && classes.length > 0){
            const combinedData = instructors.map((instructor) => {
                const {_id, name, image, email} = instructor;
                const instructorClasses = classes.filter((classData) => classData.instructor === name);
                const totalStudents = instructorClasses.reduce(
                    (sum, classData) => sum + classData.totalStudents, 0
                    );
                return {_id, name, image, email, totalClasses: instructorClasses.length, totalStudents};
            });
            const sortedData = combinedData.sort(
                (a, b) => b.totalStudents - a.totalStudents
              );
              const topInstructors = sortedData.slice(0, 6);
              setTopInstructors(topInstructors)
        }
    }, [instructors, classes])

    
      
    return (
        <div className="px-20 mb-10">
        <SectionTitle
          heading={"Meet Our Expert Instructors"}
          subHeading={"Learn from the Best in the Field"}
        />
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}> 
  {topInstructors.map((instructorsData) => (
   
      <TopInstructors key={instructorsData._id} instructorsData={instructorsData} />
  
  ))}
</SimpleGrid> 
        </div>
    );
};

export default PopularInstructors;