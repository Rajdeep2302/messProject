import WaterEntry from "../models/WaterEntry.model.js";

/* CREATE ENTRY */
export const addEntry = async (req, res) => {
  const { date, bottles, paidBy } = req.body;

  if (!date || !bottles || !paidBy) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const totalAmount = bottles * 25;

  const entry = await WaterEntry.create({
    date,
    bottles,
    paidBy,
    totalAmount,
  });

  res.status(201).json(entry);
};

/* GET ALL ENTRIES */
export const getAllEntries = async (req, res) => {
  const entries = await WaterEntry.find().sort({ date: 1 });
  res.json(entries);
};

/* GET ENTRIES BY MONTH */
export const getEntriesByMonth = async (req, res) => {
  const { year, month } = req.params; // e.g. 2026 / 01

  const entries = await WaterEntry.find({
    date: { $regex: `^${year}-${month}` },
  });

  res.json(entries);
};

/* UPDATE ENTRY */
export const updateEntry = async (req, res) => {
  const { id } = req.params;
  const { bottles, paidBy } = req.body;

  const totalAmount = bottles * 25;

  const updated = await WaterEntry.findByIdAndUpdate(
    id,
    { bottles, paidBy, totalAmount },
    { new: true }
  );

  res.json(updated);
};
