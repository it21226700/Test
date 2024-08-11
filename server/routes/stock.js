import express from "express";
import {
  createStock,
  deleteStock,
  getStockById,
  getStocks,
  updateStock,
} from "../controller/stock.js";

const router = express.Router();

router.get("/", getStocks);
router.post("/", createStock);
router.get("/:stockId", getStockById);
router.delete("/:stockId", deleteStock);
router.patch("/:stockId", updateStock);

export default router;
