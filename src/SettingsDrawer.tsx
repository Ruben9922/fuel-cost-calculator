import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    FormHelperText,
    FormLabel,
    Select
} from "@chakra-ui/react";
import {MutableRefObject} from "react";
import {Currency, currencyCodeToCurrency} from "./currency.ts";

type DrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    buttonRef: MutableRefObject<null>;
    initialCurrency: Currency;
    customCurrency: string | null;
    setCustomCurrency: (updatedCurrency: string | null) => void;
};

function SettingsDrawer({
    isOpen,
    onClose,
    buttonRef,
    initialCurrency,
    customCurrency,
    setCustomCurrency,
}: DrawerProps) {
    const currencyCodes = Intl.supportedValuesOf("currency");

    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={buttonRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Settings</DrawerHeader>

                <DrawerBody>
                    <FormControl>
                        <FormLabel>Currency</FormLabel>
                        <Select
                            value={customCurrency ?? undefined}
                            onChange={event => setCustomCurrency(event.target.value || null)}
                            placeholder={`Default - ${initialCurrency.name} (${initialCurrency.code})`}
                        >
                            {currencyCodes.map(currencyCode => {
                                const currency = currencyCodeToCurrency(currencyCode);
                                return (
                                    <option key={currency.code} value={currency.code}>
                                        {currency.name} ({currency.code === currency.symbol
                                            ? currency.code
                                            : `${currency.code}, ${currency.symbol}`})
                                    </option>
                                );
                            })}
                        </Select>

                        <FormHelperText>
                            Default is detected from your locale. Currency selection has no effect on calculations.
                        </FormHelperText>
                    </FormControl>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}

export default SettingsDrawer;
