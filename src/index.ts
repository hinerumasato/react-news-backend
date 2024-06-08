import cors from "cors";
import express, { Application } from "express";
import { rssRouter } from "./routers";
import { configDotenv } from "dotenv";
import 'module-alias/register';
configDotenv();

const PORT = parseInt(process.env.PORT as string) || 8000;

const app: Application = express();

app.use(cors());
app.use(rssRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})