import bookshelf from "../images/books.svg";

export default function BookImages() {
  return (
    <section class="book-imgs">
      <img src={bookshelf} alt="Book Shelf" class="books1"></img>
      <img src={bookshelf} alt="Book Shelf" class="books2"></img>
    </section>
  );
}
