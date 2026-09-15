import Navbar from "../components/navbar";
import BookList from "../components/BookList";
import { useEffect, useState } from "react";
import "../styles/styles.css";

export default function ReadBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchReadBooks = async () => {
      const res = await fetch("http://localhost:5000/books/read", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setBooks(Array.isArray(data) ? data : []);
    };

    fetchReadBooks();
  }, []);

  return (
    <div>
      <Navbar />
      <BookList books={books} mode="read" />
    </div>
  );
}
