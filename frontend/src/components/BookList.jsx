import { useNavigate } from "react-router-dom";
import "../styles/lists.css";
import { useState } from "react";
import Form from "./Form";

export default function BookList({ books, mode, onStartReading }) {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);

  // Color mapping for genres
  const genreColors = {
    Fiction: "#FF7A45",
    Psychology: "#4A4A4A",
    "Science Fiction": "#FFA500",
    "Self-Help": "#4ECDC4",
    Technology: "#5A5A6A",
    History: "#2196F3",
    Philosophy: "#FF6B6B",
    Dystopian: "#4ECDC4",
  };

  const getColorForGenre = (genre) => {
    return genreColors[genre] || "#888888";
  };

  return (
    <>
      {/* <ul className="book-list">
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
      </ul> */}

      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <div
              className="book-sidebar"
              style={{ backgroundColor: getColorForGenre(book.genre) }}
            >
              <span className="book-sidebar0tex">
                {book.title.toUpperCase()}
              </span>
            </div>

            <div className="book-content">
              <div>
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
              </div>

              <div className="book-meta">
                <span className="meta-badge">{book.genre}</span>
                {/* {book.dateFinished && (
                  <span className="meta-badge">
                    {new Date(book.dateFinished).getFullYear()}
                  </span>
                )} */}
              </div>
              {/* {book.notes && (
                <p className="book-quote">"{book.notes}"</p>
              )} */}

              <div className="book-actions">
                {mode === "read" && (
                  <button
                    className="action-btn"
                    onCLick={() => navigate(`/quotes/${book.id}`)}
                  >
                    Quotes
                  </button>
                )}

                {mode === "toRead" && (
                  <button
                    className="action-btn"
                    onClick={() => onStartReading(book.id)}
                  >
                    Start Reading
                  </button>
                )}

                <button
                  className="action-btn"
                  onClick={() => setSelectedBook(book)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
