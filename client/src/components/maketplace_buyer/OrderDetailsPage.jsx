import React, { useState, useEffect } from "react";
import axios from "@services/axios";
import { useTheme } from "@contexts/ThemeContext";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "react-toastify";
import { FiPackage, FiX, FiEye } from "react-icons/fi";
import { useAuth } from "@contexts/auth_context";

const getValidProducts = (products) => {
  return products.filter((item) => item.prod !== null);
};

const OrderStatusBadge = ({ status }) => {
  const statusStyles = {
    pending: "bg-yellow-500",
    shipped: "bg-blue-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2.5 h-2.5 rounded-full ${statusStyles[status]}`} />
      <span className="capitalize">{status}</span>
    </div>
  );
};

const OrderDetailsModal = ({ order, onClose }) => {
  const { isDarkMode } = useTheme();

  if (!order) return null;

  const validProducts = getValidProducts(order.product);
  const totalItems = validProducts.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-2xl p-6 rounded-xl ${
          isDarkMode ? "bg-gray-800/90" : "bg-white"
        } shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3
            className={`text-xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Order Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div
            className={`grid grid-cols-2 gap-4 p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
            }`}
          >
            <div>
              <p
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Customer
              </p>
              <p
                className={`font-medium ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {order.buyer?.username}
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {order.buyer?.email}
              </p>
            </div>
            <div>
              <p
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Seller
              </p>
              <p
                className={`font-medium ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {order.seller?.username}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4
              className={`font-medium ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Products ({totalItems} items)
            </h4>
            {validProducts.map((item) => (
              <div
                key={item._id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
                }`}
              >
                <div>
                  <p
                    className={`font-medium ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {item.prod.name}
                  </p>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div
                  className={`text-right ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  <p className="font-medium">PKR {item.prod.price}</p>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Total: PKR {item.prod.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
            }`}
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Total Amount
                </p>
                <p
                  className={`font-bold ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  PKR {order.totalAmount}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Status
                </p>
                <OrderStatusBadge status={order.orderStatus} />
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                    Order Date
                  </p>
                  <p className={isDarkMode ? "text-white" : "text-gray-800"}>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange, isDarkMode }) => {
  return (
    <div className="flex justify-center mt-6 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg ${
          isDarkMode
            ? "bg-gray-700 text-white hover:bg-gray-600"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        } disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === index + 1
              ? isDarkMode
                ? "bg-blue-600 text-white"
                : "bg-blue-500 text-white"
              : isDarkMode
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg ${
          isDarkMode
            ? "bg-gray-700 text-white hover:bg-gray-600"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        } disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
      >
        Next
      </button>
    </div>
  );
};

const OrderDetailsPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { drawerState } = useAuth();
  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const fetchOrders = async (page) => {
    try {
      const response = await axios.get(`orders/buyer-orders?page=${page}`);
      if (response.data && response.data.orders) {
        setOrders(response.data.orders);
        setTotalPages(response.data.pages);
      } else {
        setError("No orders data found");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders");
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (orderId) => {
    try {
      const response = await axios.get(`orders/${orderId}`);
      if (response.data && response.data.order) {
        setSelectedOrder(response.data.order);
      } else {
        toast.error("Order details not found");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Failed to load order details");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div
      className={
        drawerState
          ? "blur bg-blue-950 cursor-none"
          : ""
      }
    >
      <div
        className={`min-h-screen w-full h-full ${
          isDarkMode
            ? "bg-gradient-to-br from-[#2b4e7e] to-black"
            : "bg-gray-100"
        }`}
      >
        <motion.button
          onClick={toggleTheme}
          className={`fixed top-6 right-6 p-3 rounded-full z-50 ${
            isDarkMode
              ? "bg-white/10 hover:bg-white/20"
              : "bg-white/80 hover:bg-white/90"
          } backdrop-blur-sm shadow-lg transition-all duration-300`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isDarkMode ? (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
              />
            </motion.svg>
          ) : (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </motion.svg>
          )}
        </motion.button>

        <div className="container mx-auto py-8 px-4">
          <div
            className={`rounded-xl shadow-lg overflow-hidden ${
              isDarkMode ? "bg-gray-800/50" : "bg-white"
            } backdrop-blur-sm`}
          >
            <div className="p-6">
              <h2
                className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                <FiPackage className="w-6 h-6" />
                Order History
              </h2>

              {orders && orders.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr
                          className={`border-b ${
                            isDarkMode ? "border-gray-700" : "border-gray-200"
                          }`}
                        >
                          <th className="text-left py-4 px-4">No.</th>
                          <th className="text-left py-4 px-4">Products</th>
                          <th className="text-left py-4 px-4">Seller</th>
                          <th className="text-left py-4 px-4">Total Amount</th>
                          <th className="text-left py-4 px-4">Status</th>
                          <th className="text-left py-4 px-4">Date</th>
                          <th className="text-left py-4 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, index) => (
                          <tr
                            key={order._id}
                            className={`border-b ${
                              isDarkMode ? "border-gray-700" : "border-gray-200"
                            }`}
                          >
                            <td className="py-4 px-4">
                              <span
                                className={`font-medium ${
                                  isDarkMode ? "text-gray-300" : "text-gray-600"
                                }`}
                              >
                                {index + 1}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                {order.product &&
                                  getValidProducts(order.product)[0] && (
                                    <>
                                      <img
                                        src={
                                          getValidProducts(order.product)[0]
                                            .prod.imageUrl?.url
                                        }
                                        alt={
                                          getValidProducts(order.product)[0]
                                            .prod.name
                                        }
                                        className="w-10 h-10 rounded object-cover"
                                        onError={(e) => {
                                          e.target.src = "fallback-image-url";
                                        }}
                                      />
                                      <div>
                                        <p
                                          className={
                                            isDarkMode
                                              ? "text-white"
                                              : "text-gray-800"
                                          }
                                        >
                                          {
                                            getValidProducts(order.product)[0]
                                              .prod.name
                                          }
                                        </p>
                                        {getValidProducts(order.product)
                                          .length > 1 && (
                                          <p
                                            className={`text-xs ${
                                              isDarkMode
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                            }`}
                                          >
                                            +
                                            {getValidProducts(order.product)
                                              .length - 1}{" "}
                                            more items
                                          </p>
                                        )}
                                      </div>
                                    </>
                                  )}
                                {(!order.product ||
                                  getValidProducts(order.product).length ===
                                    0) && (
                                  <p
                                    className={`text-sm ${
                                      isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    Product Discontinued
                                  </p>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <p
                                className={`font-medium ${
                                  isDarkMode ? "text-white" : "text-gray-800"
                                }`}
                              >
                                {order.seller?.username || "N/A"}
                              </p>
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`font-medium ${
                                  isDarkMode ? "text-white" : "text-gray-800"
                                }`}
                              >
                                PKR {order.totalAmount || 0}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <OrderStatusBadge
                                status={order.orderStatus || "pending"}
                              />
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={
                                  isDarkMode ? "text-gray-300" : "text-gray-600"
                                }
                              >
                                {order.orderDate
                                  ? new Date(
                                      order.orderDate
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <button
                                onClick={() => handleViewDetails(order._id)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                                  isDarkMode
                                    ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                                } transition-colors`}
                              >
                                <FiEye className="w-4 h-4" />
                                Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    isDarkMode={isDarkMode}
                  />
                </>
              ) : (
                <div
                  className={`text-center py-8 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  No orders found
                </div>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selectedOrder && (
            <OrderDetailsModal
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
