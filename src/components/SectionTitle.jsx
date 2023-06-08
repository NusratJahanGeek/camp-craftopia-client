import { Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import Arrow from "../../src/assets/arrow.svg";

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
      <Text
        mt={-4}
        fontSize={headingFontSize}
        fontFamily="heading"
        fontWeight="bold"
      >
        {heading}
      </Text>
    </div>
  );
};

export default SectionTitle;
