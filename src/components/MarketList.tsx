import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

type MarketListProps = {
  data: Array<{ pair: string; fullName: string; industry: string }>;
  onCompanySelect: (pair: string) => void;
};

export const MarketList: React.FC<MarketListProps> = ({ data, onCompanySelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search stocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-3 py-2 w-full bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1 pb-4">
        <h2 className="text-lg font-medium text-white px-4 py-3 sticky top-0 bg-[#0a0d1c] z-10 border-b border-gray-800">
          Available Stocks
        </h2>
        
        {filteredData.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No stocks found matching "{searchTerm}"</div>
        ) : (
          <ul className="divide-y divide-gray-800">
            {filteredData.map((item) => (
              <li key={item.pair} className="px-4 py-3 hover:bg-gray-800 cursor-pointer transition-colors">
                <button
                  onClick={() => onCompanySelect(item.pair)}
                  className="w-full text-left focus:outline-none"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-900/40 flex items-center justify-center mr-3 text-blue-400 font-medium text-xs">
                      {item.pair.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-medium">{item.pair}</div>
                      <div className="text-xs text-gray-400 truncate max-w-[170px]">{item.fullName}</div>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
