import BookList from "../components/BookList";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import "../styles/styles.css";

export default function ToRead() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null)
  const [loadingId, setLoadingId] = useState(null);

  const handleStartReading = async (id) => {
    setLoadingId(id)
    try {
      const res = await fetch(`http://localhost:5000/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status: "READING" }),
    });

    const data = await res.json().catch(() => {})

    if (!res.ok) {
      setError(data.error || "Couldn't start reading this book");
      return;
    }
    setError(null);
    setBooks((prev) => prev.filter((book) => book.id !== id));
  } finally {
    setLoadingId(null)
  }
  };

  const handleBookAdded = (newBook) => {
    setBooks(prev => {
      const exists = prev.some(b => b.id === newBook.id);
      return exists ? prev.map(b=> b.id === newBook.id ? newBook : b):[...prev, newBook]})
  }

  const handleBookDeleted = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
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
      {error && <p className="error-message">{error}</p>}
      <BookList
        books={books}
        mode="toRead"
        onStartReading={handleStartReading}
        onBookAdded={handleBookAdded}
        onBookDeleted={handleBookDeleted}
        loadingId={loadingId}
      />
    </div>
  );
}
