"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [recentSongs, setRecentSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [link, setLink] = useState(null);
  const [currentLink, setCurrentLink] = useState(null);

  // const [link, setLink] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get("/api/spotify");

        const { recentlyPlayed, currentlyPlaying } = response.data;

        if (currentlyPlaying) {
          setCurrentSong(currentlyPlaying);
          setCurrentLink(currentlyPlaying.external_urls.spotify);
        } else {
          setCurrentSong(null);
        }
        setRecentSongs(recentlyPlayed);
        setLink(recentlyPlayed[0].track.external_urls.spotify);

        console.log("Currently Playing:", currentlyPlaying);
      } catch (error) {
        console.error("Error fetching recently played song:", error);
      }
    };

    fetchSong();
  }, []);

  function timeSince(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;

    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }
  return (
    <div>
      <h1>Recently Played Songs</h1>
      {recentSongs.map((song, index) => (
        <div key={index} className="mb-5">
          <Link target="_blank" href={song.track.external_urls.spotify}>
            <img
              src={song.track.album.images[0].url}
              alt={song.track.album.name}
              className="h-24 w-24 object-cover"
            />
          </Link>
          <div className="flex flex-col">
            <strong>{song.track.name}</strong>
            <span>
              {song.track.artists.map((artist) => artist.name).join(", ")}
            </span>
          </div>
          <div>{timeSince(song.played_at)}</div>
        </div>
      ))}
      <h1>Currently Playing</h1>
      {currentSong && (
        <div className="mb-5">
          <Link target="_blank" href={currentLink}>
            <img
              src={currentSong.album.images[0].url}
              alt={currentSong.album.name}
              className="h-24 w-24 object-cover"
            />
          </Link>
          <div>
            <strong>{currentSong.name}</strong> by{" "}
            {currentSong.artists.map((artist) => artist.name).join(", ")}
          </div>
          <div>Album: {currentSong.album.name}</div>
        </div>
      )}
    </div>
  );
}
