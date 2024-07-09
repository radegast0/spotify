"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const RecentlyPlayed = () => {
  const [recentSongs, setRecentSongs] = useState([]);
  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get("/api/spotify");

        const { recentlyPlayed } = response.data;

        setRecentSongs(recentlyPlayed);
      } catch (error) {
        console.error("Error fetching recently played song:", error);
      }
    };

    fetchSong();
    const intervalId = setInterval(fetchSong, 60000);

    return () => clearInterval(intervalId);
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
  // console.log(recentSongs[0]?.track.album);
  return (
    <>
      {recentSongs.map((song, index) => (
        <div key={index} className="mb-5">
          <Link target="_blank" href={song.track.external_urls.spotify}>
            <Image
              priority
              src={song.track.album.images[2].url}
              alt={song.track.album.name}
              width={64}
              height={64}
              className="h-auto w-auto object-cover"
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
