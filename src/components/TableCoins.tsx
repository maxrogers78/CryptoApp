import { CoinData } from "interfaces/Coin";
import CoinRow from "./CoinRow";

interface Props {
  coins: CoinData[];
  search: string;
}

const titles = [
  "#",
  "Coin",
  "Price (USD)",
  "Price Change (USD)",
  "24h Volume (USD)",
];

const TableCoins = ({ coins, search }: Props) => {
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <table className="table table-dark mt-4 table-hover">
        <thead>
          <tr>
            {titles.map((title, idx) => (
              <td key={idx}>{title}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map((coin: CoinData, idx: number) => (
            <CoinRow coin={coin} index={idx + 1} key={coin.id} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableCoins;
