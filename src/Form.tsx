import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    VStack
} from "@chakra-ui/react";
import {useContext} from "react";
import {CurrencyContext} from "./App.tsx";
import {DistanceUnit, FuelEfficiencyUnit, FuelPriceUnit} from "./types.ts";

type FormProps = {
    distanceString: string;
    setDistanceString: (updatedDistanceString: string) => void;
    distanceUnit: DistanceUnit;
    setDistanceUnit: (updatedDistanceUnit: DistanceUnit) => void;
    fuelPriceString: string;
    setFuelPriceString: (updatedFuelPrice: string) => void;
    fuelPriceUnit: FuelPriceUnit;
    setFuelPriceUnit: (updatedFuelPriceUnit: FuelPriceUnit) => void;
    fuelEfficiencyString: string;
    setFuelEfficiencyString: (updatedFuelEfficiencyString: string) => void;
    fuelEfficiencyUnit: FuelEfficiencyUnit;
    setFuelEfficiencyUnit: (updatedFuelEfficiencyUnit: FuelEfficiencyUnit) => void;
    isDistanceValid: boolean;
    isFuelPriceValid: boolean;
    isFuelEfficiencyValid: boolean;
    isDirty: boolean;
    setIsDirty: (updatedIsDirty: boolean) => void;
}

function Form({
    distanceString,
    setDistanceString,
    distanceUnit,
    setDistanceUnit,
    fuelPriceString,
    setFuelPriceString,
    fuelPriceUnit,
    setFuelPriceUnit,
    fuelEfficiencyString,
    setFuelEfficiencyString,
    fuelEfficiencyUnit,
    setFuelEfficiencyUnit,
    isDistanceValid,
    isFuelPriceValid,
    isFuelEfficiencyValid,
    isDirty,
    setIsDirty,
}: FormProps) {
    const currencySymbol = useContext(CurrencyContext).symbol;

    const formatCurrency = (value: string): string => currencySymbol + value;
    const parse = (value: string): string => value.replace(currencySymbol, "");

    const handleDistanceStringChange = (updatedDistanceString: string): void => {
        setDistanceString(updatedDistanceString);
        setIsDirty(true);
    };

    const handleFuelPriceStringChange = (updatedFuelPriceString: string): void => {
        setFuelPriceString(updatedFuelPriceString);
        setIsDirty(true);
    };

    const handleFuelEfficiencyStringChange = (updatedFuelEfficiencyString: string): void => {
        setFuelEfficiencyString(updatedFuelEfficiencyString);
        setIsDirty(true);
    };

    const handleDistanceUnitChange = (updatedDistanceUnit: DistanceUnit): void => {
        setDistanceUnit(updatedDistanceUnit);
        setIsDirty(true);
    };

    const handleFuelPriceUnitChange = (updatedFuelPriceUnit: FuelPriceUnit): void => {
        setFuelPriceUnit(updatedFuelPriceUnit);
        setIsDirty(true);
    };

    const handleFuelEfficiencyUnitChange = (updatedFuelEfficiencyUnit: FuelEfficiencyUnit): void => {
        setFuelEfficiencyUnit(updatedFuelEfficiencyUnit);
        setIsDirty(true);
    };

    return (
        <VStack>
            <FormControl isInvalid={isDirty && !isDistanceValid}>
                <FormLabel>Distance travelled</FormLabel>
                <HStack>
                    <NumberInput
                        value={distanceString}
                        onChange={(valueAsString) => handleDistanceStringChange(valueAsString)}
                        min={0}
                    >
                        <NumberInputField />
                    </NumberInput>
                    <Select
                        w="auto"
                        value={distanceUnit}
                        onChange={event => handleDistanceUnitChange(event.target.value as DistanceUnit)}
                    >
                        <option value="miles">miles</option>
                        <option value="kilometers">kilometres</option>
                    </Select>
                </HStack>
                {isDirty && !isDistanceValid ? (
                    <FormErrorMessage>Distance is required.</FormErrorMessage>
                ) : (
                    <FormHelperText>&nbsp;</FormHelperText>
                )}
            </FormControl>

            <FormControl isInvalid={isDirty && !isFuelPriceValid}>
                <FormLabel>Fuel price</FormLabel>
                <HStack>
                    <NumberInput
                        value={formatCurrency(fuelPriceString)}
                        onChange={(valueAsString) => handleFuelPriceStringChange(parse(valueAsString))}
                        min={0}
                        precision={2}
                        step={0.01}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Select
                        w="auto"
                        value={fuelPriceUnit}
                        onChange={event => handleFuelPriceUnitChange(event.target.value as FuelPriceUnit)}
                    >
                        <option value="per-liter">per litre</option>
                        <option value="per-imperial-gallon">per gallon (imperial)</option>
                        <option value="per-us-gallon">per gallon (US)</option>
                    </Select>
                </HStack>
                {isDirty && !isFuelPriceValid ? (
                    <FormErrorMessage>Fuel price is required.</FormErrorMessage>
                ) : (
                    <FormHelperText>&nbsp;</FormHelperText>
                )}
            </FormControl>

            <FormControl isInvalid={isDirty && !isFuelEfficiencyValid}>
                <FormLabel>Fuel efficiency</FormLabel>
                <HStack>
                    <NumberInput
                        value={fuelEfficiencyString}
                        onChange={(valueAsString) => handleFuelEfficiencyStringChange(valueAsString)}
                        min={1}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Select
                        w="auto"
                        value={fuelEfficiencyUnit}
                        onChange={event => handleFuelEfficiencyUnitChange(event.target.value as FuelEfficiencyUnit)}
                    >
                        <option value="miles-per-imperial-gallon">mpg (imperial)</option>
                        <option value="miles-per-us-gallon">mpg (US)</option>
                        <option value="liters-per-100km">L/100km</option>
                        <option value="kilometers-per-liter">km/L</option>
                    </Select>
                </HStack>
                {isDirty && !isFuelEfficiencyValid ? (
                    <FormErrorMessage>Fuel efficiency is required.</FormErrorMessage>
                ) : (
                    <FormHelperText>&nbsp;</FormHelperText>
                )}
            </FormControl>
        </VStack>
    );
}

export default Form;
