import express from "express";
import { ask } from "../controllers/askController.js";
import { isWork } from "../controllers/workController.js";
import { getBalance } from "../controllers/balanceController.js";

const router = express.Router();

router.get("/iswork", isWork);
router.post("/ask", ask);
router.post("/balance", getBalance);

export default router;
