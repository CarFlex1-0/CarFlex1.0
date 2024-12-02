import React, { useState, useEffect } from "react";
import axiosInstance from "@services/axios";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@contexts/ThemeContext";
import { FiX, FiPackage, FiUser, FiCalendar } from "react-icons/fi";

const OrderDetailsModal = ({ orderId, isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrderDetails = async () => {
    if (!orderId) return;

    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/orders/${orderId}`);
      setOrderDetails(data.order);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
      setError("Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOrderDetails();
    }
  }, [isOpen, orderId]);

  if (!isOpen) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return isDarkMode ? "text-green-300" : "text-green-600";
      case "shipped":
        return isDarkMode ? "text-blue-300" : "text-blue-600";
      case "cancelled":
        return isDarkMode ? "text-red-300" : "text-red-600";
      default:
        return isDarkMode ? "text-yellow-300" : "text-yellow-600";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`w-full max-w-4xl p-6 rounded-xl shadow-xl ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div
            className={`text-center ${
              isDarkMode ? "text-red-400" : "text-red-600"
            }`}
          >
            {error}
          </div>
        ) : (
          orderDetails && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3
                  className={`text-xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Order Details
                </h3>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-lg ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Customer Information */}
                <div
                  className={`p-4 rounded-lg ${
                    isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <FiUser
                      className={isDarkMode ? "text-gray-400" : "text-gray-500"}
                    />
                    <h4
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Customer Information
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <p
                      className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                    >
                      <span className="font-medium">Name:</span>{" "}
                      {orderDetails.buyer.username}
                    </p>
                    <p
                      className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                    >
                      <span className="font-medium">Email:</span>{" "}
                      {orderDetails.buyer.email}
                    </p>
                  </div>
                </div>

                {/* Order Summary */}
                <div
                  className={`p-4 rounded-lg ${
                    isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <FiCalendar
                      className={isDarkMode ? "text-gray-400" : "text-gray-500"}
                    />
                    <h4
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Order Summary
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <p
                      className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                    >
                      <span className="font-medium">Order Date:</span>{" "}
                      {new Date(orderDetails.orderDate).toLocaleString()}
                    </p>
                    <p
                      className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                    >
                      <span className="font-medium">Status:</span>{" "}
                      <span
                        className={getStatusColor(orderDetails.orderStatus)}
                      >
                        {orderDetails.orderStatus.charAt(0).toUpperCase() +
                          orderDetails.orderStatus.slice(1)}
                      </span>
                    </p>
                    <p
                      className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                    >
                      <span className="font-medium">Total Amount:</span> PKR{" "}
                      {orderDetails.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div
                className={`rounded-lg overflow-hidden ${
                  isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
                }`}
              >
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <FiPackage
                      className={isDarkMode ? "text-gray-400" : "text-gray-500"}
                    />
                    <h4
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Products
                    </h4>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead
                      className={`${
                        isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
                      }`}
                    >
                      <tr>
                        <th
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Product Name
                        </th>
                        <th
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Price
                        </th>
                        <th
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Quantity
                        </th>
                        <th
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className={`divide-y ${
                        isDarkMode ? "divide-gray-700" : "divide-gray-200"
                      }`}
                    >
                      {orderDetails.prod ? (
                        orderDetails.product.map((item) => (
                          <tr
                            key={item._id}
                            className={
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              {item.prod.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              PKR {item.prod.price.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              PKR{" "}
                              {(
                                item.prod.price * item.quantity
                              ).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            className={`text-center py-4 ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            Product no longer exists.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={onClose}
                  className={`px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  }`}
                >
                  Close
                </button>
              </div>
            </>
          )
        )}
      </motion.div>
    </div>
  );
};

export default OrderDetailsModal;
