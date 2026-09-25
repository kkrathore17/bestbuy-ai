import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://bestbuy-ai.onrender.com/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Unable to load products:", error);
        setLoading(false);
      });
  }, []);

  let filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" || product.category === category;

    return searchMatch && categoryMatch;
  });

  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sort === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <>
      <Navbar />

      <main className="products-page">
        <div className="products-header">
          <div>
            <span>PRODUCTS</span>
            <h1>Explore Products</h1>
            <p>Find the right product according to your needs.</p>
          </div>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="product-filters">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Smartphones">Smartphones</option>
            <option value="Laptops">Laptops</option>
            <option value="Headphones">Headphones</option>
            <option value="Cameras">Cameras</option>
            <option value="Smartwatches">Smartwatches</option>
            <option value="Monitors">Monitors</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort Products</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>

        {loading ? (
          <div className="no-products">
            <h2>Loading products...</h2>
            <p>BestBuy AI is loading the product catalog.</p>
          </div>
        ) : (
          <>
            <div className="products-count">
              Showing {filteredProducts.length} of {products.length} products
            </div>

            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  </div>

                  <div className="product-info">
                    <span className="product-category">
                      {product.category}
                    </span>

                    <h2>{product.name}</h2>

                    <p className="rating">
                      ⭐ {product.rating} ({product.reviews})
                    </p>

                    <p className="product-description">
                      {product.description}
                    </p>

                    <h3>
                      ₹{product.price.toLocaleString()}
                    </h3>

                    <div className="product-buttons">
                      <a
                        href={product.amazon}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Amazon
                      </a>

                      <a
                        href={product.flipkart}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Flipkart
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="no-products">
                <h2>No products found</h2>
                <p>Try another search or category.</p>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default Products;