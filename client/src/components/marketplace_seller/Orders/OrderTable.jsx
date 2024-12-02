import { motion, AnimatePresence } from "framer-motion";
import OrderDetailsModal from "./OrderDetailsModal";
import { FiRefreshCw, FiEye } from "react-icons/fi";

export default function OrderTable({
  loading,
  error,
  orders,
  openUpdateStatusModal,
  openOrderDetails,
  setIsOrderDetailModalOpen,
  isOrderDetailModalOpen,
  type,
  selectedOrderId,
  isDarkMode
}) {
  const getStatusStyles = (status) => {
    switch (status) {
      case "delivered":
        return {
          dotColor: "bg-green-500",
          bgColor: isDarkMode ? "bg-green-500/10" : "bg-green-50",
          textColor: isDarkMode ? "text-green-300" : "text-green-700"
        };
      case "shipped":
        return {
          dotColor: "bg-blue-500",
          bgColor: isDarkMode ? "bg-blue-500/10" : "bg-blue-50",
          textColor: isDarkMode ? "text-blue-300" : "text-blue-700"
        };
      case "cancelled":
        return {
          dotColor: "bg-red-500",
          bgColor: isDarkMode ? "bg-red-500/10" : "bg-red-50",
          textColor: isDarkMode ? "text-red-300" : "text-red-700"
        };
      default: // pending
        return {
          dotColor: "bg-yellow-500",
          bgColor: isDarkMode ? "bg-yellow-500/10" : "bg-yellow-50",
          textColor: isDarkMode ? "text-yellow-300" : "text-yellow-700"
        };
    }
  };

  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className={`text-center p-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className="text-left py-4 px-4">
                  <span className={`text-xs font-medium uppercase tracking-wider ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-800'
                  }`}>
                    Order Num
                  </span>
                </th>
                <th className="text-left py-4 px-4">
                  <span className={`text-xs font-medium uppercase tracking-wider ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-800'
                  }`}>
                    Customer
                  </span>
                </th>
                <th className="text-left py-4 px-4">
                  <span className={`text-xs font-medium uppercase tracking-wider ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-800'
                  }`}>
                    Date
                  </span>
                </th>
                <th className="text-left py-4 px-4">
                  <span className={`text-xs font-medium uppercase tracking-wider ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-800'
                  }`}>
                    Status
                  </span>
                </th>
                <th className="text-left py-4 px-4">
                  <span className={`text-xs font-medium uppercase tracking-wider ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-800'
                  }`}>
                    Total
                  </span>
                </th>
                {type !== "analytics" && (
                  <th className="text-left py-4 px-4">
                    <span className={`text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-800'
                    }`}>
                      Actions
                    </span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              <AnimatePresence>
                {orders.map((order, index) => {
                  const status = getStatusStyles(order.orderStatus);
                  return (
                    <motion.tr
                      key={order._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="font-medium">{order.buyer.username}</p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {order.buyer.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full w-fit ${status.bgColor}`}>
                          <div className={`w-2 h-2 rounded-full ${status.dotColor}`} />
                          <span className={`text-sm font-medium ${status.textColor}`}>
                            {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium">
                          Rs. {order.totalAmount.toLocaleString()}
                        </span>
                      </td>
                      {type !== "analytics" && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openUpdateStatusModal(order._id, order.orderStatus)}
                              className={`p-2 rounded-lg ${
                                isDarkMode 
                                  ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' 
                                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                              }`}
                            >
                              <FiRefreshCw className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => openOrderDetails(order._id)}
                              className={`p-2 rounded-lg ${
                                isDarkMode 
                                  ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30' 
                                  : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                              }`}
                            >
                              <FiEye className="h-4 w-4" />
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
        </div>
      )}

      <OrderDetailsModal
        orderId={selectedOrderId}
        isOpen={isOrderDetailModalOpen}
        onClose={() => setIsOrderDetailModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
