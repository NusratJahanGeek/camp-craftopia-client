import { Heading } from "@chakra-ui/react";

const Banner = ({ image, title }) => {
  return (
    <div className="banner-slider-container" style={{ height: "500px" }}>
      <div className="banner-slide">
        <div style={{ position: "relative" }}>
          <img src={image} alt="Banner 1" />
          <div className="color-overlay">
            <div className="text-overlay">
              <Heading as="h1" size="4xl" mb={8}>
                {title}
              </Heading>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
