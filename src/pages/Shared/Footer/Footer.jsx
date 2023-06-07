import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <hr style={{ borderColor: "#FFD9EC", opacity: 1, borderWidth: "2px" }} />
      <Box bg="#FFFFFF" color="#000" py={20}>
        <Grid
          templateColumns="1fr 1fr 1fr"
          gap={6}
          alignItems="start"
          justifyItems="center"
          px={20}
        >
          <Box>
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
          <Box style={{ lineHeight: "28px" }}>
            <Text fontSize="lg" fontWeight="bold" marginBottom="6px">
              Company
            </Text>
            <p>About Us</p>
            <p>Terms of Use</p>
            <p>Privacy Policy</p>
          </Box>
          <Box style={{ lineHeight: "28px" }}>
          <Text fontSize="lg" fontWeight="bold" marginBottom="6px">
              Support
            </Text>
            <p>FAQ</p>
            <p>Quick Chat</p>
            <p>Business</p>
          </Box>
        </Grid>
      </Box>
      <Box align="center">
        <Text>
          &copy; {new Date().getFullYear()} Camp Craftopia
        </Text>
      </Box>
    </>
  );
};

export default Footer;
