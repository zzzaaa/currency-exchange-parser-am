import { jsonPostRequest } from "./json-post-request";



describe('post request', () => {
    it('should get data', async () => {
        const postData = {"proMerchantAds":false,"page":1,"rows":10,"payTypes":["IDBank"],"countries":[],"publisherType":null,"tradeType":"SELL","asset":"USDT","fiat":"AMD"};
        const data = await jsonPostRequest('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search', postData);
        expect(data.length).toBeGreaterThan(0);
    });
});
