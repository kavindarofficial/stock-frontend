import React from "react";
import { useHoldings } from "../context/HoldingsContext";
import { FiRefreshCw } from "react-icons/fi";

const OrdersTable = () => {
  const { stockHoldings, balance, loading, refreshHoldings } = useHoldings();

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">Your Stock Holdings</h2>
        <button
          onClick={refreshHoldings}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 text-sm"
          disabled={loading}
        >
          <FiRefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Display Balance */}
      {balance !== null && (
        <div className="bg-gray-800 p-4 rounded-lg mb-4 flex items-center justify-between">
          <span className="text-gray-400">Available Balance:</span>
          <span className="text-lg text-green-400 font-semibold">${balance.toFixed(2)}</span>
        </div>
      )}

      {loading && stockHoldings.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8">
          <div className="animate-pulse flex space-x-4 mb-4">
            <div className="rounded-full bg-gray-700 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
          <p className="text-gray-500">Loading your holdings...</p>
        </div>
      ) : stockHoldings.length === 0 ? (
        <div className="bg-gray-800/50 rounded-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-4">
            <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-400 mb-2">No stock holdings available</p>
          <p className="text-gray-500 text-sm">Start trading to see your portfolio here</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-700">
          <table className="w-full">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Stock Symbol</th>
                <th className="px-4 py-3 text-right font-medium">Quantity</th>
                <th className="px-4 py-3 text-right font-medium">Est. Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {stockHoldings.map((stock) => (
                <tr key={stock.stock_symbol} className="hover:bg-gray-800/70 transition-colors">
                  <td className="px-4 py-3 flex items-center">
                    <div className="w-8 h-8 bg-blue-900/30 rounded-full flex items-center justify-center mr-3 text-blue-400 font-medium text-xs">
                      {stock.stock_symbol.slice(0, 2)}
                    </div>
                    <span className="font-medium">{stock.stock_symbol}</span>
                  </td>
                  <td className="px-4 py-3 text-right">{stock.quantity}</td>
                  <td className="px-4 py-3 text-right text-green-400">
                    {/* Est. value would be calculated based on current price */}
                    <span className="opacity-70">$---.--</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
