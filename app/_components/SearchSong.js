import React, { useState } from "react";
import axios from "axios";
import AddToQueueButton from "../_components/AddToQueueButton";

const SearchSong = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState(null);

  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await axios.post("/api/spotify", { query });
      setResults(response.data);
      setStatus(null);
    } catch (error) {
      setStatus("Failed to search for songs.");
      console.error("Error searching for songs:", error);
    }
  };

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
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a song..."
        className="text-black p-2"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 ml-2">
        Search
      </button>

      {status && <p>{status}</p>}

      <div>
        {results.map((song) => (
          <div key={song.id} className="p-2 border-b border-gray-700">
            <p>{song.name} by {song.artists.map((artist) => artist.name).join(", ")}</p>
            <button
              onClick={() => handleAddToQueue(song.uri)}
              className="bg-green-500 text-white p-1 mt-1"
            >
              Add to Queue
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSong;
