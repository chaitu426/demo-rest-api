import express from "express";
import { ask } from "./chatController";

const chatRouter = express.Router();

chatRouter.post("/query", ask)




export default chatRouter;