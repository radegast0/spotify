"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useApiFetch from "../_hooks/useApiFetch";
import useStore from "../store";
import useRecentlyPlayed from "../_hooks/useRecentlyPlayed";

const RecentlyPlayed = () => {
  const {
    data: recentSongs,
    loading,
    error,
  } = useApiFetch("/api/spotify", 60000);
  const setImages = useStore((state) => state.setImages);

  useRecentlyPlayed();
  // console.log(recentSongs);

  useEffect(() => {
    if (recentSongs) {
      const images = recentSongs.recentlyPlayed.map(
        (song) => song.track.album.images[2].url,
      );
      setImages(images);
    }
  }, [recentSongs, setImages]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

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
      {recentSongs.recentlyPlayed.map((song, index) => (
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
