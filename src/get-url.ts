import { get } from "https";

export function getUrl(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        get(url, (response) => {
            response.setEncoding('utf-8');
            let htmlBody = '';
            response.on('data', chunk => htmlBody += chunk);
            response.on('error', reject);
            response.on('end', () => {
                response.statusCode === 200 ? resolve(htmlBody) : reject(new Error('http state != 200'));
            });
        })
    });
}
