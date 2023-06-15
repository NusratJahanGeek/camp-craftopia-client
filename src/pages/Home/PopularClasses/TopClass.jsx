import { Button, Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const TopClass = ({ classData }) => {
  const { name, image, instructor, price, availableSeats } = classData;

  return (
    <Card overflow="hidden" borderWidth={1} borderColor="#FFD166" borderRadius="lg">
      <Stack p={4} spacing={4} flex={1} justifyContent="space-between">
        <CardBody>
          <Image
            objectFit="cover"
            src={image}
            alt="Class Lessons"
            borderRadius="full"
            mx="auto"
            mb={4}
          />
          <div className="text-center">
            <Heading size="lg">{name}</Heading>
            <Text pt="4">Instructor: {instructor}</Text>
            <Text py="2">Price: ${price}</Text>
            <Text pb="4">Available Seats: {availableSeats}</Text>
            <Link to="/classes">
            <Button>View Details</Button>
            </Link>
          </div>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default TopClass;
