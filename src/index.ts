import { getUrl } from "./get-url";
import { sasParser } from "./parser/sas-parser";
import { idbankParser } from "./parser/idbank-parser";
import { jsonPostRequest } from "./json-post-request";
import { Currency } from "./rates.model";
import { binanceParser } from "./parser/binance-parser";

const binanceApiUrl = 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search';

function binanceQueryBuilder(tradeType: 'SELL' | 'BUY', fiat: Currency, wantToBy: Currency = Currency.USDT, payTypes: string[]) {
   return {
      payTypes, // IDBank, TinkoffNew
      tradeType,
      "asset": wantToBy.toUpperCase(),
      "fiat": fiat.toUpperCase(),
      "proMerchantAds": false,
      "page": 1,
      "rows": 10,
      "countries": [],
      "publisherType": null,
   };
}

const sasPromise = getUrl('https://www.sas.am/en/appfood/personal/calculator/')
    .then(sasParser)
    .then(Object.fromEntries);

const idBankPromise = getUrl('https://idbank.am/en/rates/?RATE_TYPE=NO_CASH')
    .then(idbankParser)
    .then(Object.fromEntries);

const binanceAmdPromise = Promise.all([
    jsonPostRequest(binanceApiUrl, binanceQueryBuilder('BUY', Currency.AMD, Currency.USDT, ['IDBank'])),
    jsonPostRequest(binanceApiUrl, binanceQueryBuilder('SELL', Currency.AMD, Currency.USDT, ['IDBank'])),
]).then(([buy, sell]) => binanceParser(buy, sell)).then(Object.fromEntries);

const binanceRubPromise = Promise.all([
   jsonPostRequest(binanceApiUrl, binanceQueryBuilder('BUY', Currency.RUB, Currency.USDT, ['TinkoffNew'])),
   jsonPostRequest(binanceApiUrl, binanceQueryBuilder('SELL', Currency.RUB, Currency.USDT, ['TinkoffNew'])),
]).then(([buy, sell]) => binanceParser(buy, sell)).then(Object.fromEntries);


Promise.all([sasPromise, idBankPromise, binanceAmdPromise, binanceRubPromise]).then(([sas, idbank, binanceAmd, binanceRub]) => {
   const asJson = JSON.stringify({ sas, idbank, binanceAmd, binanceRub});
   process.stdout.write(asJson);
})
