import { Button, Card, CardBody, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";

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
          <Text py="2">Instructor: {instructor}</Text>
          <Flex alignItems="center" justifyContent="center" gap={3} mb={2}>
          <Text>Price: ${price}</Text>
          <Text>|</Text>
          <Text py="2">Available Seats: {availableSeats}</Text>
          </Flex>
          <Button>
            View Details
          </Button>
          </div>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default TopClass;
