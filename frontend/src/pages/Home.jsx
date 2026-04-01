import "../styles/styles.css";
import Intro from "../components/intro";
import BookImages from "../components/book-images";
import Card from "../components/card";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

function Home() {
  return (
    <div className="App">
      <Navbar />
      <Intro />
      <BookImages />

      <section className="cards">
        <Card />
        <Card />
        <Card />
      </section>

      <Footer />
    </div>
  );
}

export default Home;
