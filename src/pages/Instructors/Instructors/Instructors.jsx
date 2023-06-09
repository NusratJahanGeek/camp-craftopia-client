import { Helmet } from "react-helmet-async";
import { Heading, Text, Button } from "@chakra-ui/react";
import Banner from "../../Shared/Banner/Banner";
import bannerImg from "../../../assets/Banner1.jpg";
import useInstructorData from "../../../hooks/useInstructorData";
import background from "../../../assets/DashboardBackground.png";

const Instructors = () => {
  const instructorData = useInstructorData();

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Helmet>
        <title>Camp Craftopia | Instructors</title>
      </Helmet>
      <Banner image={bannerImg} title="Our Expert Instructors" />
      <div className="px-36 py-28">
        {instructorData.map((instructor) => (
          <div className="grid md:grid-cols-2 gap-24 items-center py-12" key={instructor._id}>
            <div style={{ borderRadius: "200px 0 200px", overflow: "hidden" }}>
              <img src={instructor.image} alt={instructor.name} />
            </div>
            <div className="space-y-3">
              <Heading fontSize="5xl">{instructor.name}</Heading>
              <Text fontSize="lg">Email: {instructor.email}</Text>
              <Text fontSize="lg">Total Classes: {instructor.totalClasses}</Text>
              <Text fontSize="lg">Total Students: {instructor.totalStudents}</Text>
              <Text fontSize="lg">Class Names:</Text>
              <ul className="list-disc ml-6">
                {instructor.classes.map((className) => (
                  <li key={className}>{className}</li>
                ))}
              </ul>
              <Button>View Details</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
