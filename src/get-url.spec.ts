import { getUrl } from "./get-url";

describe('url-get', () => {
    it('should get page', async () => {
        const data = await getUrl('https://mail.ru/');
        expect(data.length).toBeGreaterThan(1);
    });
    it('Should throw error on 404', (done) => {
        getUrl('https://ya.ru/404').catch(err => {
            done();
        })
    });
});
