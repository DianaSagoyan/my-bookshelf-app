// import { error } from "node:console";
import "../styles/lists.css";
import { useState, useEffect } from "react";

export default function QuoteList() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      const res = await fetch(`http://localhost:5000/quotes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setQuotes(Array.isArray(data) ? data : []);
    };
    fetchQuotes();
  }, []);

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
            <span className="quote-card__mark" aria-hidden="true"></span>
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
