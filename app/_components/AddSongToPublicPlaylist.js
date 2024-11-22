import React, { useState, useEffect } from "react";
import axios from "axios";

const AddSongToPublicPlaylist = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const playlistId = "30154Fw0zWJObzwdDReyYs";

  useEffect(() => {
    if (query.length === 0) {
      setSearchResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post("/api/spotify", { query });
        setSearchResults(response.data);
      } catch (err) {
        setError("Failed to search for songs.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleAddToPlaylist = async (songUri) => {
    try {
      const response = await axios.post("/api/spotify", {
        songUri,
        playlistId,
      });
      alert(response.data.message || "Song added to playlist!");
    } catch (err) {
      alert("Failed to add song to playlist.");
      console.error(err);
    }
  };

  if (!isOpen) return null; // Prevent rendering when not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative mx-auto flex w-full max-w-md flex-col gap-4 rounded-sm bg-white/10 p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Add to Playlist</h2>
          <button
            className="text-2xl font-bold"
            onClick={onClose}
          >
            X
          </button>
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for songs..."
          className="w-full rounded-sm bg-white/20 p-2 text-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Loading Indicator */}
        {loading && <p className="text-white">Loading...</p>}

        {/* Song Results */}
        <div className="space-y-4">
          {searchResults.map((song) => (
            <div key={song.id} className="flex items-center gap-3 bg-white/10 p-3 rounded-md hover:bg-white/20">
              <img
                src={song.album.images[2]?.url}
                alt={song.name}
                className="h-16 w-16 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-white">{song.name}</p>
                <p className="text-sm text-gray-300">
                  {song.artists.map((artist) => artist.name).join(", ")}
                </p>
              </div>
              <button
                onClick={() => handleAddToPlaylist(song.uri)}
                className="rounded-sm bg-spotify-green px-3 py-1 text-sm text-white hover:bg-green-600 focus:outline-none"
              >
                Add to Playlist
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddSongToPublicPlaylist;
