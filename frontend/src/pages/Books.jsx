import "../styles/styles.css";
import "../components/navbar";
// import Navbar from "../components/navbar";

import { useState, useEffect } from "react";

const emptyForm = {
  title: "",
  author: "",
  genre: "",
  description: "",
  status: "WANT_TO_READ",
};

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [form, setForm] = useState(emptyForm);
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

  const openCreateModal = () => {
    setEditBook(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (book) => {
    setEditBook(book);
    setForm({
      title: book.title,
      author: book.author,
      genre: book.genre || "",
      description: book.description || "",
      status: book.status,
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setEditBook(null);
    setForm(emptyForm);
  };

  const handleSubmit = async () => {
    const method = editBook ? "PUT" : "POST";
    const url = editBook
      ? `${import.meta.env.VITE_API_URL}/books/${editBook.id}`
      : `${import.meta.env.VITE_API_URL}/books`;
    const token = localStorage.getItem("token");

    console.log("Token:", token); // add this
    console.log("Form:", form); // add this

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

      if (editBook) {
        setBooks(books.map((b) => (b.id === editBook.id ? data : b)));
      } else {
        setBooks([...books, data]);
      }

      closeModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/books/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(books.filter((b) => b.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>My Books</h1>
      <button onClick={openCreateModal}>+ Add Book</button>

      {books.length === 0 ? (
        <p>No books yet</p>
      ) : (
        books.map((book) => (
          <div key={book.id}>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.genre}</p>
            <p>{book.description}</p>
            <p>{book.status}</p>
            <button onClick={() => openEditModal(book)}>Edit</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </div>
        ))
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editBook ? "Edit Book" : "Add Book"}</h2>
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
            <button onClick={handleSubmit}>
              {editBook ? "Update" : "Create"}
            </button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Books;
