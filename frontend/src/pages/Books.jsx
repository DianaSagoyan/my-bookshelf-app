import "../styles/styles.css";
import "../components/intro_navbar";
import Navbar from "../components/navbar";
import "../styles/books.css";

import { useState, useEffect } from "react";
import { Beaker } from "lucide-react";

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
  const [form, setForm] = useState(emptyForm);
  const token = localStorage.getItem("token");
  const [currentBook, setCurrentBook] = useState(null);

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

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/books/currently-reading`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCurrentBook(data));
  }, []);

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

  return (
    <div>
      <Navbar />

      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <div className="currently_reading">
              <h2 className="current-book-header">Currently Reading</h2>
              <div className="current-book-box">
                <div className="current-book">
                  <p>
                    {currentBook
                      ? currentBook.title
                      : "No Book currently Reading"}
                  </p>
                </div>
              </div>
            </div>

            <div className="modal">
              <div className="modal-content">
                {/* <h2>{editBook ? "Edit Book" : "Add a Book"}</h2> */}
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
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="WANT_TO_READ">Want to Read</option>
                    <option value="READING">Reading</option>
                    <option value="READ">Read</option>
                  </select>
                  <button className="add-book-btn" onClick={handleSubmit}>
                    {/* {editBook ? "Update" : "Add Book"} */}
                    Add Book
                  </button>
                  {/* <button onClick={closeModal}>Cancel</button> */}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Books;
