import express from "express";
import {
  connectGoogle,
  getEmailsOfSingleAccount,
  getFullGmailMessage,
  googleOAuthCallback,
} from "../controllers/gmail.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = express.Router();

router.get("/connect", connectGoogle);
router.get("/oauth2callback", googleOAuthCallback); // Google redirects here
router.get("/emails", isAuthenticated, getEmailsOfSingleAccount);
router.get("/full-message", isAuthenticated, getFullGmailMessage);

export default router;
