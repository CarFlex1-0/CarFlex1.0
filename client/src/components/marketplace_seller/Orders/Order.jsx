import { useState, useEffect } from "react";
import axiosInstance from "@services/axios";
import OrderTable from "./OrderTable";
import Pagination from "../Products/Pagination";
import { toast } from "react-toastify";

const Order = ({ type })=> {
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

      if(response.status ===200){
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Orders</h2>
        <div className="form-control">
          {type === "analytics" ? (
            <></>
          ) : (
            <select
              name="status"
              className="select select-bordered w-full max-w-xs"
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
      />

      {/* Pagination */}
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />

      {/* Update Order Status Modal */}
      {isModalOpen && (
        <dialog
          id="update_order_status_modal"
          className={`modal ${isModalOpen ? "modal-open" : ""}`}
        >
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="font-bold text-lg mb-4">Update Order Status</h3>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Order Status</span>
              </label>
              <select
                name="orderStatus"
                className="select select-bordered"
                value={selectedOrderStatus}
                onChange={(e) => setSelectedOrderStatus(e.target.value)}
              >
                {status.map((stat) => (
                  <option key={stat} value={stat}>
                    {stat.charAt(0).toUpperCase() + stat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={handleUpdateOrderStatus}
              >
                Update
              </button>
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
export default Order;