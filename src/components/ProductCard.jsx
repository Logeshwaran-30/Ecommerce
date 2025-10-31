import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  SfButton,
  SfIconShoppingCart,
} from "@storefront-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, CheckCircle } from "lucide-react";
import { useCart } from "../CartContext";

const ProductCard = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertProduct, setAlertProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Dropdown visibility
  const [showCategories, setShowCategories] = useState(false);
  const [showPrices, setShowPrices] = useState(false);

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // You can change this

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getCategoryProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedPrice === "Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selectedPrice === "High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAlertProduct(product);
    setTimeout(() => setAlertProduct(null), 3000);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <div>{error}</div>;

  const filteredProducts = getCategoryProducts();

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

const handlePageChange = (page) => {
  if (page >= 1 && page <= totalPages) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ Scroll to top smoothly
  }
};


  return (
    <div className="min-h-screen bg-white py-10 px-6 relative">
      <h1 className="text-4xl font-semibold text-center mb-8">Products</h1>

      {/* ✅ Search + Dropdowns */}
      <div className="flex flex-wrap justify-center gap-4 mb-10 relative">
        <div className="flex items-center w-full md:w-1/2 relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-5 pr-10 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-4 text-gray-500" size={20} />
        </div>

        {/* Category Dropdown */}
        <motion.div
          className="relative"
          onMouseEnter={() => setShowCategories(true)}
          onMouseLeave={() => setShowCategories(false)}
        >
          <button className="flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 text-sm bg-white shadow-sm cursor-pointer hover:shadow-md min-w-[150px]">
            <span>{selectedCategory === "All" ? "Categories" : selectedCategory}</span>
            <ChevronDown size={18} className="text-gray-500 ml-2" />
          </button>

          <AnimatePresence>
            {showCategories && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 bg-white shadow-lg border border-gray-200 rounded-md mt-2 w-full overflow-hidden"
              >
                {["men's clothing", "women's clothing", "electronics", "jewelery"].map((cat) => (
                  <li
                    key={cat}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowCategories(false);
                    }}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Price Dropdown */}
        <motion.div
          className="relative"
          onMouseEnter={() => setShowPrices(true)}
          onMouseLeave={() => setShowPrices(false)}
        >
          <button className="flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 text-sm bg-white shadow-sm cursor-pointer hover:shadow-md min-w-[150px]">
            <span>{selectedPrice === "All" ? "Prices" : selectedPrice}</span>
            <ChevronDown size={18} className="text-gray-500 ml-2" />
          </button>

          <AnimatePresence>
            {showPrices && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 bg-white shadow-lg border border-gray-200 rounded-md mt-2 w-full overflow-hidden"
              >
                {["Low to High", "High to Low"].map((price) => (
                  <li
                    key={price}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedPrice(price);
                      setShowPrices(false);
                    }}
                  >
                    {price}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ✅ Product Grid with Pagination Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center"
        >
          {paginatedProducts.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-5 text-center"
              whileHover={{ scale: 1.03 }}
            >
              <Link to={`/Productdetails/${product.id}`}>
                <motion.img
                  src={product.image}
                  alt={product.title}
                  className="w-40 h-40 mx-auto mb-4 object-contain"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              <h2 className="text-lg font-medium text-gray-800 mb-2 line-clamp-1">
                {product.title}
              </h2>
              <p className="text-gray-500 mb-2">${product.price}</p>
              <SfButton
                size="sm"
                slotPrefix={<SfIconShoppingCart size="sm" />}
                onClick={() => handleAddToCart(product)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                Add to Cart
              </SfButton>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ✅ Pagination Controls */}
      <div className="flex justify-center items-center mt-10 gap-3">
        <SfButton
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          Prev
        </SfButton>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <SfButton
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          Next
        </SfButton>

        {/* Items per page dropdown */}
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(parseInt(e.target.value));
            setCurrentPage(1);
          }}
          className="ml-4 border border-gray-300 rounded-md px-3 py-2"
        >
        </select>
      </div>

      {/* ✅ Success Notification (TOP RIGHT) */}
      <AnimatePresence>
        {alertProduct && (
          <motion.div
            initial={{ opacity: 0, x: 100, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 right-6 bg-green-600 text-white p-5 rounded-lg shadow-lg flex items-center space-x-3 z-50"
          >
            <CheckCircle size={22} className="text-white" />
            <div>
              <p className="font-semibold">Product added successfully!</p>
              <p className="text-sm opacity-90">{alertProduct.title}</p>
            </div>
            <SfButton
              size="sm"
              className="ml-3 bg-white text-green-700 hover:bg-gray-100"
              onClick={() => navigate(`/addtocart/${alertProduct.id}`)}
            >
              View Details
            </SfButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductCard;
