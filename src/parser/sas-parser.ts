import { Currency, isCurrency, Rates } from "../rates.model";

export function sasParser(body: string): Map<Currency, Rates> {
    const pattern = /data-text="(\w+)" data-value="(\d+\.*\d*)" data-valueto="(\d+\.*\d*)">/ig;

    const result = new Map<Currency, Rates>;
    const matches = body.matchAll(pattern);
    for (const match of matches) {
        const currency = match[1].toLowerCase();
        if (isCurrency(currency)) {
            const buy = parseFloat(match[2]);
            const sell = parseFloat(match[3]);
            result.set(currency, { forCurrency: Currency.AMD, buy, sell });
        }
    }
    return result;

}
