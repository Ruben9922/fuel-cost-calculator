import {Box, Flex, IconButton, Link, Stack, Text, Tooltip, useColorMode, useColorModeValue} from "@chakra-ui/react";
import {IoLogoGithub, IoMoon, IoSunny} from "react-icons/io5";

function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box alignSelf="stretch" bg={useColorModeValue("gray.100", "gray.900")} px={6}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Text /*color="whiteAlpha.900"*/ fontWeight="bold">Fuel Cost Calculator</Text>

                <Flex alignItems="center">
                    <Stack direction="row" spacing={2}>
                        <Tooltip label="GitHub repository" hasArrow>
                            <IconButton
                                variant={colorMode === "light" ? "solid" : "ghost"}
                                icon={<IoLogoGithub />}
                                aria-label="GitHub repository"
                                href="https://github.com/Ruben9922/fuel-cost-calculator"
                                isExternal
                                as={Link}
                            />
                        </Tooltip>
                        <Tooltip
                            label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
                            hasArrow
                            closeOnClick={false}
                        >
                            <IconButton
                                variant={colorMode === "light" ? "solid" : "ghost"}
                                icon={colorMode === "light" ? <IoMoon /> : <IoSunny/>}
                                onClick={toggleColorMode}
                                aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
                            />
                        </Tooltip>
                    </Stack>
                </Flex>
            </Flex>
        </Box>
    );
}

export default NavBar;
