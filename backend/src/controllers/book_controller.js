import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const createBook = async (req, res) => {
  try {
    const { title, author, readStatus, userId } = req.body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        readStatus,
        userId,
      },
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
