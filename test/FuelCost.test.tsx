import {render, screen} from "@testing-library/react";
import {describe, expect, test} from "vitest";
import FuelCost from "../src/FuelCost";
import "@testing-library/jest-dom/vitest";

describe("FuelCost", () => {
    test.each([
        {
            distance: 100,
            distanceUnit: "miles" as const,
            fuelPrice: 1.30,
            fuelPriceUnit: "per-liter" as const,
            fuelEfficiency: 45,
            fuelEfficiencyUnit: "miles-per-us-gallon" as const,
            fuelCostString: "£10.94",
        },
        {
            distance: 100,
            distanceUnit: "miles" as const,
            fuelPrice: 1.30,
            fuelPriceUnit: "per-liter" as const,
            fuelEfficiency: 45,
            fuelEfficiencyUnit: "miles-per-imperial-gallon" as const,
            fuelCostString: "£13.13",
        },
        {
            distance: 100,
            distanceUnit: "kilometers" as const,
            fuelPrice: 1.30,
            fuelPriceUnit: "per-liter" as const,
            fuelEfficiency: 45,
            fuelEfficiencyUnit: "miles-per-imperial-gallon" as const,
            fuelCostString: "£8.16",
        },
        {
            distance: 100,
            distanceUnit: "kilometers" as const,
            fuelPrice: 1.30,
            fuelPriceUnit: "per-us-gallon" as const,
            fuelEfficiency: 45,
            fuelEfficiencyUnit: "miles-per-imperial-gallon" as const,
            fuelCostString: "£30.89",
        },
        {
            distance: 100,
            distanceUnit: "miles" as const,
            fuelPrice: 1.30,
            fuelPriceUnit: "per-imperial-gallon" as const,
            fuelEfficiency: 45,
            fuelEfficiencyUnit: "miles-per-imperial-gallon" as const,
            fuelCostString: "£59.70",
        },
        {
            distance: 100,
            distanceUnit: "kilometers" as const,
            fuelPrice: 1.30,
            fuelPriceUnit: "per-liter" as const,
            fuelEfficiency: 50,
            fuelEfficiencyUnit: "liters-per-100km" as const,
            fuelCostString: "£65.00",
        },
        {
            distance: 100,
            distanceUnit: "kilometers" as const,
            fuelPrice: 1.30,
            fuelPriceUnit: "per-liter" as const,
            fuelEfficiency: 50,
            fuelEfficiencyUnit: "kilometers-per-liter" as const,
            fuelCostString: "£2.60",
        },
    ])("displays correct fuel cost ($distanceUnit, $fuelPriceUnit, $fuelEfficiencyUnit)", ({
        distance,
        distanceUnit,
        fuelPrice,
        fuelPriceUnit,
        fuelEfficiency,
        fuelEfficiencyUnit,
        fuelCostString,
    }) => {
        render(
            <FuelCost
                distance={distance}
                distanceUnit={distanceUnit}
                fuelPrice={fuelPrice}
                fuelPriceUnit={fuelPriceUnit}
                fuelEfficiency={fuelEfficiency}
                fuelEfficiencyUnit={fuelEfficiencyUnit}
                currencyUnit="gbp"
            />
        );

        expect(screen.getByRole("definition")).toHaveTextContent(fuelCostString);
    });
});
