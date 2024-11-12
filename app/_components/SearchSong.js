import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchSong = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState(null);

  // Debounced search function
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Function to handle search API call
  const handleSearch = async (query) => {
    try {
      const response = await axios.post("/api/spotify", { query });
      setResults(response.data);
      setStatus(null);
    } catch (error) {
      setStatus("Failed to search for songs.");
      console.error("Error searching for songs:", error);
    }
  };

  // Function to handle adding song to the queue
  const handleAddToQueue = async (songUri) => {
    try {
      await axios.post("/api/spotify", { songUri });
      setStatus("Song added to queue!");
    } catch (error) {
      setStatus("Failed to add song to queue.");
      console.error("Error adding song to queue:", error);
    }
  };

  return (
    <div className="absolute left-10 top-10 z-10">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a song..."
        className="p-2 text-black"
      />

      {status && <p>{status}</p>}

      <div>
        {results.map((song) => (
          <div key={song.id} className="flex items-center border-b border-gray-700 p-2">
            <img
              src={song.album.images[1]?.url} // Use a medium-sized image
              alt={song.name}
              className="w-12 h-12 mr-3"
            />
            <div>
              <p>
                {song.name} by{" "}
                {song.artists.map((artist) => artist.name).join(", ")}
              </p>
              <button
                onClick={() => handleAddToQueue(song.uri)}
                className="mt-1 bg-green-500 p-1 text-white"
              >
                Add to Queue
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSong;
