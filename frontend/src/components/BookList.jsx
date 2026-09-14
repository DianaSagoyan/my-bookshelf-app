import { useNavigate } from "react-router-dom";
import "../styles/lists.css";
import { useState } from "react";
import Form from "./Form";

export default function BookList({ books, mode, onStartReading }) {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Color mapping for genres
  const genreColors = {
    Fiction: "#FF7A45",
    Psychology: "#4A4A4A",
    "Science Fiction": "#FFA500",
    "Self-Help": "#4ECDC4",
    Technology: "#5A5A6A",
    History: "#2196F3",
    Motivation: "#8B9A6E",
    Dystopian: "#8FA28A",
  };

  const getColorForGenre = (genre) => {
    return genreColors[genre] || "#888888";
  };

  const openBookForm = () => {
    setShowForm(true);
  };

  return (
    <>
      <div className="add-button-section">
        <button className="add-book-section-btn" onClick={() => openBookForm()}>
          Add Book
        </button>
      </div>

      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <div
              className="book-sidebar"
              style={{ backgroundColor: getColorForGenre(book.genre) }}
            >
              <span className="book-sidebar-text">
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
              {book.description && (
                <p className="book-description">"{book.description}"</p>
              )}

              <div className="book-actions">
                {mode === "read" && (
                  <button
                    className="action-btn"
                    onClick={() => navigate(`/quotes/${book.id}`)}
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

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="modal-close" onClick={() => setShowForm(false)}>
              X
            </button>
            <Form book={selectedBook} onSuccess={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </>
  );
}
