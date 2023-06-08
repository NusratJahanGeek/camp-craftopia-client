import { useEffect, useState } from "react";
import useInstructors from "./useInstructors";
import useClasses from "./useClasses";

const useInstructorData = () => {
  const [instructors] = useInstructors();
  const [classes] = useClasses();
  const [instructorData, setInstructorData] = useState([]);

  useEffect(() => {
    if (instructors.length > 0 && classes.length > 0) {
      const combinedData = instructors.map((instructor) => {
        const { _id, name, image, email } = instructor;
        const instructorClasses = classes.filter(
          (classData) => classData.instructor === name
        );
        
        const totalStudents = instructorClasses.reduce(
          (sum, classData) => sum + (classData?.totalStudents || 0),
          0
        );

        return {
          _id,
          name,
          image,
          email,
          totalClasses: instructorClasses.length,
          totalStudents,
          classes: instructorClasses.map((classData) => classData.name), // Update to include class objects
        };
      });

      setInstructorData(combinedData);
    }
  }, [instructors, classes]);

  return instructorData;
};

export default useInstructorData;
