import { useState, useEffect } from "react";

const emptyForm = {
  title: "",
  author: "",
  genre: "",
  description: "",
  status: "WANT_TO_READ",
};

export default function Form({ book, onSuccess }) {
  const [error, setError] = useState(null);
  const [form, setForm] = useState(
    book
      ? {
          title: book.title || "",
          author: book.author || "",
          genre: book.genre || "",
          description: book.description || "",
          status: book.status || "WANT_TO_READ",
        }
      : emptyForm,
  );

  const isEditing = Boolean(book);

  useEffect(() => {
    setForm(
      book
        ? {
            title: book.title || "",
            author: book.author || "",
            genre: book.genre || "",
            description: book.description || "",
            status: book.status || "WANT_TO_READ",
          }
        : emptyForm,
    );
  }, [book]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const url = isEditing
      ? `${import.meta.env.VITE_API_URL}/books/${book.id}`
      : `${import.meta.env.VITE_API_URL}/books`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok)
        throw new Error(
          isEditing ? "Failed to update the book" : "Failed to add the book",
        );
      const data = await res.json();
      setForm(emptyForm);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{isEditing ? "Update Book" : "Add a Book"}</h2>
        {error && <p>{error}</p>}
        <div className="modal-input">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
          />
          <input
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
          />
          <input
            name="genre"
            placeholder="Genre"
            value={form.genre}
            onChange={handleChange}
          />
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="WANT_TO_READ">Want to Read</option>
            <option value="READING">Reading</option>
            <option value="READ">Read</option>
          </select>
          <button className="add-book-btn" onClick={handleSubmit}>
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
}
