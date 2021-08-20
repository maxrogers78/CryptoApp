import axios from "axios";
import { CoinData } from "interfaces/Coin";
import { useEffect } from "react";
import { useState } from "react";
import TableCoins from "components/TableCoins";

const App = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const resp = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`
    );
    const data = resp.data;

    setCoins(data);
  };

  return (
    <div className="container py-3">
      <div className="row">
        <h1 className="text-center my-4">CryptoApp</h1>

        <input
          type="text"
          placeholder="Search a Coin"
          className="form-control bg-dark text-light border-0 mt-4 text-center"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <TableCoins coins={coins} search={search} />
      </div>
    </div>
  );
};

export default App;
