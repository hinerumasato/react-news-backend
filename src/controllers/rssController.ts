import { Request, Response } from "express";
import { configDotenv } from "dotenv";
import rssService from "@/services/rssService";
import { RssItem } from "@/interfaces/RssItem";

class RssController {
    constructor() {
        configDotenv();
        this.getRss = this.getRss.bind(this);
    }
    public async getRss(req: Request, res: Response) {
        const proxy = process.env.RSS_PROXY_URL;
        const url = `${proxy}${req.path}`;
        const feed = await rssService.getRssFeed(url);
        res.contentType("application/json");
        if(feed === "")
            res.status(404).json({ error: "RSS feed not found" });
        else {
            const data = feed as RssItem;
            
            res.status(200).json({
                statusCode: 200,
                message: "RSS feed fetched successfully",
                data: data.items
            })
        };
    }
}

export default new RssController();