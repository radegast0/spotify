import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaRegWindowClose } from "react-icons/fa";
import PropTypes from "prop-types";
import gsap from "gsap";
import useStore from "../store";

const SearchSong = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const currentSongData = useStore((state) => state.currentSongData);

  // Debounced search effect
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

  // Effect to clear status after 3 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/spotify", { query });
      setResults(response.data);
      setStatus(null);
      setShowResults(true);
    } catch (error) {
      setStatus("Failed to search for songs.");
      console.error("Error searching for songs:", error);
    } finally {
      setLoading(false);
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

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      gsap.to(ref.current, {
        opacity: 1,
        duration: 0.45,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(ref.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power3.inOut",
        onComplete: () => setIsVisible(false), // Delay unmounting until the animation completes
      });
    }
  }, [isOpen]);

  if (!isVisible) return <div ref={ref}></div>;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className="relative mx-auto flex w-full max-w-md flex-col gap-4 rounded-sm bg-white/10 p-6 shadow-lg transition-all">
        <div className="flex items-center justify-between">
          {currentSongData ? (
            <h2 className="text-2xl font-bold text-white">Search</h2>
          ) : (
            <h1>Feature unavailable while I&#39;m offline</h1>
          )}
          <button
            className="text-2xl font-bold"
            onClick={() => {
              onClose();
            }}
          >
            <FaRegWindowClose className="transition-colors duration-100 hover:text-spotify-green" />
          </button>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Title, album, even lyrics..."
          className="w-full rounded-sm bg-white/10 p-2 text-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />

        <div className="py-0.5">
          {status && (
            <p
              className={`fixed -mt-2.5 text-sm transition-opacity duration-500 ${
                status.includes("Failed")
                  ? "text-red-500"
                  : "text-spotify-green"
              }`}
            >
              {status}
            </p>
          )}
        </div>

        <div
          className={`max-h-96 overflow-hidden transition-all duration-500 ${showResults ? "max-h-96" : "max-h-0"}`}
        >
          <div className="space-y-3">
            {loading
              ? [...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-sm bg-white/5 p-3 text-white"
                  >
                    <div className="h-24 w-24 animate-pulse rounded bg-gray-400" />
                    <div className="flex-1">
                      <div className="-mt-7 mb-2 h-5 w-4/5 animate-pulse rounded bg-gray-400" />
                      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-400" />
                    </div>
                    <div className="mt-12 h-7 w-28 animate-pulse rounded bg-gray-400" />
                  </div>
                ))
              : results.map((song) => (
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
                        className={`mb-[2px] ml-auto mr-[2px] mt-2 flex rounded-sm bg-spotify-green px-3 py-1 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                          !currentSongData
                            ? "cursor-not-allowed bg-gray-500 hover:bg-gray-500"
                            : ""
                        }`}
                        disabled={!currentSongData}
                      >
                        Add to Queue
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

SearchSong.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SearchSong;
