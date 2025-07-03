import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/profile").get(isAuthenticated, getUserProfile);

export default router;
