import { Navigate } from "react-router-dom";
import "../styles/lists.css";

export default function BookList({ books }) {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id} className="book-list-item">
          <div>
            <span className="book-title">{book.title}</span>
            <span className="book-author">{book.author}</span>
          </div>
          <button
            className="book-quotes-btn"
            onClick={() => Navigate(`/quotes/${book.id}`)}
          >
            Quotes
          </button>
        </li>
      ))}
    </ul>
  );
}
