import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <main className="home-page">
        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-tag">AI POWERED SHOPPING</span>

            <h1>
              Find the <span>Best Product</span> for You
            </h1>

            <p>
              Tell BestBuy AI what you need, your budget and your
              requirements. Our AI assistant helps you discover
              suitable products quickly.
            </p>

            <div className="hero-buttons">
              <Link to="/chatbot" className="primary-btn">
                Start AI Search →
              </Link>

              <Link to="/products" className="secondary-btn">
                Browse Products
              </Link>
            </div>
          </div>

          <div className="ai-card">
            <div className="ai-card-header">
              <div className="bot-circle">🤖</div>

              <div>
                <h3>BestBuy AI</h3>
                <span>● Online</span>
              </div>
            </div>

            <div className="message ai-message">
              Hi! What product are you looking for?
            </div>

            <div className="message user-message">
              I need a phone under ₹20,000
            </div>

            <div className="message ai-message">
              Sure! Let me find the best options for you.
            </div>
          </div>
        </section>

        <section className="category-section">
          <div className="section-title">
            <span>EXPLORE</span>
            <h2>Shop by Category</h2>
          </div>

          <div className="category-grid">
            <Link to="/products" className="category-card">
              <div>📱</div>
              <h3>Smartphones</h3>
              <p>Find your next phone</p>
            </Link>

            <Link to="/products" className="category-card">
              <div>💻</div>
              <h3>Laptops</h3>
              <p>Work and gaming laptops</p>
            </Link>

            <Link to="/products" className="category-card">
              <div>🎧</div>
              <h3>Headphones</h3>
              <p>Audio for every need</p>
            </Link>

            <Link to="/products" className="category-card">
              <div>📷</div>
              <h3>Cameras</h3>
              <p>Capture every moment</p>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;