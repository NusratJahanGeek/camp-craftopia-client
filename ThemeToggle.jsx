import { useColorMode, IconButton, Tooltip } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  const tooltipLabel = isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";

  return (
    <Tooltip label={tooltipLabel} hasArrow bg="gray.300" color="black" fontSize="md" placement="bottom">
      <IconButton
        icon={isDarkMode ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
        variant="ghost"
        size="md"
      />
    </Tooltip>
  );
};

export default ThemeToggle;
