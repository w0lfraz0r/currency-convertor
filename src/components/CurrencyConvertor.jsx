import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConvertor = () => {
  const [currencies, setCurrencies] = useState({});
  const [amount, setAmount] = useState(1);

  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [favoirtes, setFavoirtes] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.dev/v1/currencies");
      const data = await res.json();
      setCurrencies(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const handleFavoirtes = (currency) => {
    if (favoirtes.includes(currency)) {
      setFavoirtes(favoirtes.filter((c) => c !== currency));
    } else {
      setFavoirtes([...favoirtes, currency]);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convertCurrency = async (from, to, fromAmount) => {
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`
    );
    const data = await res.json();
    setConvertedAmount((fromAmount * data.rates[to]).toFixed(5));
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-5 font-semibold text-gray-700">
        Currency Convertor
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <Dropdown
          title="From"
          currencies={currencies}
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          handleFavoirtes={handleFavoirtes}
        />
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
            onClick={swapCurrencies}
          >
            <HiArrowsRightLeft />
          </button>
        </div>
        <Dropdown
          title="To"
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
          handleFavoirtes={handleFavoirtes}
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount
        </label>
        <input
          type="number"
          id="amount"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-indigo-500"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="flex justify-end mt-6">
        <button
          className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => convertCurrency(fromCurrency, toCurrency, amount)}
        >
          Convert
        </button>
      </div>

      <div className="mt-4 text-lg font-medium text-right text-green-600">
        Converted Amount:{" "}
        {convertedAmount ? convertedAmount + " " + toCurrency : ""}
      </div>
    </div>
  );
};

export default CurrencyConvertor;
