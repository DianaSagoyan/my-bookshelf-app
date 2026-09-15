import "../styles/styles.css";
import "../styles/books.css";
import Navbar from "../components/navbar";
import Form from "../components/Form";
import QuoteForm from "../components/Quote_Form";

import { useState, useEffect } from "react";

function Books() {
  const [currentBook, setCurrentBook] = useState(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/books/currently-reading`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCurrentBook(data));
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="currently_reading">
          <h2 className="current-book-header">Currently Reading</h2>
          <div className="current-book-box">
            <div className="current-book">
              <p>
                {currentBook ? currentBook.title : "No Book currently Reading"}
              </p>
            </div>
            <button
              className="add-quote-btn"
              onClick={() => setShowQuoteForm(true)}
            >
              Add Quote
            </button>
          </div>
        </div>

        {showQuoteForm && currentBook && (
          <div className="modal-overlay">
            <div className="modal-box">
              <button
                className="modal-close"
                onClick={() => setShowQuoteForm(false)}
              >
                X
              </button>
              <QuoteForm
                bookId={currentBook.id}
                onSuccess={() => setShowQuoteForm(false)}
              />
            </div>
          </div>
        )}

        <Form />
      </div>
    </div>
  );
}

export default Books;
