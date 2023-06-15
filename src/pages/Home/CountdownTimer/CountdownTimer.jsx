import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import { Flex, Text, useColorMode } from "@chakra-ui/react";
import SectionTitle from "../../../components/SectionTitle";
import "./CountdownTimer.css";

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState(null);

  const { colorMode } = useColorMode();
  const bgColor = colorMode === "dark" ? "#2D3748" : "#fff";
  

  useEffect(() => {
    const targetDate = moment().add(7, "days"); // Set the target date for the countdown
    const interval = setInterval(() => {
      const now = moment();
      const diff = moment.duration(targetDate.diff(now));

      if (diff.asSeconds() <= 0) {
        // Countdown has ended
        clearInterval(interval);
      } else {
        const days = diff.days();
        const hours = diff.hours();
        const minutes = diff.minutes();
        const seconds = diff.seconds();

        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const countdownVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
  };

  return (
    <div className="px-2">
      <SectionTitle heading="Summer Special Discount" subHeading="Get 10% off on all camp registrations this summer!" />
      <Text textAlign="center">For a Limited Time Only</Text>
      <Flex justifyContent="center" alignItems="center" py={4}>
        <AnimatePresence>
          {countdown && (
            <motion.div
              className="countdown-timer"
              variants={countdownVariants}
              initial="initial"
              animate="animate"
              exit="initial"
            >
              <Flex justifyContent="center" alignItems="center" gap={4} p={4} boxShadow="xl" bg={bgColor}>
                <div>
                  <span className="countdown-value">{countdown.days}</span> days
                </div>
                <div>
                  <span className="countdown-value">{countdown.hours}</span> hours
                </div>
                <div>
                  <span className="countdown-value">{countdown.minutes}</span> minutes
                </div>
                <div>
                  <span className="countdown-value">{countdown.seconds}</span> seconds
                </div>
              </Flex>
            </motion.div>
          )}
        </AnimatePresence>
      </Flex>
    </div>
  );
};

export default CountdownTimer;
