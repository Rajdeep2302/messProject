import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { initCronJobs } from "./src/services/cronService.js";

const PORT = process.env.PORT || 5000;

connectDB();
initCronJobs();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
