export function isCurrency(val: string | Currency): val is Currency {
    return Object.values(Currency).includes(val as Currency);
}

export enum Currency {
    USD = 'usd',
    USDT = 'usdt',
    RUR = 'rur',
    RUB = 'rub',
    EUR = 'eur',
    AMD = 'amd',
}

export interface Rates {
    forCurrency: Currency;
    buy: number,
    sell: number,
}
