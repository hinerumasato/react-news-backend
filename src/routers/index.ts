import express, { Router } from "express";
import rssController from "../controllers/rssController";
import ttsController from "../controllers/ttsController";
import summaryController from "../controllers/summaryController";
import multer from "multer";

const rssRouter: Router = express.Router();
const ttsRouter: Router = express.Router();
const summaryRouter: Router = express.Router();

const upload = multer();

rssRouter.get("/rss/*", rssController.getRss);
ttsRouter.post("/tts", upload.any(), ttsController.getTts);
summaryRouter.post("/summary", upload.any(), summaryController.getSummary);

export { rssRouter, ttsRouter, summaryRouter };
