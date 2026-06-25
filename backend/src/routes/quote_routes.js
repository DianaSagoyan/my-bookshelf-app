import express from "express";
import {
  getQuotes,
  getQuotesByBook,
  addQuote,
  updateQuote,
  deleteQuote,
} from "../controllers/quote_controller.js";
import { authenticate } from "../middleware/auth_middleware.js";

const router = express.Router();

router.get("/quotes/:bookId", authenticate, getQuotesByBook);
router.get("/quotes", authenticate, getQuotes);
router.post("/quotes", authenticate, addQuote);
router.put("/quotes/:quoteId", authenticate, updateQuote);
router.delete("/quotes/:quoteId", authenticate, deleteQuote);

export default router;
