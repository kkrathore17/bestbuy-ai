import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem(
      "bestbuyLoggedIn"
    );

    const savedUser = localStorage.getItem(
      "bestbuyUser"
    );

    if (loggedIn !== "true" || !savedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(savedUser));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("bestbuyLoggedIn");
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="profile-page">
        <div className="profile-card">

          <div className="profile-avatar">
            {user.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <h1>{user.name}</h1>

          <p className="profile-email">
            {user.email}
          </p>

          <div className="profile-details">

            <div className="profile-detail">
              <span>👤 Account</span>
              <strong>Customer</strong>
            </div>

            <div className="profile-detail">
              <span>🤖 AI Assistant</span>
              <strong>BestBuy AI</strong>
            </div>

            <div className="profile-detail">
              <span>📊 Status</span>
              <strong>Active</strong>
            </div>

          </div>

          <button
            className="profile-logout"
            onClick={logout}
          >
            Logout
          </button>

        </div>
      </main>
    </>
  );
}

export default Profile;