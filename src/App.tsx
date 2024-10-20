import {Alert, AlertDescription, AlertIcon, AlertTitle, Container, Spinner, VStack} from "@chakra-ui/react";
import {createContext, useCallback, useEffect, useState} from "react";
import {useFetch} from "use-http";
import {Currency, currencyCodeToCurrency} from "./currency.ts";
import Form from "./Form.tsx";
import FuelCost from "./FuelCost.tsx";
import NavBar from "./NavBar.tsx";
import {DistanceUnit, FuelEfficiencyUnit, FuelPriceUnit} from "./types.ts";

type CurrencyResult = {
    currencies: Record<string, { name: string, symbol: string }>;
};

function parseFloat(value: string): number | null {
    const parsedValue = Number.parseFloat(value);
    return Number.isFinite(parsedValue) ? parsedValue : null;
}

const defaultInitialCurrency: Currency = {
    code: "USD",
    name: "United States dollar",
    symbol: "$",
};

export const CurrencyContext = createContext(defaultInitialCurrency);

// todo: nav bar
function App() {
    const { loading, get, response } = useFetch<CurrencyResult>("https://restcountries.com");
    const [initialCurrency, setInitialCurrency] = useState<Currency>(defaultInitialCurrency);
    const [customCurrency, setCustomCurrency] = useState<string | null>(null);

    const [distanceString, setDistanceString] = useState("");
    const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>("miles");
    const [fuelPriceString, setFuelPriceString] = useState("");
    const [fuelPriceUnit, setFuelPriceUnit] = useState<FuelPriceUnit>("per-liter");
    const [fuelEfficiencyString, setFuelEfficiencyString] = useState("");
    const [fuelEfficiencyUnit, setFuelEfficiencyUnit] = useState<FuelEfficiencyUnit>("miles-per-imperial-gallon");

    const [isDirty, setIsDirty] = useState(false);

    const distance = parseFloat(distanceString);
    const fuelPrice = parseFloat(fuelPriceString);
    const fuelEfficiency = parseFloat(fuelEfficiencyString);

    const isValid = distance !== null && fuelPrice !== null && fuelEfficiency !== null;

    const updateCurrency = useCallback(async (): Promise<void> => {
        const currentCountryAlpha2Code = navigator.language.split("-")[1]?.toLowerCase() ?? "";
        const currencyResult = await get(`/v3.1/alpha/${encodeURIComponent(currentCountryAlpha2Code)}/?fields=currencies`);

        if (!response.ok) {
            return;
        }

        let updatedCurrency: Currency;
        if (!currencyResult || !currencyResult.currencies || Object.values(currencyResult.currencies).length < 1) {
            updatedCurrency = defaultInitialCurrency;
        } else {
            // todo: use consistent names and/or symbols - either always from restcountries API or always from Intl API
            updatedCurrency = Object.keys(currencyResult.currencies)[0]
                && Object.values(currencyResult.currencies)[0]?.name
                && Object.values(currencyResult.currencies)[0]?.symbol
                ? {
                    code: Object.keys(currencyResult.currencies)[0],
                    name: Object.values(currencyResult.currencies)[0].name,
                    symbol: Object.values(currencyResult.currencies)[0].symbol,
                }
                : defaultInitialCurrency;
        }

        setInitialCurrency(updatedCurrency);
    }, [get, response.ok])

    useEffect(() => {
        (async () => {
            await updateCurrency();
        })();
    }, [updateCurrency]);

    const currency = customCurrency === null ? initialCurrency : currencyCodeToCurrency(customCurrency);

    return (
        <>
            <NavBar
                initialCurrency={initialCurrency}
                customCurrency={customCurrency}
                setCustomCurrency={setCustomCurrency}
            />
            <Container px={10} py={12}>
                <VStack spacing={10} justifyItems={"center"}>
                    {loading ? (
                        <Spinner size="xl" />
                    ) : (
                        <CurrencyContext.Provider value={currency}>
                            {/* TODO: Possibly refactor this */}
                            <Form
                                distanceString={distanceString}
                                setDistanceString={setDistanceString}
                                distanceUnit={distanceUnit}
                                setDistanceUnit={setDistanceUnit}
                                fuelPriceString={fuelPriceString}
                                setFuelPriceString={setFuelPriceString}
                                fuelPriceUnit={fuelPriceUnit}
                                setFuelPriceUnit={setFuelPriceUnit}
                                fuelEfficiencyString={fuelEfficiencyString}
                                setFuelEfficiencyString={setFuelEfficiencyString}
                                fuelEfficiencyUnit={fuelEfficiencyUnit}
                                setFuelEfficiencyUnit={setFuelEfficiencyUnit}
                                isDistanceValid={distance !== null}
                                isFuelPriceValid={fuelPrice !== null}
                                isFuelEfficiencyValid={fuelEfficiency !== null}
                                isDirty={isDirty}
                                setIsDirty={setIsDirty}
                            />

                            {isValid && (
                                <FuelCost
                                    distance={distance}
                                    distanceUnit={distanceUnit}
                                    fuelPrice={fuelPrice}
                                    fuelPriceUnit={fuelPriceUnit}
                                    fuelEfficiency={fuelEfficiency}
                                    fuelEfficiencyUnit={fuelEfficiencyUnit}
                                />
                            )}
                            {!isValid && !isDirty && (
                                <Alert status="info">
                                    <AlertIcon />
                                    Enter the required info and the fuel cost will be displayed here.
                                </Alert>
                            )}
                            {!isValid && isDirty && (
                                <Alert status="error">
                                    <AlertIcon />
                                    <AlertTitle>Missing info</AlertTitle>
                                    <AlertDescription>Please enter the required info.</AlertDescription>
                                </Alert>
                            )}
                        </CurrencyContext.Provider>
                    )}
                </VStack>
            </Container>
        </>
    )
}

export default App;
