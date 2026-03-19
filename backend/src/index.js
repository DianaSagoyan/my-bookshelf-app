import express from "express";
// import bookRoutes from "./routes/bookRoutes";

const app = express();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
