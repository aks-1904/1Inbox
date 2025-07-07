import express from "express";
import { connectGoogle, googleOAuthCallback } from "../controllers/gmail.controller";

const router = express.Router();

router.get("/connect", connectGoogle);
router.get("/oauth2callback", googleOAuthCallback); // Google redirects here

export default router;
