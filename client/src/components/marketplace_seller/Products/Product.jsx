import React, { useState, useEffect } from "react";
import {
  FiPlus,
  FiSearch,
  FiX,
  FiPackage,
  FiShoppingBag,
} from "react-icons/fi";
import axiosInstance from "@services/axios";
import Pagination from "./Pagination";
import AddProduct from "./AddProduct";
import ProductTable from "./ProductTable";
import { useTheme } from "@contexts/ThemeContext";
import { motion } from "framer-motion";

export function Product({ type }) {
  const { isDarkMode } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ keyword: "" });
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    description: "",
    image: null,
  });

  const categories = [
    "Engine & Drivetrain",
    "Suspension & Steering",
    "Brakes",
    "Electrical & Lighting",
    "Interior Accessories",
    "Wheels & Tires",
  ];
  const brands = ["Honda", "Toyota", "Hyundai", "Kia", "Suzuki", "Daihatsu"];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/products", {
        params: { page, keyword: filters.keyword },
      });
      setProducts(data.products);
      setTotalPages(data.pages);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "keyword") {
      setFilters((prev) => ({ ...prev, keyword: value }));
      setPage(1);
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setNewProduct((prev) => ({ ...prev, image: reader.result }));
        };
      } catch (error) {
        console.error("Image conversion error:", error);
        setError("Failed to process image");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { name, price, category, brand, stock, description, image } =
      newProduct;
    if (
      !name ||
      !price ||
      !category ||
      !brand ||
      !stock ||
      !description ||
      !image
    ) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axiosInstance.post("/products/create-product", {
        name,
        price: parseFloat(price),
        category,
        brand,
        stock: parseInt(stock),
        description,
        image,
      });

      console.log("Product creation response:", response);
      fetchProducts();
      setIsModalOpen(false);
      setNewProduct({
        name: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
        description: "",
        image: null,
      });
      alert("Product created successfully!");
    } catch (error) {
      console.error("Failed to submit product:", error);
      setError(error.response?.data?.message || "Failed to create product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axiosInstance.delete(`/products/${productId}`);
        if (response.status === 200) {
          fetchProducts();
          alert("Product deleted successfully!");
        } else {
          alert("Product not deleted successfully!");
        }
      } catch (error) {
        console.error("Failed to delete product:", error);
        setError("Failed to delete product.");
      }
    }
  };

  const handleUpdateStock = async (productId, currentStock) => {
    const newStock = prompt("Enter new stock quantity:", currentStock);
    if (newStock !== null && !isNaN(newStock)) {
      try {
        const response = await axiosInstance.patch(
          `/products/${productId}/stock`,
          {
            stock: parseInt(newStock),
          }
        );
        if (response.status === 200) {
          fetchProducts();
          alert("Stock updated successfully!");
        } else {
          alert("Failed to update stock!");
        }
      } catch (error) {
        console.error("Failed to update stock:", error);
        setError("Failed to update stock.");
      }
    }
  };

  return (
    <div className={`p-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6 gap-y-1"
        >
          {type !== "analytics" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white transition-colors`}
              onClick={() => setIsModalOpen(true)}
            >
              <FiPlus className="w-5 h-5" />
              Add New Product
            </motion.button>
          )}
        </motion.div>

        {type === "analytics" ? (
          <></>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 ${
              isDarkMode ? "bg-gray-800/50" : "bg-white"
            } rounded-xl shadow-lg backdrop-blur-sm p-4`}
          >
            <div className="relative">
              <input
                type="text"
                name="keyword"
                value={filters.keyword}
                onChange={handleInputChange}
                placeholder="Search products..."
                className={`w-full pl-10 pr-4 py-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-700/50 text-white placeholder-gray-400 border-gray-600"
                    : "bg-gray-50 text-gray-900 placeholder-gray-500 border-gray-200"
                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {filters.keyword && (
                <button
                  onClick={() => setFilters({ keyword: "" })}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX />
                </button>
              )}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <div
            className={`p-2 rounded-lg ${
              isDarkMode ? "bg-white/10" : "bg-green-50"
            }`}
          >
            <FiShoppingBag
              className={`w-6 h-6 ${
                isDarkMode ? "text-green-400" : "text-green-500"
              }`}
            />
          </div>
          <h2
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Products
          </h2>
        </motion.div>

        {/* Product Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-xl shadow-lg overflow-hidden ${
            isDarkMode ? "bg-gray-800/50" : "bg-white"
          } backdrop-blur-sm`}
        >
          <ProductTable
            loading={loading}
            products={products}
            handleUpdateStock={handleUpdateStock}
            handleDeleteProduct={handleDeleteProduct}
            type={type}
            isDarkMode={isDarkMode}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            isDarkMode={isDarkMode}
          />
        </motion.div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <AddProduct
          handleSubmit={handleSubmit}
          newProduct={newProduct}
          handleInputChange={handleInputChange}
          categories={categories}
          brands={brands}
          handleImageChange={handleImageChange}
          setIsModalOpen={setIsModalOpen}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Error Toast */}
      {error && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg ${
            isDarkMode ? "bg-red-900/80 text-white" : "bg-red-100 text-red-700"
          } backdrop-blur-sm`}
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </motion.div>
      )}
    </div>
  );
}

export default Product;
