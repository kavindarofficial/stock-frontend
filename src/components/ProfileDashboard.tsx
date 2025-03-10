import React, { useEffect, useState } from "react";

interface UserProfile {
  username: string;
  email: string;
  balance: number;
}

const ProfileDashboard: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    fetchUserProfile();
    fetchTransactionHistory();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("jwt_token");
    if (!token) return;

    try {
      const response = await fetch("https://stock-api-v2-0.onrender.com/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionHistory = async () => {
    const token = localStorage.getItem("jwt_token");
    if (!token) return;

    try {
      const response = await fetch("https://stock-api-v2-0.onrender.com/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions || []);
      } else {
        console.error("Failed to fetch transaction history");
      }
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };

  if (loading) {
    return <div className="bg-gray-900 p-6 rounded-lg shadow-md">Loading profile...</div>;
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Your Profile</h2>
      
      {profile ? (
        <div className="mb-6">
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <h3 className="text-xl text-blue-400 font-medium mb-2">Account Information</h3>
            <p className="text-gray-300 mb-1"><span className="font-medium">Username:</span> {profile.username}</p>
            <p className="text-gray-300 mb-1"><span className="font-medium">Email:</span> {profile.email}</p>
            <p className="text-green-400 text-lg font-semibold mt-2">Balance: ${profile.balance?.toFixed(2) || '0.00'}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">Unable to load profile information.</p>
      )}

      <div>
        <h3 className="text-xl text-blue-400 font-medium mb-3">Recent Transactions</h3>
        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-gray-300">
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Symbol</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-right">Quantity</th>
                  <th className="px-4 py-2 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-800">
                    <td className="px-4 py-2">{new Date(transaction.timestamp).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{transaction.symbol}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        transaction.type === 'buy' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                      }`}>
                        {transaction.type === 'buy' ? 'BUY' : 'SELL'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right">{transaction.quantity}</td>
                    <td className="px-4 py-2 text-right">${transaction.price?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400">No transaction history available.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileDashboard; 