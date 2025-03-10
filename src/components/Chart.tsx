import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHoldings } from "../context/HoldingsContext";
import { FiDollarSign, FiShoppingCart, FiTrendingUp, FiAlertCircle } from "react-icons/fi";

declare global {
  interface Window {
    TradingView: any;
  }
}

const Chart = ({ selectedPair, onCompanyChange }) => {
  const containerRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { refreshHoldings, balance } = useHoldings();
  
  // Fetch current price for the selected pair
  useEffect(() => {
    const fetchCurrentPrice = async () => {
      try {
        const response = await fetch(`https://stock-api-v2-0.onrender.com/api/stock-price/${selectedPair}`);
        const data = await response.json();
        if (response.ok) {
          setCurrentPrice(data.price);
        }
      } catch (error) {
        console.error("Error fetching current price:", error);
      }
    };
    
    fetchCurrentPrice();
    
    // Refresh price every 30 seconds
    const intervalId = setInterval(fetchCurrentPrice, 30000);
    
    return () => clearInterval(intervalId);
  }, [selectedPair]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          container_id: "tradingview_chart",
          width: "100%",
          height: "400",
          symbol: selectedPair,
          interval: "15",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#0a0d1c",
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          studies: ["RSI@tv-basicstudies"],
          show_popup_button: true,
          hide_volume: true,
        });
      }
    };

    document.body.appendChild(script);

    onCompanyChange(selectedPair);
    console.log(`Loading chart for: ${selectedPair}`);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [selectedPair, onCompanyChange]);

  const handleTransaction = async (type: "buy" | "sell") => {
    setErrorMessage(null);
    setLoading(true);
    
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      setErrorMessage("Unauthorized: No token found");
      setLoading(false);
      return;
    }

    const apiUrl = type === "buy"
      ? "https://stock-api-v2-0.onrender.com/api/buy/"
      : "https://stock-api-v2-0.onrender.com/api/sell/";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ symbol: selectedPair, quantity }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `Error ${response.status}: ${response.statusText}`);
      }

      // Refresh holdings data immediately after successful transaction
      await refreshHoldings();

      // Display success notification
      toast.success(
        <div className="flex">
          <div className="mr-3">
            {type === "buy" ? (
              <div className="h-10 w-10 rounded-full bg-green-900/60 flex items-center justify-center">
                <FiShoppingCart className="text-green-400" size={18} />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-full bg-red-900/60 flex items-center justify-center">
                <FiDollarSign className="text-red-400" size={18} />
              </div>
            )}
          </div>
          <div>
            <h4 className="font-bold text-base">{type === "buy" ? "Purchase Successful" : "Sale Successful"}</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
              <p className="text-sm text-gray-300">Symbol:</p>
              <p className="text-sm font-medium">{selectedPair}</p>
              
              <p className="text-sm text-gray-300">Quantity:</p>
              <p className="text-sm font-medium">{quantity}</p>
              
              <p className="text-sm text-gray-300">Price:</p>
              <p className="text-sm font-medium">${currentPrice?.toFixed(2) || "N/A"}</p>
              
              <p className="text-sm text-gray-300">Total:</p>
              <p className="text-sm font-medium">${((currentPrice || 0) * quantity).toFixed(2)}</p>
              
              <p className="text-sm text-gray-300">Balance:</p>
              <p className="text-sm font-medium text-green-400">${data.remaining_balance.toFixed(2)}</p>
            </div>
          </div>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "bg-gray-800 border border-gray-700",
        }
      );
    } catch (error) {
      setErrorMessage((error as Error).message);
      toast.error(
        <div className="flex">
          <div className="mr-3">
            <div className="h-10 w-10 rounded-full bg-red-900/60 flex items-center justify-center">
              <FiAlertCircle className="text-red-400" size={18} />
            </div>
          </div>
          <div>
            <h4 className="font-bold">Transaction Failed</h4>
            <p className="text-sm mt-1">{(error as Error).message}</p>
          </div>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          className: "bg-gray-800 border border-gray-700",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle quantity input change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  // Handle quantity increment/decrement
  const adjustQuantity = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };
  
  // Check if user can afford the purchase
  const canAffordPurchase = balance !== null && balance >= ((currentPrice || 0) * quantity);

  return (
    <div className="mb-4">
      {/* Header section with stock details */}
      <div className="flex items-center justify-between bg-gray-900 px-5 py-3 border-b border-gray-700 mb-4 rounded-t-lg">
        <div className="flex items-center">
          <FiTrendingUp className="text-blue-400 mr-2" />
          <h3 className="font-medium">{selectedPair}</h3>
          {currentPrice && (
            <span className="ml-3 text-green-400 font-bold">${currentPrice.toFixed(2)}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left side - Trading Panel */}
        <div className="lg:w-1/3 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden order-2 lg:order-1">
          <div className="bg-gray-900 px-5 py-3 border-b border-gray-700">
            <h3 className="font-medium">Trading Panel</h3>
          </div>
          
          <div className="p-4">
            {/* Financial Information */}
            <div className="mb-4">
              <div className="bg-gray-900/70 p-3 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Available Balance:</span>
                  <span className="text-lg font-medium text-green-400">${balance !== null ? balance.toFixed(2) : '0.00'}</span>
                </div>
              </div>
            </div>

            {/* Trading Controls */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="quantity" className="block text-sm text-gray-400 mb-2">Quantity</label>
                <div className="flex">
                  <button 
                    onClick={() => adjustQuantity(-1)} 
                    className="bg-gray-700 text-white w-10 rounded-l-lg hover:bg-gray-600 focus:outline-none flex items-center justify-center"
                    disabled={quantity <= 1}
                  >
                    <span className="text-xl">−</span>
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-full bg-gray-900 text-white text-center py-2 border-y border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    min="1"
                  />
                  <button 
                    onClick={() => adjustQuantity(1)} 
                    className="bg-gray-700 text-white w-10 rounded-r-lg hover:bg-gray-600 focus:outline-none flex items-center justify-center"
                  >
                    <span className="text-xl">+</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <button
                  className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 flex items-center justify-center gap-1 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  onClick={() => handleTransaction("buy")}
                  disabled={loading || (balance !== null && !canAffordPurchase)}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiShoppingCart className="mr-1" />
                      Buy {selectedPair}
                    </>
                  )}
                </button>
                <button
                  className="bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition duration-200 flex items-center justify-center gap-1 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  onClick={() => handleTransaction("sell")}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiDollarSign className="mr-1" />
                      Sell {selectedPair}
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {errorMessage && (
              <div className="bg-red-900/30 border border-red-900/50 text-white p-3 rounded-lg mt-4">
                <p className="font-medium">Error: {errorMessage}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Chart */}
        <div className="lg:w-2/3 tradingview-widget-container rounded-lg overflow-hidden border border-gray-700 min-h-[400px] order-1 lg:order-2">
          <div id="tradingview_chart" ref={containerRef} className="h-full"></div>
        </div>
      </div>
    </div>
  );
};

Chart.propTypes = {
  selectedPair: PropTypes.string.isRequired,
  onCompanyChange: PropTypes.func.isRequired,
};

export default Chart;
