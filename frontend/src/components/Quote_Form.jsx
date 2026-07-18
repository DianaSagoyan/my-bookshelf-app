import { useEffect, useState } from "react";

const emptyForm = {
  quote: "",
  page: "",
  book: "",
};

export default function QuoteForm({ quote, onSuccess }) {
  const [error, setError] = useState(null);
  const [form, setForm] = useState(
    quote
      ? {
          text: quote.text,
          page: quote.page,
          book: quote.book,
        }
      : emptyForm,
  );

  const isEditing = Boolean(quote);

  useEffect(
    () =>
      setForm(
        quote
          ? {
              text: quote.text,
              page: quote.page,
              book: quote.book,
            }
          : emptyForm,
      ),
    [quote],
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.text || !form.book) {
      setError("Quote and the name of the book are required");
    }

    const token = localStorage.getItem("token");
    const url = isEditing
      ? `${import.meta.env.VITE_API_URL}/quotes/${quote.id}`
      : `${import.meta.env.VITE_API_URL}/quotes`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(
          isEditing ? "Quote coudn't be uodated" : "Quote can't be created",
        );
      }

      const data = await res.json();
      setForm(emptyForm);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{isEditing ? "Update Quote" : "Create Quote"}</h2>
        {error && <p>{error}</p>}
        <div className="modal-input">
          <input
            name="text"
            placeholder="Add quote"
            value={form.text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <input
            name="page"
            placeholder="Page"
            value={form.page}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <input
            name="book"
            placeholder="Book"
            value={form.book}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <button className="add-book-btn" onClick={() => handleSubmit()}>
            {isEditing ? "Update quote" : "Add quote"}
          </button>
        </div>
      </div>
    </div>
  );
}
