import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <hr style={{ borderColor: "#FFD9EC", opacity: 1, borderWidth: "2px" }} />
      <Box bg="#FFFFFF" color="#000" py={4}>
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
              <Link
                href="https://www.facebook.com/"
                target="_blank"
                style={{ marginRight: "8px" }}
              >
                <FaFacebook />
              </Link>
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                style={{ marginRight: "8px" }}
              >
                <FaInstagram />
              </Link>
              <Link href="https://linkedin.com/" target="_blank">
                <FaLinkedin />
              </Link>
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
      <Box align="center" mt={8}>
        <Text>
          &copy; {new Date().getFullYear()} Camp Craftopia
        </Text>
      </Box>
    </>
  );
};

export default Footer;
