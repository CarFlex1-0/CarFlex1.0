import { motion, AnimatePresence } from "framer-motion";
import {
  FiEdit,
  FiTrash2,
  FiPackage,
} from "react-icons/fi";
import { Link } from "react-router-dom";
export default function ProductTable({
  loading,
  products,
  handleUpdateStock,
  handleDeleteProduct,
  type,
}) {
  return (
    <div className="custom-backdrop rounded-lg shadow-md overflow-hidden">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto custom-backdrop">
          <table className="w-full custom-backdrop">
            <thead className="">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Status
                </th>
                {type !== "analytics" && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-500">
              <AnimatePresence>
                {products.map((product) => (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="text-gray-700 px-6 py-4 whitespace-nowrap">
                      {product.name}
                    </td>
                    <td className="text-gray-700 px-6 py-4 whitespace-nowrap">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="text-gray-700 px-6 py-4 whitespace-nowrap">
                      {product.category}
                    </td>
                    <td className="text-gray-700 px-6 py-4 whitespace-nowrap">
                      {product.stock}
                      {type !== "analytics" && (
                        <button
                          className="ml-2 text-blue-600 hover:text-blue-800"
                          onClick={() =>
                            handleUpdateStock(product._id, product.stock)
                          }
                        >
                          <FiPackage className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                    <td className="text-gray-700 px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock > 20
                            ? "bg-green-100 text-green-800"
                            : product.stock > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock > 20
                          ? "In Stock"
                          : product.stock > 0
                          ? "Low Stock"
                          : "Out of Stock"}
                      </span>
                    </td>
                    {type !== "analytics" && (
                      <td className="text-gray-700 px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <Link
                            to={`edit-product/${product._id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <FiEdit className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FiTrash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
