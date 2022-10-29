import { Currency } from "../rates.model";
import * as fs from "fs";
import { idbankParser } from "./idbank-parser";

describe('Idbank parser', () => {

    it('Should parse correct from real page', () => {
        const body = fs.readFileSync(__dirname + '/../../test-data/idbank.rates.html');

        const result = idbankParser(body.toString());
        expect(result.get(Currency.RUR)?.buy).toBe(6.15);
        expect(result.get(Currency.RUR)?.sell).toBe(6.67);
        expect(result.get(Currency.USD)?.buy).toBe(391);
        expect(result.get(Currency.USD)?.sell).toBe(397);
    });
    it('Should parse a block', () => {
        const body = `
        <div class="m-exchange__table">
\t\t\t\t\t<div class="m-exchange__table-row m-exchange__table-row--header">
\t\t\t\t\t\t<div class="m-exchange__table-cell">Currency</div>
\t\t\t\t\t\t<div class="m-exchange__table-cell">Buy</div>
\t\t\t\t\t\t<div class="m-exchange__table-cell">Sell</div>
\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t<div class="m-exchange__table-row">
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t  \t\t\t\t\t\t\t\t<svg class="m-exchange__table-cell-icon"><use href="#svg-icon-flag-usa"></use></svg>1 USD\t\t\t\t\t\t\t  \t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t\t391\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t\t397\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t<div class="m-exchange__table-row">
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t  \t\t\t\t\t\t\t\t1 CHF\t\t\t\t\t\t\t  \t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t\t<svg class="m-exchange__table-cell-icon m-exchange__table-cell-icon--revers"><use href="#svg-icon-chevron-down-fill"></use></svg>389\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t\t<svg class="m-exchange__table-cell-icon m-exchange__table-cell-icon--revers"><use href="#svg-icon-chevron-down-fill"></use></svg>409\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t<div class="m-exchange__table-row">
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t  \t\t\t\t\t\t\t\t1 CNY\t\t\t\t\t\t\t  \t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t\t<svg class="m-exchange__table-cell-icon m-exchange__table-cell-icon--revers"><use href="#svg-icon-chevron-down-fill"></use></svg>53\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t\t<svg class="m-exchange__table-cell-icon m-exchange__table-cell-icon--revers"><use href="#svg-icon-chevron-down-fill"></use></svg>57.15\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t<div class="m-exchange__table-row">
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t  \t\t\t\t\t\t\t\t<svg class="m-exchange__table-cell-icon"><use href="#svg-icon-flag-eur"></use></svg>1 EUR\t\t\t\t\t\t\t  \t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t\t<svg class="m-exchange__table-cell-icon m-exchange__table-cell-icon--revers"><use href="#svg-icon-chevron-down-fill"></use></svg>385\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t\t<svg class="m-exchange__table-cell-icon m-exchange__table-cell-icon--revers"><use href="#svg-icon-chevron-down-fill"></use></svg>401\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t<div class="m-exchange__table-row">
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t  \t\t\t\t\t\t\t\t1 GBP\t\t\t\t\t\t\t  \t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t\t<svg class="m-exchange__table-cell-icon m-exchange__table-cell-icon--revers"><use href="#svg-icon-chevron-down-fill"></use></svg>441\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t\t<svg class="m-exchange__table-cell-icon m-exchange__table-cell-icon--revers"><use href="#svg-icon-chevron-down-fill"></use></svg>468\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t<div class="m-exchange__table-row">
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t  \t\t\t\t\t\t\t\t1 GEL\t\t\t\t\t\t\t  \t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t\t130\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t\t154\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t<div class="m-exchange__table-row">
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t  \t\t\t\t\t\t\t\t1 JPY\t\t\t\t\t\t\t  \t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t\t<svg class="m-exchange__table-cell-icon m-exchange__table-cell-icon--revers"><use href="#svg-icon-chevron-down-fill"></use></svg>2.61\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t\t<svg class="m-exchange__table-cell-icon m-exchange__table-cell-icon--revers"><use href="#svg-icon-chevron-down-fill"></use></svg>2.81\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t<div class="m-exchange__table-row">
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t  \t\t\t\t\t\t\t\t<svg class="m-exchange__table-cell-icon"><use href="#svg-icon-flag-rus"></use></svg>1 RUR\t\t\t\t\t\t\t  \t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t\t6.15\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t\t<svg class="m-exchange__table-cell-icon"><use href="#svg-icon-chevron-down-fill"></use></svg>6.67\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t<div class="m-exchange__table-row">
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t  \t\t\t\t\t\t\t\t1 XAU\t\t\t\t\t\t\t  \t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t\t<svg class="m-exchange__table-cell-icon m-exchange__table-cell-icon--revers"><use href="#svg-icon-chevron-down-fill"></use></svg>20600\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="m-exchange__table-cell">
\t\t\t\t\t\t\t\t<svg class="m-exchange__table-cell-icon m-exchange__table-cell-icon--revers"><use href="#svg-icon-chevron-down-fill"></use></svg>21580\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t<div class="m-exchange__table-actions">
\t\t\t\t\t\t<button onclick="location.href='/en/information/about/branches-and-atms/'" class="m-exchange__table-action btn btn---white-bg">Branch</button>
\t\t\t\t\t</div>
\t\t\t\t</div>
        `;

        const result = idbankParser(body.toString());
        expect(result.get(Currency.RUR)?.buy).toBe(6.15);
        expect(result.get(Currency.RUR)?.sell).toBe(6.67);
        expect(result.get(Currency.USD)?.buy).toBe(391);
        expect(result.get(Currency.USD)?.sell).toBe(397);
    });
    it('Should return empty map', () => {
        const result = idbankParser('<div></div>');
        expect(result.size).toBe(0);
    });
});
