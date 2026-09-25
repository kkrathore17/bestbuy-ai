import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Chatbot.css";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchProducts = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userMessage
      }
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: userMessage
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Search failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text:
            data.count > 0
              ? `I found ${data.count} product${data.count > 1 ? "s" : ""} for you.`
              : "Sorry, I couldn't find a matching product.",
          products: data.results || []
        }
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "Unable to connect to BestBuy AI.",
          products: []
        }
      ]);
    }

    setLoading(false);
  };

  const suggestion = (text) => {
    setMessage(text);
  };

  return (
    <>
      <Navbar />

      <main className="chatbot-page">
        <div className="chatbot-container">

          <div className="chatbot-top">
            <div className="chatbot-avatar">🤖</div>

            <div>
              <h1>BestBuy AI</h1>
              <p>Smart Product Assistant</p>
            </div>

            <span className="online-status">
              ● Online
            </span>
          </div>

          <div className="chatbot-messages">

            {messages.length === 0 && (
              <div className="chatbot-welcome">
                <div className="welcome-icon">✨</div>

                <h2>What are you looking for?</h2>

                <p>
                  Tell me the product you need and your budget.
                </p>

                <div className="chat-suggestions">

                  <button
                    onClick={() =>
                      suggestion("mobile under 20000")
                    }
                  >
                    📱 Mobile under ₹20,000
                  </button>

                  <button
                    onClick={() =>
                      suggestion("laptop under 60000")
                    }
                  >
                    💻 Laptop under ₹60,000
                  </button>

                  <button
                    onClick={() =>
                      suggestion("headphones under 5000")
                    }
                  >
                    🎧 Headphones under ₹5,000
                  </button>

                  <button
                    onClick={() =>
                      suggestion("camera under 50000")
                    }
                  >
                    📷 Camera under ₹50,000
                  </button>

                </div>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.type === "user"
                    ? "chat-message-user"
                    : "chat-message-ai"
                }
              >
                <p className="chat-message-text">
                  {msg.text}
                </p>

                {msg.products?.length > 0 && (
                  <div className="chatbot-products">

                    {msg.products.map((product) => (
                      <div
                        className="chatbot-product-card"
                        key={product.id}
                      >

                        <div className="chatbot-product-image">
                          <img
                            src={product.image}
                            alt={product.name}
                          />
                        </div>

                        <div className="chatbot-product-info">

                          <span>{product.category}</span>

                          <h3>{product.name}</h3>

                          <p>
                            ⭐ {product.rating} ({product.reviews})
                          </p>

                          <strong>
                            ₹{product.price.toLocaleString()}
                          </strong>

                          <p className="product-description">
                            {product.description}
                          </p>

                          <div className="store-buttons">

                            <a
                              href={product.amazon}
                              target="_blank"
                              rel="noreferrer"
                              className="amazon-btn"
                            >
                              Amazon
                            </a>

                            <a
                              href={product.flipkart}
                              target="_blank"
                              rel="noreferrer"
                              className="flipkart-btn"
                            >
                              Flipkart
                            </a>

                          </div>

                        </div>

                      </div>
                    ))}

                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="chat-message-ai">
                <p className="chat-message-text">
                  🔎 BestBuy AI is finding products...
                </p>
              </div>
            )}

          </div>

          <div className="chatbot-input-area">

            <input
              type="text"
              value={message}
              placeholder="Example: mobile under ₹20,000"
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchProducts();
                }
              }}
              disabled={loading}
            />

            <button
              onClick={searchProducts}
              disabled={loading}
            >
              {loading ? "..." : "Search"}
            </button>

          </div>

        </div>
      </main>
    </>
  );
}

export default Chatbot;