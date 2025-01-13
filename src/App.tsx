import React, { useState, useEffect } from "react";
import FetchData from "./components/FetchData";
import { ApiProps } from "./components/Interfaces";
import { key } from "./components/api-key";

function App() {
  const [data, setData] = useState<ApiProps[]>([]); // Full data
  const [filteredData, setFilteredData] = useState<ApiProps[]>([]); // Filtered & sorted data
  const [searchTerm, setSearchTerm] = useState(""); // Search by date
  const [sortField, setSortField] = useState<"date" | "revenue" | "netIncome">(
    "date"
  ); // Field to sort by
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Sort order
  const [revenueRange, setRevenueRange] = useState<[number, number]>([
    0,
    Infinity,
  ]); // Revenue range
  const [netIncomeRange, setNetIncomeRange] = useState<[number, number]>([
    0,
    Infinity,
  ]); // Net income range

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(key);
        const result = await response.json();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.log("Failed to fetch data: ", error);
      }
    };

    fetchData();
  }, []);

  // Filter and sort when data or filters change
  useEffect(() => {
    let filtered = [...data];

    // Filter by date
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.date.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by revenue range
    filtered = filtered.filter(
      (item) =>
        item.revenue >= revenueRange[0] && item.revenue <= revenueRange[1]
    );

    // Filter by net income range
    filtered = filtered.filter(
      (item) =>
        item.netIncome >= netIncomeRange[0] &&
        item.netIncome <= netIncomeRange[1]
    );

    // Sort data
    filtered.sort((a, b) => {
      if (sortField === "date") {
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return sortOrder === "asc"
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    });

    setFilteredData(filtered);
  }, [data, searchTerm, sortField, sortOrder, revenueRange, netIncomeRange]);

  return (
    <div className="p-4">
      <h1 className="mb-8 flex flex-col sm:flex-row items-center justify-between">
        Apple Financial Data
      </h1>

      {/* Filter by Date */}
      <input
        type="text"
        placeholder="Search by Date"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 w-full my-4"
      />

      {/* Filter by Revenue */}
      <div className="mb-4">
        <label>Filter by Revenue Range:</label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min Revenue"
            onChange={(e) =>
              setRevenueRange([Number(e.target.value), revenueRange[1]])
            }
            className="border p-2 flex-1"
          />
          <input
            type="number"
            placeholder="Max Revenue"
            onChange={(e) =>
              setRevenueRange([revenueRange[0], Number(e.target.value)])
            }
            className="border p-2 flex-1"
          />
        </div>
      </div>

      {/* Filter by Net Income */}
      <div className="mb-4">
        <label>Filter by Net Income Range:</label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min Net Income"
            onChange={(e) =>
              setNetIncomeRange([Number(e.target.value), netIncomeRange[1]])
            }
            className="border p-2 flex-1"
          />
          <input
            type="number"
            placeholder="Max Net Income"
            onChange={(e) =>
              setNetIncomeRange([netIncomeRange[0], Number(e.target.value)])
            }
            className="border p-2 flex-1"
          />
        </div>
      </div>

      {/* Sort Buttons */}
      <div className="mb-4 flex-row flex-wrap gap-2">
        <button
          onClick={() => setSortField("date")}
          className={`px-4 py-2 ${
            sortField === "date" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Sort by Date
        </button>
        <button
          onClick={() => setSortField("revenue")}
          className={`px-4 py-2 ${
            sortField === "revenue" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Sort by Revenue
        </button>
        <button
          onClick={() => setSortField("netIncome")}
          className={`px-4 py-2 ${
            sortField === "netIncome" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Sort by Net Income
        </button>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-4 py-2 bg-gray-200"
        >
          Toggle Order ({sortOrder === "asc" ? "Asc" : "Desc"})
        </button>
      </div>

      {/* Render Data */}
      <FetchData data={filteredData} />
    </div>
  );
}

export default App;
