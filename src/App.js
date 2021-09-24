import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/App.css';
import Coin from './Components/Coin/Coin';
import { BASE_URL } from './baseURL/BaseURL';

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get(BASE_URL).then(res => {
      setCoins(res.data);
    }).catch(error => console.log(error))
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filterCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="crypto-app">
      <div className="crypto-search">
        <h1 className="crypto-text">Busque por uma criptomoeda</h1>
        <form>
          <input type="text" placeholder="Pesquisar" className="crypto-input" onChange={handleChange} />
        </form>
      </div>
      {filterCoins.map(coin => {
        return (
          <Coin
            name={coin.name}
            image={coin.image}
            volume={coin.total_volume}
            symbol={coin.symbol}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
          />
        );
      })}
    </div>
  );
}

export default App;
