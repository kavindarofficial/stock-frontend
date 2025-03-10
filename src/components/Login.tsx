import React, { useState } from "react";
import { FiUser, FiLock, FiLogIn, FiAlertCircle, FiCalendar, FiBookOpen, FiAward } from "react-icons/fi";

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("https://stock-api-v2-0.onrender.com/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.access);
        onLogin(data.access);
        setError("");
      } else {
        setError(data.detail || "Invalid username or password");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0a0d1c]">
      {/* Left side - Event Information */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop')",
            filter: "brightness(0.9)"
          }}
        ></div>
        <div className="relative z-10 flex flex-col justify-center w-full p-10 text-white">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-700/50 rounded-full text-white text-sm mb-3">
              <FiCalendar className="mr-2" /> 10th - 14th March 2025
            </div>
            <h1 className="text-4xl font-bold mb-2">Stock Market Challenge</h1>
            <p className="text-lg font-light">Test your financial acumen in our simulated trading competition</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold flex items-center mb-3">
              <FiBookOpen className="mr-2" /> Event Highlights
            </h2>
            
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">💳</span>
                <span>Start with virtual credits to build your portfolio</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">🔄</span>
                <span>Trade stocks with real-time market prices</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">🏆</span>
                <span>Compete for prizes with the highest portfolio value</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-auto">
            <div className="flex items-center space-x-2 mb-2">
              <FiAward className="text-yellow-400" size={20} />
              <span className="font-semibold">Cisbosium 2025</span>
            </div>
            <p className="text-sm">Department of Computer Science and Business Systems</p>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 md:w-1/2 bg-gradient-to-b from-[#0a0d1c] to-[#131836]">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="mt-3 text-gray-400">Please sign in to your account</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            {error && (
              <div className="bg-red-900/50 border border-red-800 rounded-lg p-3 flex items-start">
                <FiAlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium text-lg shadow-lg shadow-blue-900/30 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <FiLogIn className="mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
