import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface StockHolding {
  stock_symbol: string;
  quantity: number;
}

interface HoldingsContextType {
  stockHoldings: StockHolding[];
  balance: number | null;
  loading: boolean;
  refreshHoldings: () => Promise<void>;
}

const HoldingsContext = createContext<HoldingsContextType | undefined>(undefined);

export const useHoldings = () => {
  const context = useContext(HoldingsContext);
  if (!context) {
    throw new Error('useHoldings must be used within a HoldingsProvider');
  }
  return context;
};

interface HoldingsProviderProps {
  children: ReactNode;
}

export const HoldingsProvider: React.FC<HoldingsProviderProps> = ({ children }) => {
  const [stockHoldings, setStockHoldings] = useState<StockHolding[]>([]);
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStockHoldings = async () => {
    const token = localStorage.getItem("jwt_token");
    if (!token) return;

    try {
      const response = await fetch("https://stock-api-v2-0.onrender.com/api/holdings/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setStockHoldings(data.stock_holdings || []);
        setBalance(data.balance);
      } else {
        console.error("Failed to fetch stock holdings:", data.error);
      }
    } catch (error) {
      console.error("Error fetching stock holdings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockHoldings();
  }, []);

  return (
    <HoldingsContext.Provider value={{ stockHoldings, balance, loading, refreshHoldings: fetchStockHoldings }}>
      {children}
    </HoldingsContext.Provider>
  );
}; 