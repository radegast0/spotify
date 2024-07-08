"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const RecentlyPlayed = () => {
  const [recentSongs, setRecentSongs] = useState([]);
  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get("/api/spotify");

        console.log(response);
        const { recentlyPlayed } = response.data;

        setRecentSongs(recentlyPlayed.items);
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
    <>
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
    </>
  );
};

export default RecentlyPlayed;
