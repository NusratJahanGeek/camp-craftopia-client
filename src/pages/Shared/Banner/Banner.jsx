import { Heading, useColorMode, Box } from "@chakra-ui/react";

const Banner = ({ image, title }) => {
  const { colorMode } = useColorMode();
  const overlayBgColor = colorMode === "dark" ? "#000000bf" : "#dededecf";
  const overlayTextColor = colorMode === "dark" ? "#FFFFFF" : "#000000";

  return (
    <Box backgroundColor={overlayBgColor}>
      <div className="banner-slider-container" style={{ height: "500px" }}>
        <div className="banner-slide">
          <div style={{ position: "relative", color: overlayTextColor }}>
            <img src={image} alt="Banner 1" />
            <div className="color-overlay">
              <div className="text-overlay">
                <Heading
                  as="h1"
                  size="4xl"
                  mb={8}
                  _hover={{ color: "coral" }}
                  color={overlayTextColor}
                >
                  <span style={{ position: "relative", zIndex: "1" }}>{title}</span>
                </Heading>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Banner;
