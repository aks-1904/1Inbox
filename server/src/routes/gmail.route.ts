import express from "express";
import {
  connectGoogle,
  getEmailsOfSingleAccount,
  googleOAuthCallback,
} from "../controllers/gmail.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = express.Router();

router.get("/connect", connectGoogle);
router.get("/oauth2callback", googleOAuthCallback); // Google redirects here
router.get("/get-emails", isAuthenticated, getEmailsOfSingleAccount);

export default router;
