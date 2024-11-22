import React, { useState, useEffect } from "react";
import axios from "axios";

const AddSongToPublicPlaylist = () => {
  const [query, setQuery] = useState(""); // Search query
  const [searchResults, setSearchResults] = useState([]); // Search results
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const playlistId = "30154Fw0zWJObzwdDReyYs";

  // Search for songs when the query changes
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

  // Function to handle adding a song to the playlist
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

  return (
    <div>
      <h2>Add to Playlist</h2>

      {/* Search Input */}
      <input
        className="text-black"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for songs..."
      />

      {/* Error Message */}
      {error && <p>{error}</p>}

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}

      {/* Song Results */}
      <div>
        {searchResults.map((song) => (
          <div key={song.id}>
            <img src={song.album.images[2]?.url} alt={song.name} />
            <div>
              <p>{song.name}</p>
              <p>{song.artists.map((artist) => artist.name).join(", ")}</p>
            </div>
            <button
              className="bg-white text-black"
              onClick={() => handleAddToPlaylist(song.uri)}
            >
              Add to Playlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddSongToPublicPlaylist;
