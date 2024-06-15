import { Request, Response } from "express";
import { configDotenv } from "dotenv";
import rssService from "@/services/rssService";

class RssController {
    constructor() {
        configDotenv();
        this.getRss = this.getRss.bind(this);
    }
    public async getRss(req: Request, res: Response) {
        const proxy = process.env.RSS_PROXY_URL;
        const url = `${proxy}${req.path}`;
        const json = await rssService.getRssFeed(url);
        res.contentType("application/json");
        if(json === "")
            res.status(404).json({ error: "RSS feed not found" });
        else {
            const returnJson = this.dataHandler(json as string);
            res.status(200).json({
                statusCode: 200,
                message: "RSS feed fetched successfully",
                data: returnJson
            })
        };
    }

    private dataHandler(json: string): string {
        const prevHandle = JSON.parse(json);
        const data = prevHandle.items;
        return data;
    }
}

export default new RssController();