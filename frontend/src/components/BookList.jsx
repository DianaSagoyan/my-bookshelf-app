import { useNavigate } from "react-router-dom";
import "../styles/lists.css";
import { useState } from "react";
import Form from "./Form";

export default function BookList({ books, mode, onStartReading }) {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id} className="book-list-item">
            <div>
              <span className="book-title">{book.title}</span>
              <span className="book-author">{book.author}</span>
            </div>
            <div className="book-actions">
              {mode === "read" && (
                <button
                  className="book-quotes-btn"
                  onClick={() => navigate(`/quotes/${book.id}`)}
                >
                  Quotes
                </button>
              )}
              {mode === "toRead" && (
                <button
                  className="book-quotes-btn"
                  onClick={() => onStartReading(book.id)}
                >
                  Start Reading
                </button>
              )}
              <button
                className="book-quotes-btn"
                onClick={() => setSelectedBook(book)}
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedBook && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button
              className="modal-close"
              onClick={() => setSelectedBook(null)}
            >
              X
            </button>
            <Form book={selectedBook} onSuccess={() => setSelectedBook(null)} />
          </div>
        </div>
      )}
    </>
  );
}
