import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Analytics from "./Analytics";

export default function SellerDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
     
      <Sidebar />
      {/* Main Content */}

      {/* Dashboard content */}
      <main className="flex-grow overflow-y-auto bg-white p-6">
        <Outlet />
      </main>
    </div>
  );
}
