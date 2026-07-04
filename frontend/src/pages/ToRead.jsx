import BookList from "../components/BookList";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import "../styles/styles.css";

export default function ToRead() {
  const [books, setBooks] = useState([]);

  const handleStartReading = async (id) => {
    const res = await fetch(`http://localhost:5000/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status: "READING" }),
    });

    if (res.ok) {
      setBooks((prev) => prev.filter((book) => book.id !== id));
    }
  };

  useEffect(() => {
    const fetchWantToRead = async () => {
      const res = await fetch("http://localhost:5000/books/want-to-read", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setBooks(Array.isArray(data) ? data : []);
    };

    fetchWantToRead();
  }, []);

  return (
    <div>
      <Navbar />
      <BookList
        books={books}
        mode="toRead"
        onStartReading={handleStartReading}
      />
    </div>
  );
}
