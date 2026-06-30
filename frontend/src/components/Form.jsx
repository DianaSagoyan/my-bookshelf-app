import { useState, useEffect } from "react";
import "../styles/styles.css";
import "../styles/books.css";

const emptyForm = {
  title: "",
  author: "",
  genre: "",
  description: "",
  status: "WANT_TO_READ",
};

export default function Form() {
  const [form, setForm] = useState(emptyForm);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchBooks = () => {
    fetch(`${import.meta.env.VITE_API_URL}/books`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch books");
        setLoading(false);
      });
  };

  useEffect(
    () => fetchBooks(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const method = "POST";
    const url = `${import.meta.env.VITE_API_URL}/books`;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      setBooks([...books, data]);
      setForm(emptyForm);
      // closeModal();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add a Book</h2>
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
