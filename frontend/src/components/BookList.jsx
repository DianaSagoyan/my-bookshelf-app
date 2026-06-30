import { useNavigate } from "react-router-dom";
import "../styles/lists.css";

export default function BookList({ books, mode, onStartReading }) {
  const navigate = useNavigate();
  return (
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
              onClick={() => navigate(`/quotes/${book.id}`)}
            >
              Update
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
