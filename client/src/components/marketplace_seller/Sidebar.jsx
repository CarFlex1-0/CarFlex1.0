import { Link } from "react-router-dom";
export default function Sidebar() {
  const menu = {
    dashboard: ["Dashboard", "dashboard"],
    products: ["Products", "products"],
    sales: ["Sales", "sales"],
    orders: ["Orders", "orders"],
  };
  return (
    <>
      <div className="bg-[#e5e5e5] min-h-full w-64">
        {" "}
        {/* Adjusted to w-64 */}
        <ul className="menu p-4 text-green-600">
          {Object.entries(menu).map(([key, [name, path]]) => (
            <li key={key}>
              <Link to={path}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
