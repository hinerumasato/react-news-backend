import { redisClient } from "@/cache/redis";
import { Https } from "@/https/https";
import Parser from "rss-parser";

class RssService {
    async getRssFeed(url: string): Promise<string | Parser.Output<{[key: string]: string}>> {
        const cachedFeed = await redisClient.get(url);
        if (cachedFeed) {
            return cachedFeed;
        } else {
            const https = new Https();
            const rss = await https.get(url);
            console.log(rss);
            if(!rss.includes("<title>404 - File or directory not found.</title>")) {
                const parser = new Parser();
                const json = await parser.parseString(rss);
                return json;
            } else {
                return "";
            }
        }
    }
}

export default new RssService();