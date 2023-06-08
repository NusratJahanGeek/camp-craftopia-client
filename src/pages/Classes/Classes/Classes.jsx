import { Helmet } from "react-helmet-async"
import Banner from "../../Shared/Banner/Banner";
import bannerImg from "../../../assets/Banner2.jpg";
import { Button, Card, Heading, Text } from "@chakra-ui/react";
import useClasses from "../../../hooks/useClasses";

const Classes = () => {
    const [classes] = useClasses();

    return (
        <div>
            <Helmet>
        <title>Camp Craftopia | Classes</title>
      </Helmet>
      <Banner image={bannerImg} title="Our Arts & Crafts Classes"></Banner>
      <div className="grid md:grid-cols-3 gap-6 p-12">
        {classes.map((classData) => (
         
             <Card className="grid md:grid-cols-2 items-center justify-center" key={classData._id}>
            <div style={{ borderRadius: "0 100px 0 100px", overflow: "hidden" }}>
              <img src={classData.image} alt={classData.name} />
            </div>
            <div className="space-y-3 text-center p-8">
              <Heading>{classData.name}</Heading>
              <Text fontSize="lg">Instructor: {classData.instructor}</Text>
              <Text fontSize="lg">Price: ${classData.price}</Text>
             <div className="flex gap-4">
             <Text fontSize="lg">Available Seats: {classData.availableSeats}</Text>
             <Text fontSize="lg">|</Text>
              <Text fontSize="lg">Total Students: {classData.totalStudents}</Text>
             </div>
              <Button>Select Class</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
    );
};

export default Classes;