import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Quotes from "./pages/Quotes";
import ReadBooks from "./pages/ReadBooks";
import ToRead from "./pages/ToRead";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <Books />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/quotes"
          element={
            <ProtectedRoute>
              <Quotes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quotes/:bookId"
          element={
            <ProtectedRoute>
              <Quotes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/read"
          element={
            <ProtectedRoute>
              <ReadBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/want-to-read"
          element={
            <ProtectedRoute>
              <ToRead />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
