import "../styles/styles.css";
import Intro from "../components/intro";
import BookImages from "../components/book-images";
import Card from "../components/card";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

function App() {
  return (
    <div className="App">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Italiana:wght@400;700&display=swap"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Italiana&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
      </head>

      <Navbar />
      <Intro />
      <BookImages />

      <section class="cards">
        <Card />
        <Card />
        <Card />
      </section>

      <Footer />
    </div>
  );
}

export default App;
