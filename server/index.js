import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import stockRoutes from "./routes/stock.js";
import stockRoutes from "./routes/stock.js";
import connectMongoDB from "./db/connectMongoDB.js";

const app = express();
dotenv.config();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import Routes stock route
app.use("/stock", stockRoutes);

// Connect to DB
connectMongoDB();

// Routes

app.get("/", (req, res) => {
  res.send("We are on home");
});

// How do we start listening to the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

export default app;
