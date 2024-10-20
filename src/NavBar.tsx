import {
    Box,
    Flex,
    IconButton,
    Link,
    Stack,
    Text,
    Tooltip,
    useColorMode,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react";
import {useRef} from "react";
import {IoLogoGithub, IoMoon, IoSettings, IoSunny} from "react-icons/io5";
import {Currency} from "./currency.ts";
import SettingsDrawer from "./SettingsDrawer.tsx";

type NavBarProps = {
    initialCurrency: Currency;
    customCurrency: string | null;
    setCustomCurrency: (updatedCurrency: string | null) => void;
};

function NavBar({ initialCurrency, customCurrency, setCustomCurrency }: NavBarProps) {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
    const settingsButtonRef = useRef(null);

    return (
        <>
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
                            <Tooltip label="Settings" hasArrow>
                                <IconButton
                                    variant={colorMode === "light" ? "solid" : "ghost"}
                                    icon={<IoSettings />}
                                    aria-label="Settings"
                                    onClick={onDrawerOpen}
                                    ref={settingsButtonRef}
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
                                    aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
                                    onClick={toggleColorMode}
                                />
                            </Tooltip>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>

            <SettingsDrawer
                isOpen={isDrawerOpen}
                onClose={onDrawerClose}
                buttonRef={settingsButtonRef}
                initialCurrency={initialCurrency}
                customCurrency={customCurrency}
                setCustomCurrency={setCustomCurrency}
            />
        </>
    );
}

export default NavBar;
