import { Heading, useColorMode, Box, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import "./Banner.css";

const Banner = ({ title }) => {
  const { colorMode } = useColorMode();

  const backgroundColor = colorMode === "dark" ? "#2D3748" : "#FFF";

  const headingSize = useBreakpointValue({ base: "2xl", md: "4xl" });
  const pyValue = useBreakpointValue({ base: 16, md: 24 });
  const skewValue = useBreakpointValue({ base: 0, md: "-10deg" });  
  const skewTextValue = useBreakpointValue({ base: 0, md: "10deg" });

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, bounce: 8 }}
      style={{ position: "relative" }}
    >
      <Box
        bg={backgroundColor}
        py={pyValue}
        px="auto"
        textAlign="center"
        boxShadow="120px 120px 120px rgba(255, 217, 236, 1)"
        borderWidth={4}
        borderStyle="double"
        borderColor="#FF6B6B"
        borderRadius="20px 0 20px 0"
        transform={`skewX(${skewValue})`}
        overflow="hidden"
      >
        <motion.span
          style={{
            display: "inline-block",
            position: "relative",
            animation: "zigzag 4s infinite",
          }}
        >
          <Heading
            as="h1"
            size={headingSize}
            _hover={{ color: "#FF6B6B" }}
            transform={`skewX(${skewTextValue})`}
          >
            {title}
          </Heading>
        </motion.span>
      </Box>
    </motion.div>
  );
};

export default Banner;
