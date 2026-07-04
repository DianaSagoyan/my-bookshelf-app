import Navbar from "../components/Navbar";
import "../styles/styles.css";
import QuoteList from "../components/QuoteList";
// import { useParams } from "react-router-dom";

export default function Quotes() {
  // const { bookId } = useParams();

  return (
    <div>
      <Navbar />
      <QuoteList />
    </div>
  );
}
