// import { error } from "node:console";
import "../styles/lists.css";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import QuoteForm from "./Quote_Form";

export default function QuoteList({ bookId }) {
  const [quotes, setQuotes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const url = bookId
      ? `${import.meta.env.VITE_API_URL}/quotes/${bookId}`
      : `${import.meta.env.VITE_API_URL}/quotes/`;
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/quotes/${quoteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Couldn't delete quote");
      setQuotes((prev) => prev.filter((q) => q.id != quoteId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  if (quotes.length === 0) {
    return (
      <>
        <div className="add-quote-button-section">
        <button className="add-quote-section-btn" onClick={handleShowForm}>
          Add Quote
        </button>
      </div>
      <p className="quote-list-empty">
        No quotes yet — add one from a book's page.
      </p>
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="modal-close" onClick={() => setShowForm(false)}>
              X
            </button>
            <QuoteForm
              bookId={bookId}
              onSuccess={(newQuote) => {
                setShowForm(false);
                setQuotes((prev) => [...prev, newQuote]);
              }}
            />
          </div>
        </div>
      )}
      </>
    );
  }
  
  return (
    <>
      <div className="add-quote-button-section">
        <button
          className="add-quote-section-btn"
          onClick={() => handleShowForm()}
        >
          Add Quote
        </button>
      </div>
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
          </li>
        ))}
      </ul>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="modal-close" onClick={() => setShowForm(false)}>
              X
            </button>
            <QuoteForm bookId={bookId} onSuccess={(newQuote) =>{ setShowForm(false);
            setQuotes(prev => {
              const exists = prev.some(q => q.id === newQuote.id);
              return exists ? 
              prev.map(q => (q.id === newQuote.id ? newQuote : q)) : [...prev, newQuote]
            });
            }} />
          </div>
        </div>
      )}
    </>
  );
}
