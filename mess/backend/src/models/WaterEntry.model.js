import mongoose from "mongoose";

const waterEntrySchema = new mongoose.Schema(
  {
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    bottles: {
      type: Number,
      required: true,
      min: 1,
    },
    pricePerBottle: {
      type: Number,
      default: 25,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paidBy: {
      type: String,
      enum: ["Subhadip", "Rajdeep", "Santu Da"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("WaterEntry", waterEntrySchema);
