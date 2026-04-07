import express from "express";
import { prisma } from "../lib/prisma.js";

export const getQuotes = async (req, res) => {
  try {
    const quotes = await prisma.quote.findMany({
      where: { book: { userId: req.userId } },
    });
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ error: "Somthing went wrong" });
  }
};

export const getQuotesByBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const quotes = await prisma.quote.findMany({
      where: { book: { userId: req.userId }, bookId: parseInt(bookId) },
    });
  } catch (error) {
    res.status(500).json({ error: "Somthing went wrong" });
  }
};

export const addQuote = async (req, res) => {
  try {
    const { text, page, bookId } = req.body;

    const quote = await prisma.quote.create({
      data: {
        text,
        page,
        bookId,
      },
    });

    res.status(201).json(quote);
  } catch (error) {
    res.status(500).json({ error: "Somthing went wrong" });
  }
};

export const updateQuote = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const { text, page } = req.body;

    const quote = await prisma.quote.update({
      data: { text, page },
      where: { id: parseInt(quoteId) },
    });

    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json({ error: "Somthing went wrong" });
  }
};

export const deleteQuote = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const quote = await prisma.quote.delete({
      where: { id: parseInt(quoteId) },
    });

    res.status(200).json({ message: "Quote Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Somthing went wrong" });
  }
};
