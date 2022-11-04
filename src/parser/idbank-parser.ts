import { Currency, isCurrency, Rates } from "../rates.model";
import { JSDOM } from 'jsdom';

export function idbankParser(body: string): Map<Currency, Rates> {

    const result = new Map<Currency, Rates>();
    const dom = new JSDOM(body);
    const document = dom.window.document;
    const rows = document.querySelectorAll('.m-exchange__table-row');
    for (const row of rows) {
        // ignore header row and rows that have less than 3 child elements
        if (row.className.includes('row--header') || row.children.length !== 3) {
            continue;
        }
        const currency = row.children.item(0)?.textContent?.replace(/\d+/, '').trim().toLowerCase() || '';
        const buyText = row.children.item(1)?.textContent?.trim() || '';
        const sellText = row.children.item(2)?.textContent?.trim() || '';
        const buy = parseFloat(buyText);
        const sell = parseFloat(sellText);

        if (!isCurrency(currency) || isNaN(sell) || isNaN(buy)) {
            continue;
        }
        result.set(currency, {  forCurrency: Currency.AMD, buy, sell });

    }
    return result;

}
