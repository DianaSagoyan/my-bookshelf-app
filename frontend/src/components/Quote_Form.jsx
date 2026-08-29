import { useEffect, useState } from "react";

const emptyForm = {
  quote: "",
  page: "",
  bookId: "",
};

export default function QuoteForm({ quote, bookId, onSuccess }) {
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(
    quote
      ? {
          text: quote.text || "",
          page: quote.page || "",
          bookId: quote.bookId || "",
        }
      : { ...emptyForm, bookId: bookId || "" },
  );

  const isEditing = Boolean(quote);
  const needsBookPicker = !bookId; // only show picker if no bookId was passed in

  useEffect(
    () =>
      setForm(
        quote
          ? {
              text: quote.text || "",
              page: quote.page || "",
              bookId: quote.bookId || "",
            }
          : { ...emptyForm, bookId: bookId || "" },
      ),
    [quote, bookId],
  );

  // fetch the user's books only if we actually need the picker
  useEffect(() => {
    if (!needsBookPicker) return;

    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_URL}/books`, {
      headers: { authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Couldn't load books");
        return res.json();
      })
      .then((data) => setBooks(data))
      .catch((err) => setError(err.message));
  }, [needsBookPicker]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.text) {
      setError("Quote text is required");
    }

    if (!form.bookId) {
      setError("Please select a book");
      return;
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
        body: JSON.stringify({
          text: form.text,
          page: form.page ? parseInt(form.page) : null,
          bookId: bookId,
        }),
      });

      if (!res.ok) {
        throw new Error(
          isEditing ? "Quote coudn't be updated" : "Quote can't be created",
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

          {needsBookPicker && (
            <select name="bookId" value={form.bookId} onChange={handleChange}>
              <option value="">Select a book</option>
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title}
                </option>
              ))}
            </select>
          )}

          {/* <input
            name="book"
            placeholder="Book"
            value={form.book}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          /> */}

          <button className="add-book-btn" onClick={() => handleSubmit()}>
            {isEditing ? "Update quote" : "Add quote"}
          </button>
        </div>
      </div>
    </div>
  );
}
