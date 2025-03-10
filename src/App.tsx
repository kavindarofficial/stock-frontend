import React, { useState, useEffect } from "react";
import { FiStar } from "react-icons/fi";
import { fetchMarketData } from "./services/marketDataService";
import Chart from "./components/Chart";
import { MarketList } from "./components/MarketList";
import OrdersTable from "./components/OrdersTable";
import { SideNavigation } from "./components/SideNavigation";
import Login from "./components/Login";
import CisbosiumPage from "./components/CisbosiumPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HoldingsProvider } from "./context/HoldingsContext";

export type MarketData = {
  pair: string; // Stock symbol (e.g., AAPL)
  fullName: string; // Full company name (e.g., Apple Inc.)
  industry: string; // Industry or company type (e.g., Technology)
};

function App(): JSX.Element {
  const [selectedCompany, setSelectedCompany] = useState("AAPL");
  const [selectedMarket, setSelectedMarket] = useState<MarketData | null>(null);
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem("jwt_token"));
  const [activeView, setActiveView] = useState<"market" | "cisbosium">("market");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMarketData();
      setMarketData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const market: MarketData | undefined = marketData.find((m) => m.pair === selectedCompany);
    if (market) {
      setSelectedMarket(market);
    }
  }, [selectedCompany, marketData]);

  const handleCompanyChange = (pair: string) => {
    setSelectedCompany(pair);
  };

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("jwt_token", newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("jwt_token");
  };

  const handleViewChange = (view: "market" | "cisbosium") => {
    setActiveView(view);
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <HoldingsProvider>
      <div className="min-h-screen bg-[#0a0d1c] text-white flex">
        <SideNavigation onLogout={handleLogout} onViewChange={handleViewChange} activeView={activeView} />
        <div className="flex-1 flex flex-col ml-16 h-screen overflow-hidden">
          <header className="flex justify-between items-center px-6 py-3 border-b border-gray-800 flex-shrink-0">
            <div className="flex items-center space-x-4">
              {activeView === "market" ? (
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-medium">{selectedMarket ? selectedMarket.pair : selectedCompany}</span>
                  <FiStar className="text-gray-400 cursor-pointer hover:text-yellow-400" />
                  {selectedMarket && (
                    <span className="text-gray-400 text-sm ml-2">{selectedMarket.fullName}</span>
                  )}
                </div>
              ) : (
                <h1 className="text-xl font-medium">Cisbosium 2025</h1>
              )}
            </div>
          </header>
    
          {activeView === "market" ? (
            <div className="flex flex-1 overflow-hidden">
              <div className="w-64 lg:w-72 border-r border-gray-800 flex-shrink-0 overflow-y-auto">
                <MarketList data={marketData} onCompanySelect={handleCompanyChange} />
              </div>
    
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex flex-col space-y-4 h-full">
                  <Chart selectedPair={selectedCompany} onCompanyChange={handleCompanyChange} />
                  <OrdersTable />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <CisbosiumPage />
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </HoldingsProvider>
  );
}

export default App;
