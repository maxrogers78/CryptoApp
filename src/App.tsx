import axios from "axios";
import { CoinData } from "interfaces/Coin";
import { useEffect } from "react";
import { useState } from "react";
import TableCoins from "components/TableCoins";
import { Moon, Sun } from "phosphor-react";

const App = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [darkMode, setDarkMode] = useState(true);

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

  const toggleMode = () => {
    const body = document.body;
    const h1 = document.getElementById("h1");
    const table = document.getElementById("table");
    const search = document.getElementById("search");

    if (body && h1 && table && search) {
      body.classList.toggle("light-mode");
      h1.classList.toggle("light-mode");

      if (table.classList.contains("table-dark")) {
        table.classList.remove("table-dark");
        table.classList.add("table-light");
        setDarkMode(false);
      } else {
        table.classList.remove("table-light");
        table.classList.add("table-dark");
        setDarkMode(true);
      }

      if (
        search.classList.contains("bg-dark") &&
        search.classList.contains("text-light")
      ) {
        search.classList.remove("bg-dark");
        search.classList.remove("text-light");
        search.classList.add("bg-light");
        search.classList.add("text-dark");
      } else {
        search.classList.remove("bg-light");
        search.classList.remove("text-dark");
        search.classList.add("bg-dark");
        search.classList.add("text-light");
      }
    }
  };

  return (
    <div className="contenido container py-3">
      <div className="row">
        <h1 id="h1" className="text-center my-4">
          CryptoApp
        </h1>
        <button onClick={toggleMode} className="toggle">
          {darkMode ? <Sun /> : <Moon className="dark" />}
        </button>

        <input
          type="text"
          id="search"
          autoComplete="off"
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
