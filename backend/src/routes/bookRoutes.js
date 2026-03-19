import express from "express";
import { createBook } from "../controllers/book_controller";

const router = express.Router();
router.post("/books", createBook);

export default router;
