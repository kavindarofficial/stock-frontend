import { MarketData } from '../App';

// Mock function to simulate fetching real-time market data
export const fetchMarketData = async (): Promise<MarketData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        [
          { "pair": "MSFT", "fullName": "Microsoft", "industry": "Technology" },
          { "pair": "AAPL", "fullName": "Apple", "industry": "Technology" },
          { "pair": "AMZN", "fullName": "Amazon", "industry": "E-commerce" },
          { "pair": "NVDA", "fullName": "NVIDIA", "industry": "Semiconductors" },
          { "pair": "TSLA", "fullName": "Tesla", "industry": "Automobile" },
          { "pair": "GOOGL", "fullName": "Google", "industry": "Technology" },
          { "pair": "META", "fullName": "Meta", "industry": "Social Media" },
          { "pair": "WMT", "fullName": "Walmart", "industry": "Retail" },
          { "pair": "JPM", "fullName": "JP Morgan", "industry": "Finance" },
          { "pair": "V", "fullName": "Visa", "industry": "Finance" },
          { "pair": "MA", "fullName": "MasterCard", "industry": "Finance" },
          { "pair": "NFLX", "fullName": "Netflix", "industry": "Entertainment" },
          { "pair": "ORCL", "fullName": "Oracle Corporation", "industry": "Technology" },
          { "pair": "CRM", "fullName": "Salesforce", "industry": "Technology" },
          { "pair": "CSCO", "fullName": "Cisco", "industry": "Technology" },
          { "pair": "MCD", "fullName": "McDonald's", "industry": "Food and Beverage" },
          { "pair": "ACN", "fullName": "Accenture", "industry": "Consulting" },
          { "pair": "GS", "fullName": "Goldman Sachs", "industry": "Finance" },
          { "pair": "QCOM", "fullName": "Qualcomm", "industry": "Semiconductors" },
          { "pair": "CAT", "fullName": "Caterpillar", "industry": "Heavy Machinery" },
          { "pair": "UBER", "fullName": "Uber", "industry": "Ride-hailing" },
          { "pair": "C", "fullName": "Citigroup", "industry": "Finance" },
          { "pair": "SHOP", "fullName": "Shopify", "industry": "E-commerce" },
          { "pair": "SBUX", "fullName": "Starbucks Corporation", "industry": "Food and Beverage" },
          { "pair": "SPOT", "fullName": "Spotify", "industry": "Entertainment" }
          ]
      );
    }, 1000);
  });
};
