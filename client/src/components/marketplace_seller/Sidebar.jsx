import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiDollarSign,
  FiShoppingCart,
  FiEdit,
  FiUpload,
} from "react-icons/fi";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "dashboard", icon: FiHome },
    {
      name: "Products",
      path: "products",
      icon: FiShoppingBag,
      // subItems: [
      //   { name: "Edit Product", path: "products/edit", icon: FiEdit },
      //   { name: "Upload Product", path: "products/upload", icon: FiUpload },
      // ],
    },
    { name: "Sales", path: "sales", icon: FiDollarSign },
    { name: "Orders", path: "orders", icon: FiShoppingCart },
  ];

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="text-2xl font-bold mb-8 text-center">
        CarFlex
      </div>
      <nav>
        <ul className="space-y-2">
          {menu.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 ${
                  isActive(item.path)
                    ? "custom-backdrop text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
              {item.subItems && (
                <ul className="ml-6 mt-2 space-y-1">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.path}>
                      <Link
                        to={subItem.path}
                        className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 ${
                          isActive(subItem.path)
                            ? "custom-backdrop text-white"
                            : "text-gray-400 hover:bg-gray-700"
                        }`}
                      >
                        <subItem.icon className="w-4 h-4" />
                        <span className="text-sm">{subItem.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
