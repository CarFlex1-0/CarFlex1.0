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
}) {
  return (
    <div className="custom-backdrop rounded-lg shadow-md overflow-hidden">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 text-center">{error}</div>
      ) : (
        <div className="overflow-x-auto custom-backdrop">
          <table className="w-full custom-backdrop">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Order Num
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Total
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
                {orders.map((order, index) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="text-gray-700 px-6 py-4 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="text-gray-700 px-6 py-4 whitespace-nowrap">
                      {order.buyer.username}
                    </td>
                    <td className="text-gray-700 px-6 py-4 whitespace-nowrap">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="text-gray-700 px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.orderStatus === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.orderStatus === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="text-gray-700 px-6 py-4 whitespace-nowrap">
                      Rs. {order.totalAmount.toLocaleString()}
                    </td>
                    {type !== "analytics" && (
                      <td className="text-gray-700 px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              openUpdateStatusModal(
                                order._id,
                                order.orderStatus
                              )
                            }
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            <FiRefreshCw className="h-5 w-5 mr-1" />
                            Status
                          </button>
                          <button
                            onClick={() => openOrderDetails(order._id)}
                            className="text-indigo-600 hover:text-indigo-900 flex items-center"
                          >
                            <FiEye className="h-5 w-5 mr-1" />
                            Details
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

      {/* OrderDetailsModal remains the same */}
      <OrderDetailsModal
        orderId={selectedOrderId}
        isOpen={isOrderDetailModalOpen}
        onClose={() => setIsOrderDetailModalOpen(false)}
      />
    </div>
  );
}
