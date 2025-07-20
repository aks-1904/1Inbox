import express from "express";
import {
  connectOutlook,
  getEmailsOfSingleAccount,
  outlookOAuthCallback,
} from "../controllers/outlook.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = express.Router();

router.get("/connect", connectOutlook);
router.get("/auth/callback", outlookOAuthCallback);
router.get("/emails", isAuthenticated, getEmailsOfSingleAccount);

export default router;
