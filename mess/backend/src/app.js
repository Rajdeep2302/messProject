import express from "express";
import cors from "cors";
import waterEntryRoutes from "./routes/waterEntry.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/water", waterEntryRoutes);

export default app;
