import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const createBook = async (req, res) => {
  try {
    const { title, author } = req.body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
      },
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
