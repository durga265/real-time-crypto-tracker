import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoData } from '../features/crypto/cryptoSlice';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import './CryptoTable.css';

const CryptoTable = () => {
  const dispatch = useDispatch();
  const { assets, status } = useSelector((state) => state.crypto);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchCryptoData());
    const interval = setInterval(() => dispatch(fetchCryptoData()), 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-wrapper">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search crypto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name </th>
              <th>Price</th>
              <th>1h %</th>
              <th>24h %</th>
              <th>7d %</th>
              <th>Market Cap</th>
              <th>Volume(24h)</th>
              <th>Circulating</th>
              <th>Last 7 Days</th> 
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset, index) => (
              <tr key={asset.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="crypto-logo-name">
                    <img src={asset.image} alt={asset.name} width="24" />
                    <div className="crypto-name-symbol">
                      <td>
                      <span>{asset.name}-</span>
                      <span>{asset.symbol.toUpperCase()}</span>
                      </td>
                    </div>
                  </div>
                </td>
                <td>${asset.current_price.toLocaleString()}</td>
                <td className={asset.price_change_percentage_1h_in_currency > 0 ? 'green' : 'red'}>
                  {asset.price_change_percentage_1h_in_currency?.toFixed(2)}%
                </td>
                <td className={asset.price_change_percentage_24h > 0 ? 'green' : 'red'}>
                  {asset.price_change_percentage_24h?.toFixed(2)}%
                </td>
                <td className={asset.price_change_percentage_7d_in_currency > 0 ? 'green' : 'red'}>
                  {asset.price_change_percentage_7d_in_currency?.toFixed(2)}%
                </td>
                <td>${asset.market_cap.toLocaleString()}</td>
                <td>${asset.total_volume.toLocaleString()}</td>
                <td>{asset.circulating_supply?.toLocaleString()}</td>
                <td>
                  <Sparklines data={asset.sparkline_in_7d.price}>
                    <SparklinesLine color="blue" />
                  </Sparklines>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;
