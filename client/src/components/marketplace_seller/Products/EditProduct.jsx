import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@services/axios";
import { useTheme } from "@contexts/ThemeContext";
import { motion } from "framer-motion";
import { FiPackage, FiX } from "react-icons/fi";

const EditProduct = () => {
  const { isDarkMode } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    description: "",
    image: null,
  });
  const [error, setError] = useState(null);

  const categories = [
    "Engine & Drivetrain",
    "Suspension & Steering",
    "Brakes",
    "Electrical & Lighting",
    "Interior Accessories",
    "Wheels & Tires",
  ];

  const brands = ["Honda", "Toyota", "Hyundai", "Kia", "Suzuki", "Daihatsu"];

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/products/seller-specific-product/${id}`
        );
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        setError("Failed to fetch product details");
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Convert image to base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setProduct((prev) => ({
            ...prev,
            image: reader.result, // base64 string
          }));
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

    // Validate all required fields
    const { name, price, category, brand, stock, description, image } = product;
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
      // Update product
      await axiosInstance.put(`/products/${id}`, {
        name,
        price: parseFloat(price),
        category,
        brand,
        stock: parseInt(stock),
        description,
        image, // base64 image string
      });

      // Redirect to products page
      //   navigate.push("/products");
    } catch (error) {
      console.error("Failed to update product:", error);
      setError("Failed to update product");
    }
  };

  return (
    <div
      className={`min-h-screen w-full p-6 ${
        isDarkMode
          ? "text-white bg-gradient-to-br from-[#2b4e7e] to-black"
          : "text-gray-800 bg-gray-100"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <div
          className={`p-2 rounded-lg ${
            isDarkMode ? "bg-white/10" : "bg-blue-50"
          }`}
        >
          <FiPackage
            className={`w-6 h-6 ${
              isDarkMode ? "text-blue-400" : "text-blue-500"
            }`}
          />
        </div>
        <h1
          className={`text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Edit Product
        </h1>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 p-4 rounded-lg ${
            isDarkMode ? "bg-red-900/50" : "bg-red-50"
          } ${isDarkMode ? "text-red-200" : "text-red-800"}`}
        >
          {error}
        </motion.div>
      )}

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className={`rounded-xl shadow-lg overflow-hidden ${
          isDarkMode ? "bg-gray-800/50" : "bg-white"
        } backdrop-blur-sm p-8`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className={`w-full p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "bg-gray-700/50 text-white border-gray-600"
                  : "bg-gray-50 text-gray-900 border-gray-200"
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              className={`w-full p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "bg-gray-700/50 text-white border-gray-600"
                  : "bg-gray-50 text-gray-900 border-gray-200"
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
              min="0"
              step="0.01"
            />
          </div>

          {/* Category */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Category
            </label>
            <select
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className={`w-full p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "bg-gray-700/50 text-white border-gray-600"
                  : "bg-gray-50 text-gray-900 border-gray-200"
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  className={isDarkMode ? "bg-gray-700" : "bg-white"}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Brand
            </label>
            <select
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
              className={`w-full p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "bg-gray-700/50 text-white border-gray-600"
                  : "bg-gray-50 text-gray-900 border-gray-200"
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            >
              <option value="">Select brand</option>
              {brands.map((brand) => (
                <option
                  key={brand}
                  value={brand}
                  className={isDarkMode ? "bg-gray-700" : "bg-white"}
                >
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Stock */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
              placeholder="Enter stock quantity"
              className={`w-full p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "bg-gray-700/50 text-white border-gray-600"
                  : "bg-gray-50 text-gray-900 border-gray-200"
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
              min="0"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Product Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className={`w-full p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "bg-gray-700/50 text-white border-gray-600"
                  : "bg-gray-50 text-gray-900 border-gray-200"
              } border focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 ${
                isDarkMode
                  ? "file:bg-gray-600 file:text-white"
                  : "file:bg-blue-50 file:text-blue-700"
              } hover:file:bg-opacity-80`}
              accept="image/*"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              className={`w-full p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "bg-gray-700/50 text-white border-gray-600"
                  : "bg-gray-50 text-gray-900 border-gray-200"
              } border focus:outline-none focus:ring-2 focus:ring-blue-500 h-32`}
              required
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end mt-8 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(-1)}
            className={`px-6 py-2 rounded-lg ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors`}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className={`px-6 py-2 rounded-lg ${
              isDarkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white transition-colors`}
          >
            Update Product
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default EditProduct;
