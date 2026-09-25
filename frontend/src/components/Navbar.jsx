import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        BestBuy <span>AI</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/chatbot">AI Chatbot</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <Link to="/login" className="logout-btn">
        Login
      </Link>
    </nav>
  );
}

export default Navbar;