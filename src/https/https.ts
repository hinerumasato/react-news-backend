import https from "https";

export class Https {
    get(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            https.get(url, (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    data += chunk;
                });

                response.on('error', (error) => {
                    reject(error);
                })

                response.on('end', () => {
                    resolve(data);
                });
            });
        });
    }
}