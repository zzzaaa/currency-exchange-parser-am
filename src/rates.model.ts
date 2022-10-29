export function isCurrency(val: string | Currency): val is Currency {
    return Object.values(Currency).includes(val as Currency);
}

export enum Currency {
    USD = 'usd',
    RUR = 'rur',
    EUR = 'eur',
    AMD = 'amd',
}

export interface Rates {
    buy: number,
    sell: number,
}
