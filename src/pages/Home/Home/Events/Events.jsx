import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flex, Heading, Button, Box, useColorMode, Text } from "@chakra-ui/react";
import SectionTitle from "../../../../components/SectionTitle";
import colorSplash from "../../../../assets/ColorSplash.jpg"
import backgroundDark from "../../../../assets/backgroundDark.png"

const Events = () => {
  const [selectedId, setSelectedId] = useState(null);

  const { colorMode } = useColorMode();

  const eventColor = colorMode === "dark" ? "#2D3748" : "white";
  const bgSplash = colorMode === "light" ? colorSplash : backgroundDark;

  const items = [
    {
      id: 1,
      title: "Summer Adventure Camp",
      description: "Join us for an unforgettable Summer Adventure Camp! Explore the great outdoors, learn survival skills, and make new friends. Get ready for thrilling activities like hiking, canoeing, and campfire storytelling. Don't miss out on this incredible opportunity to create lifelong memories in the heart of nature!",
    },
    {
      id: 2,
      title: "Wilderness Exploration Expedition",
      description: "Embark on a thrilling Wilderness Exploration Expedition! Venture deep into the untamed wilderness, discover hidden trails, and encounter fascinating wildlife. Learn essential navigation techniques and survival strategies from our experienced guides. Get ready to conquer the great outdoors and experience the awe-inspiring beauty of nature!",
    },
    {
      id: 3,
      title: "Summer Fun Carnival Camp",
      description: "Step right up and join us for a Summer Fun Carnival! Experience a day filled with exciting games, thrilling rides, and delicious treats. Test your skills at the ring toss, hop on the Ferris wheel for breathtaking views, and indulge in mouthwatering cotton candy. Bring your family and friends for a joyous celebration of summer!",
    },
  ];

  const handleItemClick = (itemId) => {
    setSelectedId(itemId === selectedId ? null : itemId);
  };

  return (  
    <Box backgroundSize="cover" backgroundImage={`url(${bgSplash})`}  pt={12} pb={24} mt={24} px={4} borderRadius="500px 500px 0 0">
      <SectionTitle heading="Upcoming Events" subHeading="Let's Create Incredible Summer Memories Together!" />
      <Flex align="center" justify="center" flexWrap="wrap">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layoutId={item.id}
            onClick={() => handleItemClick(item.id)}
          >
            <Box
              p={8}
              mx={4}
              mb={4}
              borderWidth={1}
              borderRadius="md"
              cursor="pointer"
              textAlign="center"
              backgroundColor={eventColor}
              flex="1 0 300px"
              maxWidth="300px"
            >
              <Text fontSize="xl" padding={2}>{item.title}</Text>
              <Button fontSize="sm" mt={2}>See Details</Button>
            </Box>
          </motion.div>
        ))}

        <AnimatePresence>
          {selectedId && (
            <motion.div layoutId={selectedId}>
              <Box
                p={8}
                mx={4}
                mb={4}
                borderWidth={2}
                borderRadius="md"
                cursor="pointer"
                textAlign="center"
                backgroundColor={eventColor}
                flex="1 0 300px"
                maxWidth="500px"
              >
                <Heading as="h3" pb={4}>{items[selectedId - 1].title}</Heading>
                <p>{items[selectedId - 1].description}</p>
                <Button mt={8} onClick={() => handleItemClick(selectedId)}>Close</Button>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Flex>
    </Box>
  );
};

export default Events;
