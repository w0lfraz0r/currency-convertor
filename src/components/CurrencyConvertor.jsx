import { useState, useEffect } from "react";

const CurrencyConvertor = () => {
  /* curl -s https://api.frankfurter.dev/v1/currencies */
  /* 
    function convert(from, to, amount) {
  fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
    .then((resp) => resp.json())
    .then((data) => {
      const convertedAmount = (amount * data.rates[to]).toFixed(2);
      alert(`${amount} ${from} = ${convertedAmount} ${to}`);
    });
  }

convert("EUR", "USD", 10);
    */
  const [currencies, setCurrencies] = useState({});
  const [amount, setAmount] = useState(1);

  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.dev/v1/currencies");
      const data = await res.json();
      setCurrencies(data);
    } catch (error) {
      console.log(error);
    }
  };

  const convertCurrency = () => {};

  useEffect(() => {
    fetchCurrencies();
  }, []);

  console.log(currencies);

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-5 font-semibold text-gray-700">
        Currency Convertor
      </h2>
      <div> DropDown</div>
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
        />
      </div>
      <div className="flex justify-end mt-6">
        <button
          className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={convertCurrency}
        >
          Convert
        </button>
      </div>

      <div className="mt-4 text-lg font-medium text-right text-green-600">
        Converted Amount: 69 USD
      </div>
    </div>
  );
};

export default CurrencyConvertor;
