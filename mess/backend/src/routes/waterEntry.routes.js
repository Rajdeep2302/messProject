import express from "express";
import {
  addEntry,
  getAllEntries,
  getEntriesByMonth,
  updateEntry,
  deleteEntry,
  sendFilteredEmail
} from "../controllers/waterEntry.controller.js";

const router = express.Router();

router.post("/", addEntry);
router.get("/", getAllEntries);
router.get("/:year/:month", getEntriesByMonth);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);
router.post("/email", sendFilteredEmail);

export default router;
