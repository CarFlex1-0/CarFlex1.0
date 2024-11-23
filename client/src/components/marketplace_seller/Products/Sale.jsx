export function Sale() {
  const sales = [
    {
      id: 1,
      date: "2024-03-18",
      revenue: 2500,
      items: 15,
      customer: "John Doe",
    },
    {
      id: 2,
      date: "2024-03-17",
      revenue: 1800,
      items: 12,
      customer: "Jane Smith",
    },
    {
      id: 3,
      date: "2024-03-16",
      revenue: 3200,
      items: 20,
      customer: "Bob Johnson",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Sales History</h2>

      {/* Sales Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value">$7,500</div>
          <div className="stat-desc">↗︎ 12% more than last month</div>
        </div>

        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Average Order Value</div>
          <div className="stat-value">$158</div>
          <div className="stat-desc">↗︎ 5% more than last month</div>
        </div>

        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Total Items Sold</div>
          <div className="stat-value">47</div>
          <div className="stat-desc">↗︎ 8% more than last month</div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Revenue</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.date}</td>
                <td>{sale.customer}</td>
                <td>{sale.items}</td>
                <td>${sale.revenue}</td>
                <td>
                  <button className="btn btn-sm btn-info">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
