import "dotenv/config";
import express from "express";
import cors from "cors";
import bookRoutes from "./routes/book_routes.js";

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // ready for authentication later
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bookshelf");
});

app.use(bookRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
