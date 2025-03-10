import React from "react";
import { FiLogOut, FiBarChart2, FiClipboard } from "react-icons/fi";

type SideNavigationProps = {
  onLogout: () => void;
  onViewChange: (view: "market" | "cisbosium") => void;
  activeView: "market" | "cisbosium";
};

export const SideNavigation: React.FC<SideNavigationProps> = ({ 
  onLogout, 
  onViewChange,
  activeView 
}) => {
  const token = localStorage.getItem("jwt_token");

  return (
    <nav className="fixed top-0 left-0 w-16 h-screen bg-gray-900 text-white flex flex-col items-center py-6 shadow-lg">
      <div className="flex flex-col items-center gap-8 mt-4">
        <button
          onClick={() => onViewChange("market")}
          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
            activeView === "market" 
              ? "bg-blue-600 text-white" 
              : "hover:bg-gray-800 text-gray-400"
          }`}
          title="Market View"
        >
          <FiBarChart2 size={22} />
        </button>
        
        <button
          onClick={() => onViewChange("cisbosium")}
          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
            activeView === "cisbosium" 
              ? "bg-blue-600 text-white" 
              : "hover:bg-gray-800 text-gray-400"
          }`}
          title="Cisbosium 2025"
        >
          <FiClipboard size={22} />
        </button>
      </div>
      
      <div className="mt-auto pb-6 flex flex-col items-center gap-4">
        {token && (
          <button 
            onClick={onLogout}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-800 text-gray-400"
            title="Logout"
          >
            <FiLogOut size={22} />
          </button>
        )}
      </div>
    </nav>
  );
};
