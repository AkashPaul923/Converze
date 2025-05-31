import express from "express";
import { login, logout, otherUser, register } from "../controllers/userController.js";
import isAuthenticated from "../middleware/IsAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthenticated, otherUser);

export default router;
