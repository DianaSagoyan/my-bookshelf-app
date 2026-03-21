import express from "express";
import { prisma } from "../lib/prisma.js";
import { error } from "node:console";

export const getBooks = async (req, res) => {
  try {
    const books = prisma.book.findMany();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getBook = async (req, res) => {
  try {
    const book = prisma.book.findUnique({
      where: { id: parseInt(id) },
    });

    if (!book) return res.status(404).json({ error: "Book not found" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, genre, description, status, userId } = req.body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        genre,
        description,
        status,
        userId,
      },
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const id = req.params;
    const { title, author, genre, description, status } = req.body;

    const book = prisma.book.update({
      where: { id: id },
      data: { title, author, genre, description, status },
    });

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
