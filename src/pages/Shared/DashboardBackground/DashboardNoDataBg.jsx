import { Box, Button, Flex, Text, useBreakpointValue, useColorMode, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import backgroundLight from "../../../assets/DashboardBackground.png";
import backgroundDark from "../../../assets/backgroundDark.png";

const DashboardNoDataBg = ( {title, subTitle, CTA} ) => {
    const { isOpen } = useDisclosure();
    const isDesktop = useBreakpointValue({ base: false, lg: true });

    
    const { colorMode } = useColorMode();
    const DashboardBackground = colorMode === "light" ? backgroundLight : backgroundDark;


    return (
        <Box
          pt={150}
          pb={20}
          pl={isDesktop && isOpen ? '250px' : 0}
          transition="padding-left 0.3s ease"
          textAlign="center"
          backgroundImage={`url(${DashboardBackground})`}
          backgroundSize="cover"
          height="100vh"
        >
          <Flex flexDirection="column" alignItems="center" justifyContent="center" h="100%">
            <Text fontSize="3xl" fontWeight="bold" mb={4}>
              {title}
            </Text>
            <Text fontSize="xl" mb={6}>
              {subTitle}
            </Text>
            <Link to="/classes">
              <Button fontSize="lg" textTransform="uppercase">
                {CTA}
              </Button>
            </Link>
          </Flex>
        </Box>
    );
};

export default DashboardNoDataBg;