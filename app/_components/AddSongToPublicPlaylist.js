import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { FaExternalLinkAlt, FaRegWindowClose } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
import PropTypes from "prop-types";

const AddSongToPublicPlaylist = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const [playlistData, setPlaylistData] = useState(null);
  const playlistId = "30154Fw0zWJObzwdDReyYs";
  const scrollableContainerRef = useRef(null);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const response = await axios.get(
          `/api/spotify?playlistId=${playlistId}`,
        );
        setPlaylistData(response.data.playlist);
      } catch (err) {
        console.error("Failed to fetch playlist data", err);
      }
    };

    fetchPlaylistData();
  }, [playlistId]);

  useEffect(() => {
    if (query.length === 0) {
      setSearchResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      setError(null);
      try {
        const response = await axios.post("/api/spotify", { query });
        setSearchResults(response.data);
      } catch (err) {
        setError("Failed to search for songs.");
      }
    };

    fetchSearchResults();
  }, [query]);

  useEffect(() => {
    if (isVisible && scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop =
        scrollableContainerRef.current.scrollHeight;
    }
  }, [isVisible, playlistData]);

  const handleAddToPlaylist = async (songUri) => {
    try {
      await axios.post("/api/spotify", {
        songUri,
        playlistId,
      });

      const updatedPlaylistResponse = await axios.get(
        `/api/spotify?playlistId=${playlistId}`,
      );
      setPlaylistData(updatedPlaylistResponse.data.playlist);
    } catch (err) {
      alert("Failed to add song to playlist.");
      console.error(err);
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
        onComplete: () => setIsVisible(false),
      });
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isVisible) return <div ref={ref}></div>;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative mx-auto flex w-full max-w-md flex-col gap-4 rounded-sm bg-white/10 p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-large font-bold text-white md:text-2xl">
            Add Song
          </h2>
          <button className="text-2xl font-bold" onClick={onClose}>
            <FaRegWindowClose className="transition-colors duration-100 hover:text-spotify-green" />
          </button>
        </div>
        {playlistData && (
          <div className="mb-2 md:mb-6">
            <a
              target="_"
              href="https://open.spotify.com/playlist/30154Fw0zWJObzwdDReyYs?si=b43e87b5963f4194"
            >
              <div className="group mb-2 flex items-start gap-4 md:mb-4">
                <img
                  src={playlistData.images[0]?.url}
                  alt={playlistData.name}
                  className="h-20 w-20 rounded-md object-cover sm:h-24 sm:w-24"
                />
                <div className="flex h-16 flex-col sm:h-24">
                  <h3 className="text-base font-bold text-white md:text-xl">
                    {playlistData.name}
                    {/* Public playlist by the people */}
                  </h3>
                  <p className="flex items-center gap-2 text-base font-bold tracking-wide text-white transition-colors duration-300 group-hover:text-spotify-green md:text-xl">
                    <span>visit</span>
                    <span>
                      <FaExternalLinkAlt size={14} />
                    </span>
                  </p>
                  <p className="flex items-center text-xs text-gray-300">
                    {playlistData.tracks.total} songs
                  </p>
                </div>
              </div>
            </a>

            {/* container */}
            <div
              ref={scrollableContainerRef}
              className="scrollbar-style max-h-36 overflow-y-auto md:max-h-48"
            >
              {playlistData.tracks?.items.map((track, index) => (
                <div
                  key={index}
                  className={`flex items-center rounded-sm bg-white/10 ${
                    index === playlistData.tracks.items.length - 1
                      ? "mb-0"
                      : "mb-1 md:mb-2"
                  }`}
                >
                  <span className="ml-1 mr-2 w-5 text-end text-xs font-semibold text-white">
                    {index + 1}.
                  </span>
                  <img
                    src={track.track.album.images[2]?.url}
                    alt={track.track.name}
                    className="mr-2 h-8 w-8 rounded object-cover md:h-12 md:w-12"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-white">
                      {track.track.name}
                    </p>
                    <p className="truncate text-xs text-gray-300">
                      {track.track.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <span className="-mt-2 md:-mt-6">Search</span>
        {/* Search */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Title, album, even lyrics..."
          className="w-full rounded-sm bg-white/20 p-2 text-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Results */}
        <div className="scrollbar-style max-h-32 overflow-y-auto md:max-h-48">
          {searchResults.map((song, index) => (
            <div
              onClick={() => handleAddToPlaylist(song.uri)}
              key={song.id}
              className={`flex items-center rounded-sm bg-white/10 hover:cursor-pointer ${
                index === searchResults.length - 1 ? "mb-0" : "mb-1 md:mb-2"
              } group`}
            >
              <img
                src={song.album.images[2]?.url}
                alt={song.name}
                className="mr-2 h-10 w-10 rounded-sm object-cover md:h-12 md:w-12"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {song.name}
                </p>
                <p className="truncate text-xs text-gray-300">
                  {song.artists.map((artist) => artist.name).join(", ")}
                </p>
              </div>
              <BsPlusCircle className="ml-1 mr-3 text-3xl group-hover:text-spotify-green" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

AddSongToPublicPlaylist.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddSongToPublicPlaylist;
