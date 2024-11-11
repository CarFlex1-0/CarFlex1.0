import React from "react";
import { SideBar } from "@components/user/SideBar";
import { Outlet } from "react-router-dom";
import Dashboard from "@components/Dashboard";
import { useTheme } from '@contexts/ThemeContext';
export default function UserDashboard() {
  const { isDarkMode } = useTheme();
  return (
    <div className="h-full w-auto flex ">
      {/* Sidebar will take up part of the screen width */}
      <SideBar />
      {/* <Dashboard /> */}
      {/* Outlet will take up the remaining space */}
      <div className={`flex-1 rounded-lg ${
        isDarkMode
          ? 'bg-gradient-to-br from-blue-950 to-indigo-950'
          : 'bg-gradient-to-br from-blue-100 to-indigo-100'
      }`}>
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