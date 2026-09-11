// import { error } from "node:console";
import "../styles/lists.css";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

export default function QuoteList({ bookId }) {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const url = bookId
      ? `http://localhost:5000/quotes/${bookId}`
      : `http://localhost:5000/quotes/`;
    const fetchQuotes = async () => {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setQuotes(Array.isArray(data) ? data : []);
    };
    fetchQuotes();
  }, [bookId]);

  const handleDelete = async (quoteId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/quotes/${quoteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Couldn't delete quote");
      setQuotes((prev) => prev.filter((q) => q.id != quoteId));
    } catch (err) {
      console.error(err);
    }
  };

  if (quotes.length === 0) {
    return (
      <p className="quote-list-empty">
        No quotes yet — add one from a book's page.
      </p>
    );
  }

  return (
    <ul className="quote-list">
      {quotes.map((quote) => (
        <li key={quote.id} className="quote-card">
          <span className="quote-card__spine" aria-hidden="true"></span>
          <div className="quote-card__body">
            <button
              className="quote-card__delete"
              onClick={() => handleDelete(quote.id)}
              aria-label="Delete quote"
            >
              {/* <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
              </svg> */}
              <Trash2 />
            </button>
            <span className="quote-card__mark" aria-hidden="true">
              &ldquo;
            </span>
            <p className="quote-card__text">{quote.text}</p>
            <p className="quote-card__meta">
              {quote.book?.title}
              {quote.page ? `- p. ${quote.page}` : ""}
            </p>
          </div>
          {/* {quote.text} - {quote.book.title} */}
        </li>
      ))}
    </ul>
  );
}
