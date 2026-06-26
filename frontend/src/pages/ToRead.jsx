import BookList from "../components/BookList";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import "../styles/styles.css";

export default function ToRead() {
  const [books, setBooks] = useState([]);

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
      <BookList books={books} mode="toRead" />
    </div>
  );
}
