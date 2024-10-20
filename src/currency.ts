export type Currency = {
    code: string;
    name: string;
    symbol: string;
};

export function currencyCodeToCurrency(currencyCode: string): Currency {
    // todo: use Intl.NumberFormat object?
    const symbol = (0).toLocaleString(
        undefined,
        {
            style: "currency",
            currency: currencyCode,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            currencyDisplay: "narrowSymbol",
        }
    ).replace(/\d/g, "").trim();

    // todo: use name from restcountries API instead?
    const name = (0).toLocaleString(
        undefined,
        {
            style: "currency",
            currency: currencyCode,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            currencyDisplay: "name",
        }
    ).replace(/^\d/g, "").trim();

    return {
        code: currencyCode,
        name,
        symbol,
    };
}
