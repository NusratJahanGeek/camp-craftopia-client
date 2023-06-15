import { Box, Flex, Grid, Text, useColorMode } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {

  const { colorMode } = useColorMode();

  const bgColor = colorMode === "dark" ? "#2D3748" : "#FFFFFF";
  const textColor = colorMode === "dark" ? "#FFFFFF" : "#000";

  return (
    <>
      <hr style={{ borderColor: "#FFD9EC", opacity: 1, borderWidth: "2px" }} />
      <Box bg={bgColor} color={textColor} py={20}>
      <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
          gap={6}
          alignItems="start"
          justifyItems="center"
        >
          <Box textAlign="center">
            <Text fontSize="3xl" fontWeight="bold" lineHeight="1.5">
              Camp Craftopia
            </Text>
            <Text fontSize="lg">Address: Dhaka, Bangladesh</Text>

            <Flex fontSize="3xl" justifyContent="center" mt={4} ml={-5}>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" style={{ marginRight: "8px" }}>
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" style={{ marginRight: "8px" }}>
                <FaInstagram />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </Flex>
          </Box>
          <Box style={{ lineHeight: "28px" }} textAlign="center">
            <Text fontSize="lg" fontWeight="bold" marginBottom="6px">
              Company
            </Text>
            <p>About Us</p>
            <p>Terms of Use</p>
            <p>Privacy Policy</p>
          </Box>
          <Box style={{ lineHeight: "28px" }} textAlign="center">
          <Text fontSize="lg" fontWeight="bold">
              Support
            </Text>
            <p>FAQ</p>
            <p>Quick Chat</p>
            <p>Business</p>
          </Box>
        </Grid>
      </Box>
      <Box align="center">
        <Text pb={8}>
          &copy; {new Date().getFullYear()} Camp Craftopia
        </Text>
      </Box>
    </>
  );
};

export default Footer;
