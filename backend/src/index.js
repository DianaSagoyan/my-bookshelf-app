import express from "express";
import bookRoutes from "./routes/book_routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bookshelf");
});

app.use(bookRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
