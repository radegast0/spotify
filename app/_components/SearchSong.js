import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaRegWindowClose } from "react-icons/fa";

const SearchSongModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state
  const [showResults, setShowResults] = useState(false); // Control visibility of results

  useEffect(() => {
    if (!query) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSearch = async (query) => {
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post("/api/spotify", { query });
      setResults(response.data);
      setStatus(null);
      setShowResults(true); // Show results when data is fetched
    } catch (error) {
      setStatus("Failed to search for songs.");
      console.error("Error searching for songs:", error);
    } finally {
      setLoading(false); // Set loading state to false after fetching
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative mx-auto w-full max-w-md rounded-sm bg-white/10 p-6 shadow-lg transition-all">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Search</h2>
          <button className="text-2xl font-bold text-white" onClick={onClose}>
            <FaRegWindowClose className="hover:text-gray-300" />
          </button>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Title, album, even lyrics..."
          className="mb-4 w-full rounded-sm bg-white/10 p-2 text-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />

        <div className="mb-4">
          {status && (
            <p
              className={`text-sm transition-opacity duration-500 ${
                status === "Failed to search for songs." ||
                status === "Failed to add song to queue."
                  ? "text-red-500"
                  : "text-spotify-green"
              }`}
            >
              {status}
            </p>
          )}
        </div>

        {/* Results container */}
        <div
          className={`max-h-96 overflow-hidden transition-all duration-500 ease-in-out ${showResults ? "max-h-96" : "max-h-0"}`}
        >
          <div className="space-y-3">
            {/* Show exactly 3 skeletons */}
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-sm bg-white/5 p-3 text-white"
                  >
                    {/* Skeleton for Image */}
                    <div className="h-24 w-24 animate-pulse rounded bg-gray-400" />
                    <div className="flex-1">
                      {/* Skeleton for Song Name */}
                      <div className="-mt-7 mb-2 h-5 w-4/5 animate-pulse rounded bg-gray-400" />
                      {/* Skeleton for Artist Name */}
                      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-400" />
                    </div>
                    {/* Skeleton for Add to Queue Button */}
                    <div className="mt-12 h-7 w-28 animate-pulse rounded bg-gray-400" />
                  </div>
                ))}
              </div>
            ) : (
              results.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center gap-3 rounded-sm bg-white/5 p-3 text-white transition hover:bg-white/20"
                >
                  <img
                    src={song.album.images[1]?.url}
                    alt={song.name}
                    className="h-24 w-24 rounded object-cover"
                  />
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-lg font-semibold">
                      {song.name}
                    </p>
                    <p className="text-md truncate text-gray-300">
                      {song.artists.map((artist) => artist.name).join(", ")}
                    </p>
                    <button
                      onClick={() => handleAddToQueue(song.uri)}
                      className="mb-[2px] ml-auto mr-[2px] mt-2 flex rounded-sm bg-spotify-green px-3 py-1 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      Add to Queue
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSongModal;
