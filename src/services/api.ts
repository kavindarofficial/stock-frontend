import axios from "axios";

// Base URL for the backend
const BASE_URL = "https://stock-api-v2-0.onrender.com";

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to log in and retrieve JWT tokens
export const login = async (username: string, password: string) => {
    try {
      const response = await fetch("https://stock-api-v2-0.onrender.com/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      console.log("API Response:", data); // Debugging
  
      if (!response.ok) {
        throw new Error(data.detail || "Invalid credentials");
      }
  
      return data; // { access: "...", refresh: "..." }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.message);
    }
  };
  
  

// Function to refresh JWT token
export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await api.post("/token/refresh/", { refresh: refreshToken });
    return response.data; // { access: "new_jwt_token" }
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
};

// Function to buy stock
export const buyStock = async (symbol: string, volume: number, token: string) => {
  try {
    const response = await api.post(
      "/buy/",
      { symbol, volume },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to buy stock");
  }
};

// Function to sell stock
export const sellStock = async (symbol: string, volume: number, token: string) => {
  try {
    const response = await api.post(
      "/sell/",
      { symbol, volume },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to sell stock");
  }
};

// Function to fetch user's holdings
export const fetchHoldings = async (token: string) => {
  try {
    const response = await api.get("/holdings/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch holdings");
  }
};
