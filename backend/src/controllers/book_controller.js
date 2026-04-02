import express from "express";
import { prisma } from "../lib/prisma.js";
// import { error } from "node:console";

export const getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({ where: { userId: req.userId } });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getBook = async (req, res) => {
  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
    });

    if (!book) return res.status(404).json({ error: "Book not found" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const createBook = async (req, res) => {
  try {
    console.log("Create book hit");
    console.log("Body:", req.body);
    console.log("UserId:", req.userId);
    const { title, author, genre, description, status, userId } = req.body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        genre,
        description,
        status,
        userId: req.userId,
      },
    });

    console.log("Book created:", book);
    res.status(201).json(book);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const id = req.params;
    const { title, author, genre, description, status } = req.body;

    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: { title, author, genre, description, status },
    });

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const id = req.params;
    const book = await prisma.book.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Book deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
