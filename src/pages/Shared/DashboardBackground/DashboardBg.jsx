import { Box, useBreakpointValue, useColorMode, useDisclosure } from '@chakra-ui/react';
import backgroundLight from "../../../assets/DashboardBackground.png";
import backgroundDark from "../../../assets/backgroundDark.png";



const DashboardBg = ({children, dataLength, applyPadding}) => {
    
const { isOpen } = useDisclosure();
const isDesktop = useBreakpointValue({ base: false, lg: true });

const { colorMode } = useColorMode();
const DashboardBackground = colorMode === "light" ? backgroundLight : backgroundDark;

const height = dataLength < 5 ? "100vh" : "100%";

    return (
        <Box
        pt={applyPadding ? 150 : 4}
        pb={20}
        pl={isDesktop && isOpen ? '250px' : 0}
        transition="padding-left 0.3s ease"
        textAlign="center"
        backgroundImage={`url(${DashboardBackground})`}
        backgroundSize="cover"
        height={height}
      >
        {children}
        </Box>
    );
};

export default DashboardBg;