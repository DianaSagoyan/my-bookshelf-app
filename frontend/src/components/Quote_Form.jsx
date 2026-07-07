import { useEffect, useState } from "react";

const emptyForm = {
  quote: "",
  page: "",
  book: "",
};

export default function QuoteForm({ quote }) {
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
    setForm(...form, { [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!quote.text || !quote.book) {
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
        throw new error(
          isEditing ? "Quote coudn't be uodated" : "Quote can't be created",
        );
      }

      const data = await res.json();
      setForm(emptyForm);
    } catch (err) {
      setError(err.message);
    }
  };
}
