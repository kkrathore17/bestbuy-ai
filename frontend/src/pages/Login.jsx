import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleCustomerLogin = (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password || (isRegister && !name)) {
      setMessage("Please fill all fields.");
      return;
    }

    if (isRegister) {
      const user = {
        name,
        email,
        password
      };

      localStorage.setItem(
        "bestbuyUser",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "bestbuyLoggedIn",
        "true"
      );

      navigate("/profile");
      return;
    }

    const savedUser = localStorage.getItem("bestbuyUser");

    if (!savedUser) {
      setMessage(
        "No account found. Please create an account first."
      );
      return;
    }

    const user = JSON.parse(savedUser);

    if (
      user.email === email &&
      user.password === password
    ) {
      localStorage.setItem(
        "bestbuyLoggedIn",
        "true"
      );

      navigate("/profile");
    } else {
      setMessage("Invalid email or password.");
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">

        <div className="login-logo">
          BestBuy <span>AI</span>
        </div>

        <div className="login-heading">
          <h1>
            {isRegister
              ? "Create Account"
              : "Welcome Back"}
          </h1>

          <p>
            {isRegister
              ? "Create your BestBuy AI customer account"
              : "Login to continue to BestBuy AI"}
          </p>
        </div>

        <div className="login-type-buttons">

          <button
            type="button"
            className="login-type-active"
          >
            👤 Customer
          </button>

          <button
            type="button"
            className="login-type-admin"
            onClick={() => navigate("/admin-login")}
          >
            🛡️ Admin
          </button>

        </div>

        <form onSubmit={handleCustomerLogin}>

          {isRegister && (
            <div className="login-field">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </div>
          )}

          <div className="login-field">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="login-field">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          {message && (
            <div className="login-message">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="login-submit"
          >
            {isRegister
              ? "Create Account"
              : "Login as Customer"}
          </button>

        </form>

        <div className="login-switch">

          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setMessage("");
            }}
          >
            {isRegister
              ? "Login"
              : "Create Account"}
          </button>

        </div>

      </div>
    </main>
  );
}

export default Login;