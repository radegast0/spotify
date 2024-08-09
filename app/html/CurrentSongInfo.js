"use client";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import useStore from "../store";
import Link from "next/link";
import { FaExternalLinkAlt, FaRegWindowClose } from "react-icons/fa";

const CurrentSongInfo = () => {
  const currentSongData = useStore((state) => state.currentSongData);
  const currentImageHigh = useStore((state) => state.currentImageHigh);
  const isVinylSelected = useStore((state) => state.isVinylSelected);
  const setIsVinylSelected = useStore((state) => state.setIsVinylSelected);

  if (!currentSongData) return null;

  // Format the progress timestamp
  const formatProgress = (progressMs) => {
    const minutes = Math.floor(progressMs / 60000);
    const seconds = Math.floor((progressMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleClose = () => {
    setIsVinylSelected(false);
  };

  return (
    isVinylSelected && (
      <div className="fixed bottom-10 left-1/2 z-10 w-full max-w-md -translate-x-1/2 bg-white/10 p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="truncate text-3xl font-bold">
            {currentSongData.currentlyPlaying.name}
          </h2>
          <button className="text-2xl font-bold" onClick={handleClose}>
            <FaRegWindowClose className="hover:text-gray-300" />
          </button>
        </div>
        <div className="mb-2 truncate text-lg">
          <span className="font-semibold">Artist:</span>{" "}
          {currentSongData.currentlyPlaying.artists
            .map((artist) => artist.name)
            .join(", ")}
        </div>
        <div className="mb-2 truncate text-lg">
          <span className="font-semibold">Album:</span>{" "}
          {currentSongData.currentlyPlaying.album.name}
        </div>
        <div className="flex">
          <div className="flex-1 text-lg">
            <span className="font-semibold">Progress:</span>{" "}
            {formatProgress(currentSongData.progressData.progress_ms)}
          </div>
          <div className="text-xl">
            <Link
              target="_blank"
              href={currentSongData.currentlyPlaying.external_urls.spotify}
            >
              <FaExternalLinkAlt className="hover:text-gray-300" />
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default CurrentSongInfo;