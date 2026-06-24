import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="nav">
        <p className="nav_logo" onClick={() => navigate("/books")}>
          My Bookshelf
        </p>
        <ul className="div_list">
          {/* <p className="nav_logo">My Bookshelf</p> */}
          <li>
            <button className="btn-quotes" onClick={() => navigate("/quotes")}>
              Favourite Quotes
            </button>
          </li>
          <li>
            <button className="btn-login" onClick={() => navigate("/read")}>
              Books I've read
            </button>
          </li>
          <li>
            <button
              className="btn-login"
              onClick={() => navigate("/want-to-read")}
            >
              To Read
            </button>
          </li>
          <li>
            <button className="btn-login" onClick={() => navigate("/login")}>
              My Goal
            </button>
          </li>
          <li>
            <button className="btn-sign-out" onClick={() => navigate("/")}>
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
