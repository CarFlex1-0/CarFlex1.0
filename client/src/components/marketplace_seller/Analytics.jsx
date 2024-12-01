import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Product } from "./Products/Product";
import Order  from "./Orders/Order";

export default function Analytics() {
  const salesData = [
    { month: "Jan", sales: 4000, orders: 240 },
    { month: "Feb", sales: 3000, orders: 198 },
    { month: "Mar", sales: 5000, orders: 280 },
    { month: "Apr", sales: 4500, orders: 308 },
    { month: "May", sales: 6000, orders: 387 },
  ];

  const stats = [
    { title: "Total Sales", value: "$22,500", change: "+12.5%" },
    { title: "Total Orders", value: "1,413", change: "+8.2%" },
    { title: "Active Products", value: "45", change: "+3.1%" },
    { title: "Customer Reviews", value: "4.8/5", change: "+0.3" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="stats shadow">
            <div className="stat">
              <div className="stat-title">{stat.title}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-desc text-success">
                {stat.change} since last month
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">Sales Overview</h3>
          <BarChart width={800} height={300} data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#82ca9d" />
            <Bar dataKey="orders" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
      <Product type="analytics" />
      <Order type="analytics" />
    </div>
  );
}
