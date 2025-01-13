import React from "react";
import { FetchDataProps } from "./Interfaces";

const FetchData: React.FC<FetchDataProps> = ({ data }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {data && data.length > 0 && (
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Apple Annual Income Statement (USD)
        </h1>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="hover:bg-gray-200">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Revenue</th>
              <th className="px-4 py-2">Net Income</th>
              <th className="px-4 py-2">Gross Profit</th>
              <th className="px-4 py-2">EPS</th>
              <th className="px-4 py-2">Operating Income</th>
            </tr>
          </thead>
          <tbody>
            {data.map((info, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="px-4 py-2">{info.date}</td>
                <td className="px-4 py-2 text-right">
                  {"$" + info.revenue.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-right">
                  {"$" + info.netIncome.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-right">
                  {"$" + info.grossProfit.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-right">
                  {"$" + info.eps.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-right">
                  {"$" + info.operatingIncome.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FetchData;
