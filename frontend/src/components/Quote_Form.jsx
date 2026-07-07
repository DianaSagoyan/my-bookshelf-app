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
}
