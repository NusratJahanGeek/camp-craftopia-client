import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../../../assets/Camp Craftopia.png"

const Footer = () => {
    return (
        <div>
             <Box bg="gray.200" py={4} textAlign="center">
             <Link href="/" fontSize="xl" fontWeight="bold">
            <img src={logo} width={80} alt="" />
          </Link>
    </Box>
        </div>
    );
};

export default Footer;