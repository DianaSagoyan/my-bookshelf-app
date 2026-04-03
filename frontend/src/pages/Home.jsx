import "../styles/styles.css";
import Intro from "../components/intro";
import BookImages from "../components/book-images";
import Card from "../components/card";
import Footer from "../components/footer";
import IntroNavbar from "../components/intro_navbar";

function Home() {
  return (
    <div className="App">
      <IntroNavbar />
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
