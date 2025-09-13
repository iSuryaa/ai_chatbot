import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <div className="header-content">
        <span><h2 className="header-text">AI Customer Support</h2></span>
        <button onClick={handleLogout} className="log-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}
