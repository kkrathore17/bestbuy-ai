import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage("Please fill all fields.");
      return;
    }

    if (
      email === "admin@bestbuy.ai" &&
      password === "admin123"
    ) {
      localStorage.setItem("bestbuyAdminLoggedIn", "true");
      navigate("/admin");
    } else {
      setMessage("Invalid admin email or password.");
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">

        <div className="admin-login-logo">
          BestBuy <span>AI</span>
        </div>

        <div className="admin-login-icon">
          🛡️
        </div>

        <div className="admin-login-heading">
          <h1>Admin Login</h1>
          <p>Login to access the admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="admin-login-field">
            <label>Admin Email</label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="admin-login-field">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {message && (
            <div className="admin-login-message">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="admin-login-submit"
          >
            Login as Admin
          </button>

        </form>

        <button
          className="admin-back-btn"
          onClick={() => navigate("/login")}
        >
          ← Back to Customer Login
        </button>

      </div>
    </main>
  );
}

export default AdminLogin;