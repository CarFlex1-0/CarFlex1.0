import { useState, useEffect } from "react";
import axiosInstance from "@services/axios";
import OrderTable from "./OrderTable";
import Pagination from "../Products/Pagination";
import { toast } from "react-toastify";
import { useTheme } from "@contexts/ThemeContext";
import { motion } from "framer-motion";
import { FiPackage, FiX } from "react-icons/fi";

const Order = ({ type }) => {
  const { isDarkMode } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
  });

  const status = ["pending", "shipped", "delivered", "cancelled"];

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/orders/seller-orders", {
        params: {
          page,
          status: filters.status,
        },
      });
      setOrders(data.orders);
      setTotalPages(data.pages);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update filters and reset to first page
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPage(1);
  };
  const openOrderDetails = (orderId) => {
    setSelectedOrderId(orderId);
    setIsOrderDetailModalOpen(true);
  };
  const openUpdateStatusModal = (orderId, currentStatus) => {
    setSelectedOrderId(orderId);
    setSelectedOrderStatus(currentStatus);
    setIsModalOpen(true);
  };

  const handleUpdateOrderStatus = async () => {
    try {
      const response = await axiosInstance.patch(
        `/orders/update-status/${selectedOrderId}`,
        { newStatus: selectedOrderStatus }
      );

      if (response.status === 200) {
        // Update the order in the local state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === selectedOrderId
              ? { ...order, orderStatus: selectedOrderStatus }
              : order
          )
        );

        // Show success toast
        toast.success("Order status updated successfully");
        // Close the modal
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to update order status:", error);

      // Show error toast
      toast.error(
        error.response?.data?.message || "Failed to update order status"
      );
    }
  };

  return (
    <div className={`p-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <div
          className={`p-2 rounded-lg ${
            isDarkMode ? "bg-white/10" : "bg-yellow-50"
          }`}
        >
          <FiPackage
            className={`w-6 h-6 ${
              isDarkMode ? "text-yellow-400" : "text-yellow-500"
            }`}
          />
        </div>
        <h2
          className={`text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Orders
        </h2>
      </motion.div>

      <div className="flex justify-between items-center mb-6">
        <div className="form-control">
          {type === "analytics" ? (
            <></>
          ) : (
            <select
              name="status"
              className={`select select-bordered w-full max-w-xs ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-200"
              }`}
              value={filters.status}
              onChange={handleInputChange}
            >
              <option value="">All Status</option>
              {status.map((stat) => (
                <option key={stat} value={stat}>
                  {stat.charAt(0).toUpperCase() + stat.slice(1)}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Order Table */}
      <OrderTable
        loading={loading}
        error={error}
        orders={orders}
        openUpdateStatusModal={openUpdateStatusModal}
        openOrderDetails={openOrderDetails}
        setIsOrderDetailModalOpen={setIsOrderDetailModalOpen}
        isOrderDetailModalOpen={isOrderDetailModalOpen}
        type={type}
        selectedOrderId={selectedOrderId}
        isDarkMode={isDarkMode}
      />

      {/* Pagination */}
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />

      {/* Update Order Status Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`w-full max-w-md p-6 rounded-xl shadow-xl ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3
                className={`text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Update Order Status
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

            <div
              className={`mb-6 ${
                isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
              } rounded-lg p-4`}
            >
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Select Status
              </label>
              <select
                name="orderStatus"
                value={selectedOrderStatus}
                onChange={(e) => setSelectedOrderStatus(e.target.value)}
                className={`w-full p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-600 text-white border-gray-600"
                    : "bg-white text-gray-900 border-gray-200"
                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {status.map((stat) => (
                  <option
                    key={stat}
                    value={stat}
                    className={isDarkMode ? "bg-gray-700" : "bg-white"}
                  >
                    {stat.charAt(0).toUpperCase() + stat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
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
                onClick={handleUpdateOrderStatus}
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                Update Status
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
export default Order;
