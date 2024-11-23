export function Order({type}) {
  const orders = [
    {
      id: 1,
      customer: "Alice Brown",
      date: "2024-03-18",
      status: "Pending",
      total: 450,
    },
    {
      id: 2,
      customer: "Charlie Davis",
      date: "2024-03-18",
      status: "Shipped",
      total: 890,
    },
    {
      id: 3,
      customer: "Eva Fischer",
      date: "2024-03-17",
      status: "Delivered",
      total: 340,
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        {type === "analytics" ? "Recent Orders" : "Orders Management"}
      </h2>

      {/* Order Filters */}
      {type == "analytics" ? (
        <></>
      ) : (
        <div className="flex gap-4 mb-6">
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>
              Filter by Status
            </option>
            <option>All Orders</option>
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>

          <input
            type="text"
            placeholder="Search orders..."
            className="input input-bordered w-full max-w-xs"
          />
        </div>
      )}

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              {type === "analytics" ? <></> : <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>
                  <span
                    className={`badge ${
                      order.status === "Delivered"
                        ? "badge-success"
                        : order.status === "Shipped"
                        ? "badge-info"
                        : "badge-warning"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>${order.total}</td>
                {type === "analytics" ? (
                  <></>
                ) : (
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-sm btn-info">View</button>
                      <button className="btn btn-sm btn-success">Update</button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
