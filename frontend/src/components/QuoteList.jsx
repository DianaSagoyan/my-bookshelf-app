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
  return (
    <ul className="book-list">
      {quotes.map((quote) => (
        <li key={quote.id}>
          {quote.text} - {quote.book.title}
        </li>
      ))}
    </ul>
  );
}
