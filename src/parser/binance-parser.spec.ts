import fs from "fs";
import { binanceParser } from "./binance-parser";
import { Currency } from "../rates.model";

describe('Binance parser', () => {
    it('Should read data correctly', () => {
        const buyBody = fs.readFileSync(__dirname + '/../../test-data/binance-amd-usdt-buy.json').toString()
        const sellBody = fs.readFileSync(__dirname + '/../../test-data/binance-amd-usdt-sell.json').toString();

        const res = binanceParser(buyBody, sellBody);

        expect(res.has(Currency.USDT)).toBeTruthy();
        expect(res.get(Currency.USDT)?.forCurrency).toBe(Currency.AMD);
        expect(res.get(Currency.USDT)?.sell).toBeGreaterThan(0)
        expect(res.get(Currency.USDT)?.buy).toBeGreaterThan(0);

    });
});
