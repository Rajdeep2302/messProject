import express from "express";
import {
  addEntry,
  getAllEntries,
  getEntriesByMonth,
  updateEntry,
} from "../controllers/waterEntry.controller.js";

const router = express.Router();

router.post("/", addEntry);
router.get("/", getAllEntries);
router.get("/:year/:month", getEntriesByMonth);
router.put("/:id", updateEntry);

export default router;
