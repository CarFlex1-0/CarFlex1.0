import React, { useState } from "react";
import axios from "@services/axios";

const Scrapper = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  
  const handleUrlChange = (e) => setUrl(e.target.value);

  const handleScrape = async () => {
    try {
      const response = await axios.post("/scrape", { url });
      const result = response.data;
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

    try {
      setIsSaving(true);
      const response = await axios.post("/save", { data });
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
          <label className="block text-sm font-medium text-gray-200">
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
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
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

      <div className="overflow-y-auto max-h-[80vh] w-[90vw] text-white">
        {data && (
          <form className="mt-4">
            {Object.entries(data).map(([category, obj]) => (
              <div key={category} className="mb-4 text-white">
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
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
      </div>

      {error && (
        <div className="mt-4 p-2 bg-red-100 border border-red-300 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default Scrapper;
