import { Request, Response } from "express";
import { configDotenv } from "dotenv";
const textToSpeech = require('@google-cloud/text-to-speech');

const client = new textToSpeech.TextToSpeechClient({
    keyFilename: './src/ttsKey.json'
});

class TtsController {
    constructor() {
        configDotenv();
        this.getTts = this.getTts.bind(this);
    }
    public async getTts(req: Request, res: Response) {
        const text = req.body.text;

        if (!text) {
            return res.status(400).send('Text is required');
        }

        const request = {
            input: { text },
            voice: { languageCode: 'vi-VN', ssmlGender: 'NEUTRAL' },
            audioConfig: { audioEncoding: 'MP3' },
        };

        try {
            const [response] = await client.synthesizeSpeech(request);
            res.send(response.audioContent.toString('base64'));
        } catch (error) {
            console.error(error);
            res.status(500).send('Error synthesizing speech');
        }
    }
}

export default new TtsController();