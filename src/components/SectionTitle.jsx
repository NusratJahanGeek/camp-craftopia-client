import { Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import Arrow from "../../src/assets/arrow.svg";
import { motion } from "framer-motion";

const SectionTitle = ({ heading, subHeading }) => {
  const headingFontSize = useBreakpointValue({ base: "4xl", md: "5xl" });

  return (
    <div className="my-8 text-center space-y-2 pt-12">
      <Flex justify="center" gap={2}>
        <Text fontSize="lg" fontWeight="bold">
          {subHeading}
        </Text>
        <img
          src={Arrow}
          style={{
            width: "50px",
            height: "auto",
          }}
          alt=""
        />
      </Flex>
      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
      <Text
        mt={-4}
        fontSize={headingFontSize}
        fontFamily="heading"
        fontWeight="bold">
        {heading}
      </Text>
      </motion.div>
    </div>
  );
};

export default SectionTitle;
