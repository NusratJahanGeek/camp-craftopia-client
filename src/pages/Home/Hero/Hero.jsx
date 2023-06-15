import { Heading, Text, useColorMode, Button } from "@chakra-ui/react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import banner1 from "../../../assets/Banner1.jpg";
import banner2 from "../../../assets/Banner2.jpg";
import banner3 from "../../../assets/Banner3.jpg";
import banner4 from "../../../assets/Banner4.jpg";
import { Typewriter } from "react-simple-typewriter";
import "./Hero.css";
import { Link } from "react-router-dom";

const images = [banner4, banner3, banner2, banner1];

const Hero = () => {
  const [, setDetails] = useState(null);

  const [sliderRef] = useKeenSlider({
    loop: true,
    slideChanged: (s) => {
      setDetails(s.details());
    },
    initial: 2,
  });

  const { colorMode } = useColorMode();

  const overlayBgColor = colorMode === "dark" ? "#000000bf" : "#dededecf";
  const overlayTextColor = colorMode === "dark" ? "#FFFFFF" : "#000000";

  return (
    <div className="banner-slider-container">
      <div ref={sliderRef} className="keen-slider zoom-out">
        {images.map((src, idx) => (
          <div key={idx} className="keen-slider__slide zoom-out__slide">
            <div style={{ position: "relative" }}>
              <img src={src} alt={`Banner ${idx + 1}`} className="banner-image" />
              <div
                className="color-overlay"
                style={{ backgroundColor: overlayBgColor, color: overlayTextColor }}
              >
                <div className="text-overlay">
                  <Heading as="h1" size="4xl" mb={8} color={overlayTextColor}>
                    Discover the Art of Crafting
                  </Heading>
                  <Text
                    style={{ fontSize: "1.3rem" }}
                    fontSize={{ base: "1rem", md: "1.3rem" }}
                    color={overlayTextColor}
                  >
                    Unleash your{" "}
                    <Typewriter
                      words={[
                        "creativity with our engaging art and craft classes.",
                        "inner artist's brilliance!",
                        "crafty spirit!",
                        "imagination!",
                      ]}
                      loop={5}
                      cursor
                      cursorStyle="_"
                      typeSpeed={70}
                      deleteSpeed={50}
                      delaySpeed={1000}
                    />
                  </Text>
                  <Link to="/classes">
                  <Button
                    mt={{ base: 4, md: 8 }}
                    px={6}
                    py={4}
                    size="4xl"
                  >
                    Start Crafting Today!
                  </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
