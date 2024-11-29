import { SideBar } from "@components/user/SideBar";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme } from '@contexts/ThemeContext';
export default function UserDashboard() {
  const { isDarkMode } = useTheme();
  const location = useLocation(); // Get the current route

  // Check if the current path is /user/buy-parts
  const isBuyPartsRoute = location.pathname === "/user/buy-parts";
  return (
    <div className="h-full w-auto flex ">
      {/* Sidebar will take up part of the screen width */}
      <SideBar />
      {/* <Dashboard /> */}
      {/* Outlet will take up the remaining space */}
      <div
        className={`flex-1 ${
          isBuyPartsRoute
            ? "bg-gradient-to-br from-[#2b4e7e] to-black bg-opacity-100 min-h-screen"
            : "bg-gradient-to-br from-[#2b4e7e] to-black bg-opacity-100 min-h-screen"
        } rounded-lg`}
      >
        <Outlet />
      </div>
    </div>
  );
}


// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from '@components/Sidebar';
// import { useTheme } from '@contexts/ThemeContext';

// const UserDashboard = () => {
//   const { isDarkMode } = useTheme();

//   return (
//     <div className={`min-h-screen flex ${
//       isDarkMode 
//         ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
//         : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
//     }`}>
//       <Sidebar />
//       <div className="flex-1">
//         <div className={`p-4 min-h-screen ${
//           isDarkMode
//             ? 'bg-gray-900/50 backdrop-blur-sm'
//             : 'bg-white/50 backdrop-blur-sm'
//         }`}>
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;