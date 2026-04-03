import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="nav">
        <p>My Bookshelf</p>
        <ul>
          <li>
            <button className="btn-login" onClick={() => navigate("/login")}>
              login
            </button>
          </li>
          <li>
            <button className="btn-login" onClick={() => navigate("/login")}>
              login
            </button>
          </li>
          <li>
            <button className="btn-login" onClick={() => navigate("/login")}>
              login
            </button>
          </li>
          <li>
            <button className="btn-sign-out" onClick={() => navigate("/login")}>
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
