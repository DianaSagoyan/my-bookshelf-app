import "../styles/styles.css";
import "../components/navbar";
// import Navbar from "../components/navbar";

import { useState, useEffect } from "react";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/books`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch books");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>My Books</h1>
      {books.length === 0 ? (
        <p>No books yet</p>
      ) : (
        books.map((book) => (
          <div key={book.id}>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.genre}</p>
            <p>{book.description}</p>
            <p>{book.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Books;
