import { Currency, isCurrency, Rates } from "../rates.model";

interface BinancePropose {
    adv : {
        asset: string,
        fiatUnit: string,
        price: string,
    }
}
export function binanceParser(buyBody: string, sellBody: string): Map<Currency, Rates>{
    const result = new Map<Currency, Rates>;

    const buyPart = getFirstItem(buyBody);
    const sellPart = getFirstItem(sellBody);
    if (buyPart && sellPart && buyPart.fiat === sellPart.fiat && buyPart.asset && sellPart.asset) {

        // switch buy and sell, because it's YOU are buy or sell. Vise virsa for bank
        result.set(sellPart.asset, {forCurrency: buyPart.fiat, sell: buyPart.price, buy: sellPart.price})
    }
    return result;
}

export function getFirstItem(body: string): {asset: Currency, fiat: Currency, price: number} | null {
 const parse = JSON.parse(body);
 if (!parse) {
     return null;
 }
 if (!parse?.data?.length) {
     return null;
 }

 const firstElement: BinancePropose = parse.data[0];
 const adv = firstElement.adv;
 const fiat = adv.fiatUnit.toLowerCase();
 const asset = adv.asset.toLowerCase();
 if (!isCurrency(fiat) || !isCurrency(asset)) {
     return null;
 }
 const price = parseFloat(adv.price);

 return {asset, fiat, price};
}
