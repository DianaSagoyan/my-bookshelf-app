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
        <Card />
        <Card />
        <Card />
      </section>

      <Footer />
    </div>
  );
}

export default Home;
