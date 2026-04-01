import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { error } from "node:console";
import { use } from "react";

const JWT_SECRET = process.env.JWT_SECRET;

//REGISTER
export const register = async (req, res) => {
  try {
    console.log("Register hit");
    console.log("Body:", req.body);
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    console.log("Existing user:", existingUser);

    if (existingUser)
      return res.status(400).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed");

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    console.log("User created:", user);
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("Token created");
    res.status(201).json({ token, userId: user.id });
  } catch (error) {
    console.log("Error:", error); // add this
    res.status(500).json({ error: "Something went wrong" });
  }
};

//LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Wrong credentials" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
