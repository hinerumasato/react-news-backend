import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {

    private generativeAi: GoogleGenerativeAI;

    constructor() {
        const apiKey: string = process.env.GEMINI_API_KEY || "";

        if (!apiKey) {
            throw new Error("Generative AI API Key is required");
        }

        this.generativeAi = new GoogleGenerativeAI(apiKey);
    }

    public async getSummary(text: string, modelType: string): Promise<string> {
        const model = this.generativeAi.getGenerativeModel({ model: modelType });
        const result = await model.generateContent(text);

        return result.response.text();
    }
}

export default new GeminiService();