import React, { useState, useEffect } from 'react';
import axios from 'axios';
import'./App.css'
function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
    const params = {
      vs_currency: 'usd', // Döviz cinsi ( usd, eur, try)
      order: 'market_cap_desc', 
      per_page: 10, 
      page: 1, 
      sparkline: false, 
      price_change_percentage: '24h', 
    };

    axios.get(apiUrl, { params })
      .then(response => {
        setCryptoData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className='container'>
      <h1 className='crypto-info' >Kripto Para Projem</h1>
      <ul className='crypto-name' >
        {cryptoData.map((crypto, index) => (
          <li key={index}>
            {crypto.name} ({crypto.symbol}): ${crypto.current_price}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
