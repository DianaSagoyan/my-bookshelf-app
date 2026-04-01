import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="nav">
      <ul>
        <li>
          <button className="btn-login" onClick={() => navigate("/login")}>
            login
          </button>
        </li>
        <li>
          <button className="btn-sign-up" onClick={() => navigate("/register")}>
            Sign up
          </button>
        </li>
      </ul>
    </div>
  );
}
