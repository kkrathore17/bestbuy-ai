import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Admin.css";

function Admin() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalSearches: 0,
    mostSearched: "No searches yet",
    categoryData: [],
    productData: [],
    recentSearches: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem(
      "bestbuyAdminLoggedIn"
    );

    if (adminLoggedIn !== "true") {
      navigate("/admin-login");
      return;
    }

    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/stats"
      );

      const data = await response.json();

      if (response.ok) {
        setStats({
          totalSearches: data.totalSearches || 0,

          mostSearched: data.mostSearched
            ? data.mostSearched.category
            : "No searches yet",

          categoryData: data.categories || [],

          productData: data.products || [],

          recentSearches: data.recentSearches || []
        });
      }
    } catch (error) {
      console.log("Unable to load admin data.");
    }

    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("bestbuyAdminLoggedIn");
    navigate("/admin-login");
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="admin-page">
          <div className="admin-loading">
            Loading Admin Dashboard...
          </div>
        </main>
      </>
    );
  }

  const maxCategoryCount =
    stats.categoryData.length > 0
      ? Math.max(
          ...stats.categoryData.map(
            (item) => item.count
          )
        )
      : 1;

  return (
    <>
      <Navbar />

      <main className="admin-page">

        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>
              Monitor BestBuy AI search activity and product trends.
            </p>
          </div>

          <div className="admin-header-actions">
            <span className="live-badge">
              <span>●</span> Live Data
            </span>

            <button
              className="admin-logout"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="admin-stats">

          <div className="admin-stat-card">
            <span>🔎</span>

            <div>
              <p>Total Searches</p>
              <h2>{stats.totalSearches}</h2>
            </div>
          </div>

          <div className="admin-stat-card">
            <span>📂</span>

            <div>
              <p>Categories</p>
              <h2>{stats.categoryData.length}</h2>
            </div>
          </div>

          <div className="admin-stat-card">
            <span>🔥</span>

            <div>
              <p>Most Searched</p>
              <h2>{stats.mostSearched}</h2>
            </div>
          </div>

        </div>

        <section className="admin-section">

          <div className="admin-section-header">
            <div>
              <h2>Search Analytics</h2>
              <p>
                Live category-wise search activity
              </p>
            </div>
          </div>

          {stats.categoryData.length > 0 ? (
            <div className="analytics-chart">

              <div className="chart-y-label">
                Searches
              </div>

              <div className="chart-bars">

                {stats.categoryData.map((item) => {

                  const height =
                    maxCategoryCount > 0
                      ? (item.count /
                          maxCategoryCount) *
                        100
                      : 0;

                  return (
                    <div
                      className="chart-column"
                      key={item.category}
                    >

                      <div className="chart-value">
                        {item.count}
                      </div>

                      <div className="chart-bar-wrapper">

                        <div
                          className="chart-bar"
                          style={{
                            height: `${height}%`
                          }}
                        ></div>

                      </div>

                      <div className="chart-label">
                        {item.category}
                      </div>

                    </div>
                  );
                })}

              </div>

            </div>
          ) : (
            <div className="admin-empty">
              No search data available yet.
            </div>
          )}

        </section>

        <section className="admin-section">

          <div className="admin-section-header">
            <div>
              <h2>Most Searched Products</h2>
              <p>
                Products users searched most frequently
              </p>
            </div>
          </div>

          {stats.productData.length > 0 ? (
            <div className="product-analytics-list">

              {stats.productData
                .slice(0, 6)
                .map((product, index) => (

                  <div
                    className="product-analytics-card"
                    key={product.product}
                  >

                    <div className="product-rank">
                      #{index + 1}
                    </div>

                    <div className="product-analytics-info">
                      <h3>
                        {product.product}
                      </h3>
                    </div>

                    <div className="product-search-count">
                      <strong>
                        {product.count}
                      </strong>

                      <span>
                        searches
                      </span>
                    </div>

                  </div>

                ))}

            </div>
          ) : (
            <div className="admin-empty">
              No product search data available yet.
            </div>
          )}

        </section>

        <section className="admin-section">

          <div className="admin-section-header">
            <div>
              <h2>Recent Searches</h2>
              <p>
                Latest customer search activity
              </p>
            </div>
          </div>

          {stats.recentSearches.length > 0 ? (
            <div className="recent-search-list">

              {stats.recentSearches.map(
                (search, index) => (

                  <div
                    className="recent-search-card"
                    key={index}
                  >

                    <div className="recent-search-icon">
                      🔎
                    </div>

                    <div className="recent-search-info">

                      <h3>
                        {search.query}
                      </h3>

                      <div>

                        <span>
                          {search.category}
                        </span>

                        <span>
                          {search.results} products
                        </span>

                      </div>

                    </div>

                    <div className="recent-search-time">

                      {search.time
                        ? new Date(
                            search.time
                          ).toLocaleString()
                        : ""}

                    </div>

                  </div>

                )
              )}

            </div>
          ) : (
            <div className="admin-empty">
              No recent searches.
            </div>
          )}

        </section>

        <section className="admin-section">

          <div className="admin-section-header">
            <div>
              <h2>Category Overview</h2>
              <p>
                Search distribution across categories
              </p>
            </div>
          </div>

          <div className="category-overview">

            {stats.categoryData.map((item) => (

              <div
                className="overview-card"
                key={item.category}
              >

                <div className="overview-icon">

                  {item.category === "Smartphones"
                    ? "📱"
                    : item.category === "Laptops"
                    ? "💻"
                    : item.category === "Headphones"
                    ? "🎧"
                    : item.category === "Cameras"
                    ? "📷"
                    : "🛍️"}

                </div>

                <h3>
                  {item.category}
                </h3>

                <strong>
                  {item.count}
                </strong>

                <p>
                  Searches
                </p>

              </div>

            ))}

          </div>

        </section>

      </main>
    </>
  );
}

export default Admin;