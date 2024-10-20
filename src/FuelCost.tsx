import {Card, CardBody, Stat, StatLabel, StatNumber} from "@chakra-ui/react";
import {useContext} from "react";
import {CurrencyContext} from "./App.tsx";
import {DistanceUnit, FuelEfficiencyUnit, FuelPriceUnit} from "./types.ts";

type FuelCostProps = {
    distance: number;
    distanceUnit: DistanceUnit;
    fuelPrice: number;
    fuelPriceUnit: FuelPriceUnit;
    fuelEfficiency: number;
    fuelEfficiencyUnit: FuelEfficiencyUnit;
};

const milesToKm = 1.609344;
const imperialGallonToLiter = 4.54609;
const usGallonToLiter = 3.785411784;

function convertDistanceToKm(distance: number, distanceUnit: DistanceUnit): number {
    switch (distanceUnit) {
        case "miles":
            return distance * milesToKm;
        case "kilometers":
            return distance;
    }
}

function convertFuelPriceToPerLiter(fuelPrice: number, fuelPriceUnit: FuelPriceUnit): number {
    switch (fuelPriceUnit) {
        case "per-liter":
            return fuelPrice;
        case "per-imperial-gallon":
            return fuelPrice * imperialGallonToLiter;
        case "per-us-gallon":
            return fuelPrice * usGallonToLiter;
    }
}

// change back to km/L to remove pointless x100 then /100
function convertFuelEfficiencyToLiterPer100Km(fuelEfficiency: number, fuelEfficiencyUnit: FuelEfficiencyUnit): number {
    switch (fuelEfficiencyUnit) {
        case "miles-per-imperial-gallon":
            return (100 * imperialGallonToLiter / milesToKm) / fuelEfficiency;
        case "miles-per-us-gallon":
            return (100 * usGallonToLiter / milesToKm) / fuelEfficiency;
        case "liters-per-100km":
            return fuelEfficiency;
        case "kilometers-per-liter":
            return 100 / fuelEfficiency;
    }
}

function computeFuelCost(
    distance: number,
    distanceUnit: DistanceUnit,
    fuelPrice: number,
    fuelPriceUnit: FuelPriceUnit,
    fuelEfficiency: number,
    fuelEfficiencyUnit: FuelEfficiencyUnit,
): number {
    const distanceKm = convertDistanceToKm(distance, distanceUnit);
    const fuelPricePerLiter = convertFuelPriceToPerLiter(fuelPrice, fuelPriceUnit);
    const fuelEfficiencyLiterPer100Km = convertFuelEfficiencyToLiterPer100Km(fuelEfficiency, fuelEfficiencyUnit);

    return distanceKm * fuelPricePerLiter * (fuelEfficiencyLiterPer100Km / 100);
}

function FuelCost({
    distance,
    distanceUnit,
    fuelPrice,
    fuelPriceUnit,
    fuelEfficiency,
    fuelEfficiencyUnit,
}: FuelCostProps) {
    const currencyCode = useContext(CurrencyContext).code;

    const fuelCost = computeFuelCost(
        distance,
        distanceUnit,
        fuelPrice,
        fuelPriceUnit,
        fuelEfficiency,
        fuelEfficiencyUnit,
    );

    const numberFormat = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode.toUpperCase(),
    });
    const fuelCostString = isFinite(fuelCost) ? numberFormat.format(fuelCost) : "";

    return (
        <Card px={5} py={1}>
            <CardBody textAlign="center">
                <Stat>
                    <StatLabel>Total Cost</StatLabel>
                    <StatNumber>{fuelCostString}</StatNumber>
                </Stat>
            </CardBody>
        </Card>
    );
}

export default FuelCost;
