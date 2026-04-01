import express from "express";
import {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/book_controller.js";
import { authenticate } from "../middleware/auth_middleware.js";

const router = express.Router();

router.get("/books/:id", authenticate, getBook);
router.get("/books", authenticate, getBooks);
router.post("/books", authenticate, createBook);
router.put("/books/:id", authenticate, updateBook);
router.delete("books/:id", authenticate, deleteBook);

export default router;
