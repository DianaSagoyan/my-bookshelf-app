import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Quotes from "./pages/Quotes";
import ReadBooks from "./pages/ReadBooks";
import ToRead from "./pages/ToRead";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/read" element={<ReadBooks />} />
        <Route path="/want-to-read" element={<ToRead />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
