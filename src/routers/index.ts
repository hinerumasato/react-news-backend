import express, { Router } from "express";
import rssController from "../controllers/rssController";

const rssRouter: Router = express.Router();

rssRouter.get("/rss/*", rssController.getRss);

export { rssRouter };
