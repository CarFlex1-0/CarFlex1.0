// src/components/Sidebar.js
import React from "react";

const Sidebar = ({ history, onSelectChat }) => {
  return (
    <div className="w-1/4 bg-gray-600 p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-slate-200">History</h2>
      {history.length === 0 ? (
        <p className="text-gray-500">No history available.</p>
      ) : (
        <ul className="">
          {history.map((item, index) => (
            <li
              key={index}
              className="mb-3 flex-1 p-4 shadow-xl rounded-lg bg-slate-700 border-b-2 border-t-2 border-gray-200/70 outline-none text-slate-200 placeholder-gray-300 focus:border-purple-400 transition duration-300 cursor-pointer"
              onClick={() => onSelectChat(item)} // Trigger onSelectChat when clicked
            >
              <p>{item.title}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
