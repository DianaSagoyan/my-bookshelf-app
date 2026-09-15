import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        const currentToken = localStorage.getItem("token");
        if (!currentToken) {
          window.location.href = "/login";
        }
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [navigate]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
