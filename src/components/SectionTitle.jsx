import { Flex, Text } from "@chakra-ui/react";
import Arrow from "../../src/assets/arrow.svg";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="my-12 text-center space-y-2 pt-16">
      <Flex justify="center" gap={2}>
        <Text fontSize="lg" fontWeight="bold">
          {subHeading}
        </Text>
        <img
          src={Arrow}
          style={{
            width: "30px",
            height: "auto",
          }}
          alt=""
        />
      </Flex>
      <Text mt={-4} ml={-12} fontSize="5xl" fontFamily="heading" fontWeight="bold">
        {heading}
      </Text>
    </div>
  );
};

export default SectionTitle;
