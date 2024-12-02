import { FaUpload } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTheme } from "@contexts/ThemeContext";

export default function AddProduct({
  handleSubmit,
  newProduct,
  handleInputChange,
  categories,
  brands,
  handleImageChange,
  setIsModalOpen,
  isDarkMode,
}) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`w-full max-w-3xl rounded-xl shadow-xl ${
          isDarkMode
            ? "bg-gray-800/80 backdrop-blur-md"
            : "bg-white/90 backdrop-blur-md"
        } max-h-[90vh] overflow-y-auto scrollbar-hide`}
        style={{
          boxShadow: isDarkMode
            ? "0 0 20px rgba(0, 0, 0, 0.3)"
            : "0 0 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3
              className={`text-xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Add Car Part
            </h3>
            <button
              onClick={() => setIsModalOpen(false)}
              className={`p-2 rounded-lg ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={newProduct.name}
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
                  value={newProduct.price}
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
                  value={newProduct.category}
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
                  value={newProduct.brand}
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
                  value={newProduct.stock}
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
                  Car Part Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className={`w-full p-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? "bg-gray-700/50 text-white border-gray-600"
                        : "bg-gray-50 text-gray-900 border-gray-200"
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 
                    file:rounded-full file:border-0 ${
                      isDarkMode
                        ? "file:bg-gray-600 file:text-white"
                        : "file:bg-blue-50 file:text-blue-700"
                    } hover:file:bg-opacity-80`}
                    accept="image/*"
                    required
                  />
                </div>
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
                  value={newProduct.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  className={`w-full p-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? "bg-gray-700/50 text-white border-gray-600"
                      : "bg-gray-50 text-gray-900 border-gray-200"
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500 h-24`}
                  required
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
