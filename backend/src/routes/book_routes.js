import express from "express";
import {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/book_controller.js";

const router = express.Router();

router.get("/books/:id", getBook);
router.get("/books", getBooks);
router.post("/books", createBook);
(router.put("/books/:id", updateBook), router.delete("books/:id", deleteBook));

export default router;
