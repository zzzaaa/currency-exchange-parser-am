import { request } from "https";

export function jsonPostRequest(url: string, body: {}): Promise<string> {
    return new Promise((resolve, reject) => {
        const req = request(url, {
            method: 'post',
            headers : {
                'Content-Type' : 'application/json',
            },

        } , (response) => {
            response.setEncoding('utf-8');
            let htmlBody = '';
            response.on('data', chunk => htmlBody += chunk);
            response.on('error', reject);
            response.on('end', () => {
                response.statusCode === 200 ? resolve(htmlBody) : reject(new Error('http state != 200'));
            });
        });
        req.write(JSON.stringify(body));
        req.end();
    });
}
