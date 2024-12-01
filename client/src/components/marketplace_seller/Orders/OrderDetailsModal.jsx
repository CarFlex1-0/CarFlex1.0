import React, { useState , useEffect} from "react";
import axiosInstance from "@services/axios";

const OrderDetailsModal = ({ orderId, isOpen, onClose }) =>{
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

  if (loading)
    return (
      <dialog className="modal modal-open">
        <div className="modal-box">
          <p>Loading order details...</p>
        </div>
      </dialog>
    );

  if (error)
    return (
      <dialog className="modal modal-open">
        <div className="modal-box">
          <p className="text-error">{error}</p>
          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    );

  if (!orderDetails) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg mb-4">Order Details</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Customer Information */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h4 className="card-title">Customer Information</h4>
              <p>
                <strong>Name:</strong> {orderDetails.buyer.username}
              </p>
              <p>
                <strong>Email:</strong> {orderDetails.buyer.email}
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h4 className="card-title">Order Summary</h4>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(orderDetails.orderDate).toLocaleString()}
              </p>
              <p>
                <strong>Order Status:</strong>
                <span
                  className={`badge ml-2 ${
                    orderDetails.orderStatus === "delivered"
                      ? "badge-success"
                      : orderDetails.orderStatus === "shipped"
                      ? "badge-info"
                      : "badge-warning"
                  }`}
                >
                  {orderDetails.orderStatus}
                </span>
              </p>
              <p>
                <strong>Total Amount:</strong> Rs.{" "}
                {orderDetails.totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="overflow-x-auto mt-4">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.product.map((item) => (
                <tr key={item._id}>
                  <td>{item.prod.name}</td>
                  <td>Rs. {item.prod.price.toLocaleString()}</td>
                  <td>{item.quantity}</td>
                  <td>
                    Rs. {(item.prod.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
export default OrderDetailsModal;