"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";
const CurrentlyPlaying = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentLink, setCurrentLink] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get("/api/spotify");
        const { currentlyPlaying } = response.data;

        if (currentlyPlaying) {
          setCurrentSong(currentlyPlaying);
          setCurrentLink(currentlyPlaying.external_urls.spotify);
        } else {
          setCurrentSong(null);
        }
      } catch (error) {
        console.error("Error fetching currently playing song:", error);
      }
    };
    fetchSong();
    const intervalId = setInterval(fetchSong, 10000); // 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {currentSong && (
        <div className="mb-5">
          <Link target="_blank" href={currentLink}>
            <Image
              src={currentSong.album.images[0].url}
              alt={currentSong.album.name}
              width={96}
              height={96}
              className="object-cover"
            />
          </Link>
          <div>
            <strong>{currentSong.name}</strong> by{" "}
            {currentSong.artists.map((artist) => artist.name).join(", ")}
          </div>
          <div>Album: {currentSong.album.name}</div>
        </div>
      )}
    </>
  );
};

export default CurrentlyPlaying;
