import { Request, Response } from "express";
import { configDotenv } from "dotenv";
import geminiService from "../services/geminiService";
import { GEMINI_1_5_PRO, GEMINI_1_5_FLASH } from "../constants/geminiModel";
import { marked } from "marked";

class SummaryController {
    constructor() {
        configDotenv();
        this.getSummary = this.getSummary.bind(this);
    }

    public async getSummary(req: Request, res: Response) {
        let text = req.body.text;

        if (!text) {
            return res.status(400).send('Text is required');
        }

        text = 'Tóm tắt: ' + text;

        geminiService.getSummary(text, GEMINI_1_5_FLASH).then((summary) => {
            summary = summary.replace(/\n/g, '<br>');
            summary = summary.replace('##', '');
            const htmlSummary = marked(summary);
            res.status(200).json({
                statusCode: 200,
                message: "Text summarized successfully",
                data: htmlSummary
            });
        }).catch((error) => {
            console.error(error);
            res.status(500).send('Error summarizing text');
        });
    }
}

export default new SummaryController();