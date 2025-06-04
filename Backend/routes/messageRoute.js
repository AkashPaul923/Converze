import express from "express";
import { sendMessage } from "../controllers/messageController.js";
import isAuthenticated from "../middleware/IsAuthenticated.js";

const router = express.Router();

router.route("/send/:id").post(isAuthenticated ,sendMessage);

export default router;
