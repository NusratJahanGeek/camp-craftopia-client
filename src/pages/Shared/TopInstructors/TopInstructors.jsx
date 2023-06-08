import { Card, Heading, Image, Stack, Text } from "@chakra-ui/react";

const TopInstructors = ({ instructorsData }) => {
  const { name, image, totalClasses } = instructorsData;

  return (
    <Card boxShadow="md" borderRadius="lg" width="100%">
      <Stack direction="row" alignItems="center" justifyContent="start" spacing={4} p={4}>
        <div style={{ width: "150px", height: "150px", borderRadius: "50%", overflow: "hidden" }}>
          <Image
            objectFit="cover"
            src={image}
            alt="Instructor Details"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="space-y-2">
          <Heading fontSize="25px">{name}</Heading>
          <Text>Total Classes: {totalClasses}</Text>
        </div>
      </Stack>
    </Card>
  );
};

export default TopInstructors;
