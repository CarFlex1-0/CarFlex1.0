// Scrapping data from auto data
// TODO: Create form (Conditional render) and send (Use Yup for schema Validation)
import React, { useState } from "react";

const Scrapper = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleUrlChange = (e) => setUrl(e.target.value);

  const handleScrape = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result.data);
      setError(null);
    } catch (error) {
      console.error("Error scraping data:", error);
      setError(error.message);
    }
  };

  const handleInputChange = (e, category, key) => {
    const { value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    if (!data) {
      console.error("No data available to save");
      return;
    }

    console.log("Saving data:", data); // Debug the data to be saved

    try {
      setIsSaving(true);
      const response = await fetch("http://localhost:5000/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }), // Send data wrapped in an object
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Save result:", result);
      setIsSaving(false);
      setData(null);
      setError(null);
      setUrl("");
    } catch (error) {
      console.error("Error saving data:", error);
      setIsSaving(false);
      setError(error.message);
    }
  };

  const renderObject = (obj, category) => (
    <div className="mb-4">
      {Object.entries(obj).map(([key, value]) => (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {key}
          </label>
          {typeof value === "object" && value !== null ? (
            <div className="ml-4">{renderObject(value, category)}</div>
          ) : (
            <input
              type="text"
              value={value || ""}
              onChange={(e) => handleInputChange(e, category, key)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4 max-w-lg mx-auto min-h-[30vh]">
      <input
        type="text"
        value={url}
        onChange={handleUrlChange}
        placeholder="Enter URL"
        className="p-2 border border-gray-300 rounded mb-4 w-full"
      />
      <button
        onClick={handleScrape}
        className="bg-blue-500 text-white p-2 rounded mr-2"
      >
        Scrape Data
      </button>

      {data && (
        <form className="mt-4">
          {Object.entries(data).map(([category, obj]) => (
            <div key={category} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{category}</h3>
              {renderObject(obj, category)}
            </div>
          ))}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSave();
            }}
            type="button"
            className={`bg-red-500 text-white p-2 rounded mt-4 ${
              isSaving ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </form>
      )}

      {error && (
        <div className="mt-4 p-2 bg-red-100 border border-red-300 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default Scrapper;
