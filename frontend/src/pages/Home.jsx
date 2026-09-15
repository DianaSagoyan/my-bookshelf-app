import "../styles/styles.css";
import Intro from "../components/Intro";
import BookImages from "../components/Book-images";
import Card from "../components/Card";
import Footer from "../components/Footer";
import IntroNavbar from "../components/Intro_navbar";

function Home() {
  return (
    <div className="App">
      <IntroNavbar />
      <Intro />
      <BookImages />

      <section className="cards">
        <Card
          title="Track every book you read"
          description="Log what you're reading, what's finished, and what's next. See your whole reading history in one place."
        />
        <Card
          title="Save the lines that stay with you"
          description="Pull quotes straight from the page and attach them to the book they came from, so you never lose track of where a line came from."
        />
        <Card
          title="Organize your shelf your way"
          description="Sort books by status — read, reading, or want to read — and build a shelf that reflects your actual reading life, not someone else's algorithm."
        />
      </section>

      <Footer />
    </div>
  );
}

export default Home;
