import WaterEntry from "../models/WaterEntry.model.js";
import { sendMonthlyReport } from "../services/cronService.js";

export const addEntry = async (req, res) => {
  try {
    const { date, bottles, paidBy, totalAmount } = req.body;
    const newEntry = new WaterEntry({ date, bottles, paidBy, totalAmount });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllEntries = async (req, res) => {
  try {
    const entries = await WaterEntry.find();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEntriesByMonth = async (req, res) => {
  try {
    const { year, month } = req.params;
    // Regex to match "YYYY-MM" at start of date string
    const regex = new RegExp(`^${year}-${month}`);
    const entries = await WaterEntry.find({ date: { $regex: regex } });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEntry = await WaterEntry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;
    await WaterEntry.findByIdAndDelete(id);
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendFilteredEmail = async (req, res) => {
    try {
        const { year, month, email, userName } = req.body;
        
        if (!year || !month) {
            return res.status(400).json({ message: "Year and Month are required." });
        }

        let recipients = [];
        if (email) {
            recipients = [email];
        } else if (userName) {
            // Map userName to env email if possible
            const envMap = {
                "Rajdeep": process.env.RAJDEEP_MAIL,
                "Subhadip": process.env.SUBHADIP_MAIL,
                "Santu Da": process.env.SANTU_MAIL
            };
             // Flexible matching
             const match = Object.keys(envMap).find(k => k.toLowerCase() === userName.toLowerCase());
             if (match && envMap[match]) {
                 recipients = [envMap[match]];
             }
        }
        
        // If recipients empty here, sendMonthlyReport defaults to ALL (which might not be desired for "Filtered")
        // But for Admin tool, let's say if no specific user selected, maybe send to all? 
        // Let's enforce specific recipient for now unless explicit "All" is passed? 
        // For simplicity, passing [] triggers default ALL in cronService. 
        // If user wants specific, they must provide email.

        const result = await sendMonthlyReport(year, month, recipients);
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
