import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiTrash2, FiPackage } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ProductTable({
  loading,
  products,
  handleUpdateStock,
  handleDeleteProduct,
  type,
  isDarkMode
}) {
  const getStatusStyles = (stock) => {
    if (stock > 20) {
      return {
        dotColor: "bg-green-500",
        bgColor: isDarkMode ? "bg-green-500/10" : "bg-green-50",
        textColor: isDarkMode ? "text-green-300" : "text-green-700",
        text: "In Stock"
      };
    } else if (stock > 0) {
      return {
        dotColor: "bg-yellow-500",
        bgColor: isDarkMode ? "bg-yellow-500/10" : "bg-yellow-50",
        textColor: isDarkMode ? "text-yellow-300" : "text-yellow-700",
        text: "Low Stock"
      };
    }
    return {
      dotColor: "bg-red-500",
      bgColor: isDarkMode ? "bg-red-500/10" : "bg-red-50",
      textColor: isDarkMode ? "text-red-300" : "text-red-700",
      text: "Out of Stock"
    };
  };

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <th className="text-left py-4 px-4">Product</th>
              <th className="text-left py-4 px-4">Price</th>
              <th className="text-left py-4 px-4">Category</th>
              <th className="text-left py-4 px-4">Stock</th>
              <th className="text-left py-4 px-4">Status</th>
              {type !== "analytics" && (
                <th className="text-left py-4 px-4">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {products.map((product) => {
                const status = getStatusStyles(product.stock);
                return (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imageUrl?.url}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.src = "fallback-image-url";
                          }}
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {product.brand}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium">
                        PKR {product.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium">{product.stock}</span>
                      {type !== "analytics" && (
                        <button
                          onClick={() => handleUpdateStock(product._id, product.stock)}
                          className={`ml-2 p-1 rounded-lg ${
                            isDarkMode 
                              ? 'hover:bg-gray-700' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <FiPackage className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full w-fit ${status.bgColor}`}>
                        <div className={`w-2 h-2 rounded-full ${status.dotColor}`} />
                        <span className={`text-sm font-medium ${status.textColor}`}>
                          {status.text}
                        </span>
                      </div>
                    </td>
                    {type !== "analytics" && (
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Link
                            to={`edit-product/${product._id}`}
                            className={`p-2 rounded-lg ${
                              isDarkMode 
                                ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' 
                                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                            }`}
                          >
                            <FiEdit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className={`p-2 rounded-lg ${
                              isDarkMode 
                                ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30' 
                                : 'bg-red-50 text-red-600 hover:bg-red-100'
                            }`}
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      )}
    </div>
  );
}
