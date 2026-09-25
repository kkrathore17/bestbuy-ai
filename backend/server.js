const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const historyFile = path.join(__dirname, "search-history.json");

const imageUrls = {
  Smartphones:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",

  Laptops:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",

  Headphones:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",

  Cameras:
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",

  Smartwatches:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",

  Monitors:
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500"
};

const productGroups = [

  // =====================================================
  // SMARTPHONES
  // =====================================================

  {
    category: "Smartphones",
    range: "15000-20000",
    products: [
      ["Samsung Galaxy M35", 15999],
      ["Realme Narzo 80", 17499],
      ["Moto G85", 18999]
    ]
  },

  {
    category: "Smartphones",
    range: "20000-25000",
    products: [
      ["Nothing Phone 3a", 21999],
      ["Redmi Note 14 Pro", 22999],
      ["OnePlus Nord CE 5", 24499]
    ]
  },

  {
    category: "Smartphones",
    range: "25000-30000",
    products: [
      ["Samsung Galaxy A36", 25999],
      ["iQOO Z10", 27499],
      ["Vivo V50e", 29499]
    ]
  },

  {
    category: "Smartphones",
    range: "30000-35000",
    products: [
      ["POCO F7", 30999],
      ["OnePlus Nord 5", 32999],
      ["Motorola Edge 60", 34499]
    ]
  },

  {
    category: "Smartphones",
    range: "35000-40000",
    products: [
      ["Realme GT 7", 35999],
      ["Oppo Reno 13 Pro", 37999],
      ["Vivo V50 Pro", 39499]
    ]
  },

  {
    category: "Smartphones",
    range: "40000-45000",
    products: [
      ["OnePlus 13R", 40999],
      ["Samsung Galaxy S24 FE", 42999],
      ["iQOO Neo 10 Pro", 44499]
    ]
  },

  {
    category: "Smartphones",
    range: "45000-50000",
    products: [
      ["Samsung Galaxy S25 FE", 45999],
      ["Google Pixel 9a", 47499],
      ["OnePlus 13", 49999]
    ]
  },

  // =====================================================
  // LAPTOPS
  // =====================================================

  {
    category: "Laptops",
    range: "40000-50000",
    products: [
      ["Acer Aspire 5", 44999],
      ["ASUS Vivobook Go 15", 46999],
      ["Lenovo IdeaPad Slim 3", 48999]
    ]
  },

  {
    category: "Laptops",
    range: "50000-60000",
    products: [
      ["HP Pavilion 14", 52999],
      ["Dell Inspiron 15", 54999],
      ["ASUS Vivobook 15", 57999]
    ]
  },

  {
    category: "Laptops",
    range: "60000-70000",
    products: [
      ["Lenovo IdeaPad Slim 5", 61999],
      ["Acer Nitro V", 64999],
      ["HP Victus Gaming", 68999]
    ]
  },

  {
    category: "Laptops",
    range: "70000-80000",
    products: [
      ["Lenovo LOQ Gaming", 72999],
      ["MSI Thin Gaming", 74999],
      ["ASUS TUF Gaming F15", 78999]
    ]
  },

  {
    category: "Laptops",
    range: "80000-90000",
    products: [
      ["Acer Predator Helios Neo", 81999],
      ["Dell G15 Gaming", 84999],
      ["Lenovo Legion 5", 88999]
    ]
  },

  {
    category: "Laptops",
    range: "90000-100000",
    products: [
      ["MacBook Air M3", 92999],
      ["Samsung Galaxy Book 5 Pro", 95999],
      ["ASUS ROG Strix G16", 99999]
    ]
  },

  // =====================================================
  // HEADPHONES
  // =====================================================

  {
    category: "Headphones",
    range: "1000-5000",
    products: [
      ["boAt Rockerz 450", 1499],
      ["OnePlus Bullets Wireless Z3", 2299],
      ["Realme Buds Wireless 3", 3499]
    ]
  },

  {
    category: "Headphones",
    range: "5000-10000",
    products: [
      ["JBL Live 770NC", 5999],
      ["Anker Soundcore Q20i", 6999],
      ["Sony WH-CH720N", 8999]
    ]
  },

  {
    category: "Headphones",
    range: "10000-15000",
    products: [
      ["Sennheiser Accentum", 10999],
      ["Skullcandy Crusher", 11999],
      ["JBL Tune 770NC", 13999]
    ]
  },

  {
    category: "Headphones",
    range: "15000-20000",
    products: [
      ["Sennheiser Momentum 4", 15999],
      ["Sony ULT Wear", 17499],
      ["Bose QuietComfort SE", 19499]
    ]
  },

  {
    category: "Headphones",
    range: "20000-25000",
    products: [
      ["Bose QuietComfort", 20999],
      ["Sony WH-XB910N", 22499],
      ["Sennheiser Momentum 4 Plus", 24499]
    ]
  },

  {
    category: "Headphones",
    range: "25000-30000",
    products: [
      ["Sony WH-1000XM5", 25999],
      ["Bose QuietComfort Ultra", 27499],
      ["Sennheiser Momentum 5", 29999]
    ]
  },

  // =====================================================
  // CAMERAS
  // =====================================================

  {
    category: "Cameras",
    range: "30000-40000",
    products: [
      ["Canon EOS 1500D", 32999],
      ["Nikon D3500", 35999],
      ["Sony ZV-1F", 38999]
    ]
  },

  {
    category: "Cameras",
    range: "40000-50000",
    products: [
      ["GoPro HERO 12", 42999],
      ["DJI Osmo Action 4", 44999],
      ["Canon EOS 250D", 48999]
    ]
  },

  {
    category: "Cameras",
    range: "50000-60000",
    products: [
      ["Canon EOS 200D II", 52999],
      ["Sony ZV-E10", 55999],
      ["Nikon Z30", 58999]
    ]
  },

  {
    category: "Cameras",
    range: "60000-70000",
    products: [
      ["Canon EOS R50", 62999],
      ["Sony Alpha ZV-E10 II", 65999],
      ["Fujifilm X-S10", 69999]
    ]
  },

  {
    category: "Cameras",
    range: "70000-80000",
    products: [
      ["Sony Alpha A6400", 72999],
      ["Canon EOS R10", 75999],
      ["Nikon Z50", 79999]
    ]
  },

  {
    category: "Cameras",
    range: "80000-90000",
    products: [
      ["Canon EOS R7", 82999],
      ["Sony Alpha A6700", 85999],
      ["Nikon Z5", 89999]
    ]
  },

  // =====================================================
  // SMARTWATCHES
  // =====================================================

  {
    category: "Smartwatches",
    range: "2000-5000",
    products: [
      ["Fire-Boltt Phoenix", 1999],
      ["boAt Ultima Prime", 2999],
      ["Noise ColorFit Pro", 4499]
    ]
  },

  {
    category: "Smartwatches",
    range: "5000-10000",
    products: [
      ["Amazfit Bip 5", 5499],
      ["NoiseFit Vortex", 6999],
      ["boAt Lunar Pro", 8999]
    ]
  },

  {
    category: "Smartwatches",
    range: "10000-15000",
    products: [
      ["Amazfit Active", 10999],
      ["Samsung Galaxy Watch FE", 12999],
      ["OnePlus Watch 2R", 14999]
    ]
  },

  {
    category: "Smartwatches",
    range: "15000-20000",
    products: [
      ["Amazfit Balance", 15999],
      ["Garmin Vivoactive 5", 17999],
      ["Samsung Galaxy Watch 6", 19499]
    ]
  },

  {
    category: "Smartwatches",
    range: "20000-25000",
    products: [
      ["OnePlus Watch 2", 20999],
      ["Samsung Galaxy Watch 7", 22999],
      ["Garmin Venu 3S", 24999]
    ]
  },

  {
    category: "Smartwatches",
    range: "25000-30000",
    products: [
      ["Garmin Forerunner 165", 25999],
      ["Samsung Galaxy Watch Ultra", 27999],
      ["Apple Watch SE", 29999]
    ]
  },

  // =====================================================
  // MONITORS
  // =====================================================

  {
    category: "Monitors",
    range: "10000-15000",
    products: [
      ["BenQ GW2480", 11999],
      ["LG 24MP60G", 12999],
      ["Acer EK240Y", 14499]
    ]
  },

  {
    category: "Monitors",
    range: "15000-20000",
    products: [
      ["MSI G244F", 15999],
      ["Acer Nitro VG240Y", 17499],
      ["LG UltraGear 24GN60R", 19499]
    ]
  },

  {
    category: "Monitors",
    range: "20000-25000",
    products: [
      ["Acer Nitro VG271U", 20999],
      ["BenQ MOBIUZ EX2510S", 22999],
      ["MSI G274F", 24499]
    ]
  },

  {
    category: "Monitors",
    range: "25000-30000",
    products: [
      ["LG UltraGear 27GN800", 25999],
      ["Dell S2721QS", 27499],
      ["Samsung Odyssey G5", 29999]
    ]
  },

  {
    category: "Monitors",
    range: "30000-35000",
    products: [
      ["ASUS TUF Gaming VG27AQ", 30999],
      ["LG UltraGear 27GP850", 32999],
      ["Samsung Odyssey G6", 34999]
    ]
  },

  {
    category: "Monitors",
    range: "35000-40000",
    products: [
      ["Dell G2724D", 35999],
      ["LG UltraGear 32GN650", 37999],
      ["Samsung Odyssey G7", 39999]
    ]
  }
];


// =====================================================
// CREATE 111 PRODUCTS
// =====================================================

let products = [];
let productId = 1;

productGroups.forEach((group) => {
  group.products.forEach(([name, price]) => {

    products.push({
      id: productId,
      name,
      category: group.category,
      price,
      rating: Number((4.1 + Math.random() * 0.7).toFixed(1)),
      reviews: Math.floor(500 + Math.random() * 4500),

      description:
        `${name} with reliable performance, modern features and value for everyday use.`,

      image: imageUrls[group.category],

      amazon:
        `https://www.amazon.in/s?k=${encodeURIComponent(name)}`,

      flipkart:
        `https://www.flipkart.com/search?q=${encodeURIComponent(name)}`
    });

    productId++;
  });
});


// =====================================================
// SEARCH HISTORY
// =====================================================

function loadSearchHistory() {
  try {

    if (!fs.existsSync(historyFile)) {
      return [];
    }

    const data = fs.readFileSync(
      historyFile,
      "utf8"
    );

    return data ? JSON.parse(data) : [];

  } catch (error) {

    console.log(
      "Unable to load search history."
    );

    return [];
  }
}


function saveSearchHistory() {

  try {

    fs.writeFileSync(
      historyFile,
      JSON.stringify(
        searchHistory,
        null,
        2
      )
    );

  } catch (error) {

    console.log(
      "Unable to save search history."
    );
  }
}


let searchHistory = loadSearchHistory();


// =====================================================
// CATEGORY DETECTION
// =====================================================

function detectCategory(query) {

  const text =
    query.toLowerCase();

  if (
    text.includes("mobile") ||
    text.includes("phone") ||
    text.includes("smartphone")
  ) {
    return "Smartphones";
  }

  if (
    text.includes("laptop") ||
    text.includes("notebook")
  ) {
    return "Laptops";
  }

  if (
    text.includes("headphone") ||
    text.includes("earphone") ||
    text.includes("earbud") ||
    text.includes("earbuds")
  ) {
    return "Headphones";
  }

  if (
    text.includes("camera") ||
    text.includes("gopro") ||
    text.includes("dslr")
  ) {
    return "Cameras";
  }

  if (
    text.includes("watch") ||
    text.includes("smartwatch")
  ) {
    return "Smartwatches";
  }

  if (
    text.includes("monitor") ||
    text.includes("display")
  ) {
    return "Monitors";
  }

  return null;
}


// =====================================================
// BUDGET DETECTION
// =====================================================

function extractBudget(query) {

  const text =
    query.toLowerCase();

  const match =
    text.match(
      /(?:under|below|less than|within|upto|up to)\s*(?:₹|rs\.?|inr)?\s*([0-9,]+)/
    );

  if (!match) {
    return null;
  }

  return Number(
    match[1].replace(/,/g, "")
  );
}


// =====================================================
// CATALOG SEARCH
// =====================================================

function searchCatalog(query) {

  const category =
    detectCategory(query);

  const budget =
    extractBudget(query);

  let results = [...products];

  if (category) {

    results =
      results.filter(
        product =>
          product.category === category
      );
  }

  if (budget) {

    results =
      results.filter(
        product =>
          product.price <= budget
      );
  }

  return results;
}


// =====================================================
// SAVE SEARCH
// =====================================================

function saveSearch(
  query,
  category,
  results
) {

  searchHistory.push({

    query,

    category:
      category || "All",

    results:
      results.length,

    products:
      results.map(
        product =>
          product.name
      ),

    time:
      new Date().toISOString()
  });


  if (
    searchHistory.length > 500
  ) {

    searchHistory =
      searchHistory.slice(-500);
  }

  saveSearchHistory();
}


// =====================================================
// AI PRODUCT SEARCH
// =====================================================

app.post(
  "/api/search",
  async (req, res) => {

    const query =
      req.body.query;


    if (
      !query ||
      !query.trim()
    ) {

      return res.status(400).json({

        message:
          "Please enter a search query.",

        count: 0,

        results: []
      });
    }


    const userQuery =
      query.trim();


    console.log(
      "\n=============================="
    );

    console.log(
      "User Search:",
      userQuery
    );

    console.log(
      "=============================="
    );


    const category =
      detectCategory(
        userQuery
      );


    const budget =
      extractBudget(
        userQuery
      );


    const catalogResults =
      searchCatalog(
        userQuery
      );


    try {

      const response =
        await ai.models.generateContent({

          model:
            "gemini-3.5-flash-lite",

          contents: `
You are BestBuy AI, a product recommendation assistant.

User query:
${userQuery}

Available products:
${JSON.stringify(
  catalogResults.slice(0, 30)
)}

Rules:
1. Recommend only products from the provided catalog.
2. Never invent products.
3. Respect the requested category.
4. Respect the requested budget.
5. Return at most 6 products.
6. Prefer products with better ratings.
7. Return only valid JSON.
`,

          config: {

            responseMimeType:
              "application/json",

            responseSchema: {

              type: "object",

              properties: {

                products: {

                  type: "array",

                  items: {

                    type: "object",

                    properties: {

                      id: {
                        type: "integer"
                      }

                    },

                    required: [
                      "id"
                    ]
                  }
                }
              },

              required: [
                "products"
              ]
            }
          }
        });


      const aiData =
        JSON.parse(
          response.text ||
          '{"products":[]}'
        );


      let results =
        Array.isArray(
          aiData.products
        )

          ? aiData.products

              .map(item =>
                products.find(
                  product =>
                    product.id ===
                    Number(item.id)
                )
              )

              .filter(Boolean)

          : [];


      if (category) {

        results =
          results.filter(
            product =>
              product.category ===
              category
          );
      }


      if (budget) {

        results =
          results.filter(
            product =>
              product.price <=
              budget
          );
      }


      if (
        results.length === 0
      ) {

        results =
          catalogResults

            .sort(
              (a, b) =>
                b.rating -
                a.rating
            )

            .slice(0, 6);
      }


      saveSearch(
        userQuery,
        category,
        results
      );


      res.json({

        message:
          "Search completed successfully.",

        count:
          results.length,

        results
      });


    } catch (error) {

      console.log(
        "Gemini Error:",
        error.message
      );


      const fallbackResults =
        catalogResults

          .sort(
            (a, b) =>
              b.rating -
              a.rating
          )

          .slice(0, 6);


      saveSearch(
        userQuery,
        category,
        fallbackResults
      );


      res.json({

        message:
          "Results loaded from BestBuy catalog.",

        count:
          fallbackResults.length,

        results:
          fallbackResults
      });
    }
  }
);


// =====================================================
// ADMIN STATISTICS
// =====================================================

app.get(
  "/api/admin/stats",
  (req, res) => {

    const totalSearches =
      searchHistory.length;


    const categoryCounts = {};

    const productCounts = {};


    searchHistory.forEach(
      item => {

        if (item.category) {

          categoryCounts[
            item.category
          ] =
            (
              categoryCounts[
                item.category
              ] || 0
            ) + 1;
        }


        if (
          Array.isArray(
            item.products
          )
        ) {

          item.products.forEach(
            product => {

              productCounts[
                product
              ] =
                (
                  productCounts[
                    product
                  ] || 0
                ) + 1;
            }
          );
        }
      }
    );


    const categories =
      Object.entries(
        categoryCounts
      )

        .map(
          ([category, count]) => ({
            category,
            count
          })
        )

        .sort(
          (a, b) =>
            b.count -
            a.count
        );


    const productsData =
      Object.entries(
        productCounts
      )

        .map(
          ([product, count]) => ({
            product,
            count
          })
        )

        .sort(
          (a, b) =>
            b.count -
            a.count
        );


    const mostSearched =
      categories.length > 0
        ? categories[0]
        : null;


    const mostSearchedProduct =
      productsData.length > 0
        ? productsData[0]
        : null;


    const recentSearches =
      [...searchHistory]

        .reverse()

        .slice(0, 20);


    res.json({

      totalSearches,

      categories,

      mostSearched,

      mostSearchedProduct,

      products:
        productsData,

      recentSearches
    });
  }
);


// =====================================================
// ALL PRODUCTS
// =====================================================

app.get(
  "/api/products",
  (req, res) => {

    res.json({

      count:
        products.length,

      products
    });
  }
);


// =====================================================
// START SERVER
// =====================================================

app.listen(
  PORT,
  () => {

    console.log(
      `BestBuy AI Backend running on http://localhost:${PORT}`
    );

    console.log(
      `Products available: ${products.length}`
    );

    console.log(
      `Stored searches: ${searchHistory.length}`
    );
  }
);