import { Box, Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import backgroundLight from "../../assets/DashboardBackground.png"
import backgroundDark from "../../assets/backgroundDark.png"
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const NotFound = () => {
    const { colorMode } = useColorMode();
    const DashboardBackground = colorMode === "light" ? backgroundLight : backgroundDark;

    return (
     
      
        <Box
      display="flex"   
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      backgroundImage={`url(${DashboardBackground})`}
      backgroundSize="cover"
      height="100vh"
    >
      <Helmet>
        <title>Camp Craftopia | Not Found</title>
      </Helmet>
      
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            h="100%"
          >
            
            <motion.div
      className="box"
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"]
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1
      }}><Text fontSize="3xl" fontWeight="bold" mb={4}>
      Page Not Found!
    </Text>
   
    </motion.div>
    <Text fontSize="xl" mb={6}>
              The Page You're Trying To Search For Doesn't Exist.
            </Text>
            
    <Link to="/">
              <Button fontSize="lg" textTransform="uppercase">
                Go To Home
              </Button>
            
            </Link>
          </Flex>
        </Box>

 
    );
};

export default NotFound;