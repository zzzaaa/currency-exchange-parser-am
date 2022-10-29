import { sasParser } from "./sas-parser";
import { Currency } from "../rates.model";
import * as fs from "fs";

describe('Sas parser', () => {

    it('Should get correct values', () => {
        const body = `
        <div class="converter__btn-drop-option js-field-select-btn" data-text="AMD" data-value="1" data-valueto="1">AMD</div>
        <div class="converter__btn-drop-option js-field-select-btn" data-text="USD" data-value="398" data-valueto="403">USD</div>
        <div class="converter__btn-drop-option js-field-select-btn" data-text="EUR" data-value="398" data-valueto="401">EUR</div>
        <div class="converter__btn-drop-option js-field-select-btn" data-text="RUR" data-value="6.2" data-valueto="6.33">RUR</div>

       `;

        const result = sasParser(body);
        expect(result.get(Currency.RUR)?.buy).toBe(6.2);
        expect(result.get(Currency.RUR)?.sell).toBe(6.33);
        expect(result.get(Currency.USD)?.buy).toBe(398);
        expect(result.get(Currency.USD)?.sell).toBe(403);
    });
    it('Should read page correctly', () => {
        const body = fs.readFileSync(__dirname + '/../../test-data/sas.html').toString();
        const result = sasParser(body);
        expect(result.get(Currency.RUR)?.buy).toBe(6.2);
        expect(result.get(Currency.RUR)?.sell).toBe(6.33);
        expect(result.get(Currency.USD)?.buy).toBe(398);
        expect(result.get(Currency.USD)?.sell).toBe(403);

    });
    it('Should return empty map', () => {
        const result = sasParser('<div></div>');
        expect(result.size).toBe(0);
    });
});
