import { Button, Card, CardBody, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";

const TopInstructors = ({ instructorsData }) => {
  const { name, image, email, totalClasses, totalStudents } = instructorsData;

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
          <Text py="2">Email: {email}</Text>
          <Text py="2">Total Classes: {totalClasses}</Text>
          <Text py="2">Total Students: {totalStudents}</Text>
          <Button>
            View Details
          </Button>
          </div>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default TopInstructors;
