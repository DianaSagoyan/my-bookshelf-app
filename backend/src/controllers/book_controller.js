// import express from "express";
import { error } from "node:console";
import { prisma } from "../lib/prisma.ts";
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
    const id = req.params;
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
    });

    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, genre, description, status, userId, rating } = req.body;

    if(status === "READING"){
      const existing = await prisma.book.findFirst({
        where: {userId: req.userId, status: "Reading"}
      });

      if(existing){
        return res.status(409).json({
          error: "You already have a book marked as currently reading"
        })
      }
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        genre,
        description,
        status,
        rating,
        userId: req.userId,
      },
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, description, status, rating } = req.body;

    if(status === "READING"){
      const existing = await prisma.book.findFirst({
        where: {userId: req.userId, status: "READING", id: {not: parseInt(id)}}
      })
      if(existing){
        res.status(409).json({error: "You already have a book marked as currently reading."})
      }
    }

    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: { title, author, genre, description, status, rating },
    });

    res.status(200).json(book);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Book deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getCurrentlyReading = async (req, res) => {
  try {
    const book = await prisma.book.findFirst({
      where: {
        userId: req.userId,
        status: "READING",
      },
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getReadBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      where: {
        userId: req.userId,
        status: "READ",
      },
    });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getWantToRead = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      where: {
        userId: req.userId,
        status: "WANT_TO_READ",
      },
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
