import React from "react";

const Dropdown = ({
  currencies,
  currency,
  setCurrency,
  favoirtes,
  handleFavoirtes,
  title = "",
}) => {
  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <div className="mt-1 relative">
        <select
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          name={title}
          id={title}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {/* render favoirtes */}
          <hr />
          {Object.keys(currencies).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
