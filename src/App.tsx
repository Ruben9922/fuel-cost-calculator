import {Alert, AlertDescription, AlertIcon, AlertTitle, Container, Heading, VStack} from "@chakra-ui/react";
import {useState} from "react";
import Form from "./Form.tsx";
import FuelCost from "./FuelCost.tsx";
import {DistanceUnit, FuelEfficiencyUnit, FuelPriceUnit} from "./types.ts";

function parseFloat(value: string): number | null {
    const parsedValue = Number.parseFloat(value);
    return Number.isFinite(parsedValue) ? parsedValue : null;
}

function App() {
    const [distanceString, setDistanceString] = useState("");
    const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>("miles");
    const [fuelPriceString, setFuelPriceString] = useState("");
    const [fuelPriceUnit, setFuelPriceUnit] = useState<FuelPriceUnit>("per-liter");
    const [fuelEfficiencyString, setFuelEfficiencyString] = useState("");
    const [fuelEfficiencyUnit, setFuelEfficiencyUnit] = useState<FuelEfficiencyUnit>("miles-per-imperial-gallon");

    const [isDirty, setIsDirty] = useState(false);
    // const [isDistanceDirty, setIsDistanceDirty] = useState(false);
    // const [isFuelPriceDirty, setIsFuelPriceDirty] = useState(false);
    // const [isFuelEfficiencyDirty, setIsFuelEfficiencyDirty] = useState(false);

    const distance = parseFloat(distanceString);
    const fuelPrice = parseFloat(fuelPriceString);
    const fuelEfficiency = parseFloat(fuelEfficiencyString);

    const isValid = distance !== null && fuelPrice !== null && fuelEfficiency !== null;
    // const isDirty = isDistanceDirty || isFuelPriceDirty || isFuelEfficiencyDirty;

    const currencyUnit = "gbp";

    return (
        <Container px={10} py={12}>
            <VStack spacing={10} justifyItems={"center"}>
                <Heading>Fuel Cost Calculator</Heading>

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
                    currencyUnit={currencyUnit}
                    isDistanceValid={distance !== null}
                    isFuelPriceValid={fuelPrice !== null}
                    isFuelEfficiencyValid={fuelEfficiency !== null}
                    isDirty={isDirty}
                    setIsDirty={setIsDirty}
                    // isDistanceDirty={isDistanceDirty}
                    // setIsDistanceDirty={setIsDistanceDirty}
                    // isFuelPriceDirty={isFuelPriceDirty}
                    // setIsFuelPriceDirty={setIsFuelPriceDirty}
                    // isFuelEfficiencyDirty={isFuelEfficiencyDirty}
                    // setIsFuelEfficiencyDirty={setIsFuelEfficiencyDirty}
                />

                {isValid && (
                    <FuelCost
                        distance={distance}
                        distanceUnit={distanceUnit}
                        fuelPrice={fuelPrice}
                        fuelPriceUnit={fuelPriceUnit}
                        fuelEfficiency={fuelEfficiency}
                        fuelEfficiencyUnit={fuelEfficiencyUnit}
                        currencyUnit={currencyUnit}
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
            </VStack>
        </Container>
    )
}

export default App;
