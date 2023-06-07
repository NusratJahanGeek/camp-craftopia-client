import { Heading, Text } from "@chakra-ui/react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import banner1 from "../../../assets/Banner1.jpg";
import banner2 from "../../../assets/Banner2.jpg";
import banner3 from "../../../assets/Banner3.jpg";
import banner4 from "../../../assets/Banner4.jpg";
import { Typewriter } from 'react-simple-typewriter';
import "./Hero.css";

const images = [banner1, banner2, banner3, banner4];

const Hero = () => {
  const [details, setDetails] = useState(null);

  const [sliderRef] = useKeenSlider({
    loop: true,
    slideChanged: (s) => {
      setDetails(s.details());
    },
    initial: 2,
  });

  const handleType = (count) => {
    // access word count number
    console.log(count);
  };

  const handleDone = () => {
    console.log(`Done after 5 loops!`);
  };

  function scaleStyle(idx) {
    if (!details) return {};
    const slide = details.slides[idx];
    const scale_size = 0.7;
    const scale = 1 - (scale_size - scale_size * slide.portion);
    return {
      transform: `scale(${scale})`,
      WebkitTransform: `scale(${scale})`,
    };
  }

  return (
    <div className="banner-slider-container">
      <div ref={sliderRef} className="keen-slider zoom-out">
        {images.map((src, idx) => (
          <div key={idx} className="keen-slider__slide zoom-out__slide">
            <div style={{ position: "relative" }}>
              <img src={src} alt={`Banner ${idx + 1}`} />
              <div className="color-overlay">
                <div className="text-overlay">
                  <Heading as="h1" size="4xl" mb={8}>
                    Discover the Art of Crafting
                  </Heading>
                  <Text style={{ fontSize: "1.3rem" }}>
                    Unleash your{" "}
                    <Typewriter
                      words={[
                        "creativity with our engaging art and craft classes.",
                        "inner artist's brilliance!",
                        "crafty spirit!",
                        "imagination!"
                      ]}
                      loop={5}
                      cursor
                      cursorStyle="_"
                      typeSpeed={70}
                      deleteSpeed={50}
                      delaySpeed={1000}
                      onLoopDone={handleDone}
                      onType={handleType}
                    />
                  </Text>
                  <button className="cta-button">Join Now</button>
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
