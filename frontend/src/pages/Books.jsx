import "../styles/styles.css";
import "../styles/books.css";
// import "../components/intro_navbar";
import Navbar from "../components/navbar";
import Form from "../components/Form";

import { useState, useEffect } from "react";

function Books() {
  const [currentBook, setCurrentBook] = useState(null);

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
            <button className="add-quote-btn">Add Quote</button>
          </div>
        </div>

        <Form />
      </div>
    </div>
  );
}

export default Books;
