import { redisClient } from "@/cache/redis";
import { Https } from "@/https/https";
import { RssItem } from "@/interfaces/RssItem";
import Parser from "rss-parser";



class RssService {
    async getRssFeed(url: string): Promise<string | RssItem> {
        const cachedFeed = await redisClient.get(url);
        if (cachedFeed) {
            const json = JSON.parse(cachedFeed);
            return json;
        } else {
            const https = new Https();
            const rss = await https.get(url);
            if(!rss.includes("<title>404 - File or directory not found.</title>")) {
                const parser = new Parser();
                const json = await parser.parseString(rss) as unknown as RssItem;
                return json;
            } else {
                return "";
            }
        }
    }
}

export default new RssService();