"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import ProgressBar from "./ProgressBar";

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
    const intervalId = setInterval(fetchSong, 2000);

    return () => clearInterval(intervalId);
  }, []);
  // console.log(currentSong);

  return (
    <>
      {currentSong && (
        <div className="group relative w-[300px]">
          <Link target={currentSong.album.images[1].url} href={currentLink}>
            <Image
              priority
              src={currentSong.album.images[1].url}
              alt={currentSong.album.name}
              width={300}
              height={300}
              className="pointer-events-none aspect-square object-cover"
            />
            <ProgressBar className={'absolute bottom-[95px] h-1 w-full '} />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white mix-blend-luminosity shadow-black/50 backdrop-blur-[2px] backdrop-brightness-95 transition-all duration-300 [text-shadow:1px_1px_2px_var(--tw-shadow-color)] group-hover:backdrop-blur-md">
              <div className="overflow-hidden overflow-ellipsis text-nowrap text-xl font-bold">
                {currentSong.name}
              </div>
              <div className="overflow-hidden overflow-ellipsis text-nowrap text-sm font-medium">
                {currentSong.artists.map((artist) => artist.name).join(", ")}
              </div>
              <div className="overflow-hidden overflow-ellipsis text-nowrap text-sm font-extralight">
                {currentSong.album.name}
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default CurrentlyPlaying;
