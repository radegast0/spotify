"use client";
import React from "react";
import useStore from "../store";
import Link from "next/link";
import { FaExternalLinkAlt, FaRegWindowClose } from "react-icons/fa";

const ProgressBar = ({ progressMs, durationMs }) => {
  const percentage = progressMs ? (progressMs / durationMs) * 100 : 0;

  return (
    <div className="h-[6px] w-full rounded-full bg-white">
      <div
        className="h-full bg-red-800 transition-all duration-2000 ease-linear"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const CurrentSongInfo = () => {
  const currentSongData = useStore((state) => state.currentSongData);
  const isVinylSelected = useStore((state) => state.isVinylSelected);
  const setIsVinylSelected = useStore((state) => state.setIsVinylSelected);

  const handleClose = () => {
    setIsVinylSelected(false);
  };

  return (
    isVinylSelected && (
      <div className="fixed bottom-10 left-1/2 z-10 w-full max-w-md -translate-x-1/2 bg-white/20 p-6 shadow-lg">
        {currentSongData ? (
          <>
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

            <div className="mb-2 flex items-center">
              <div className="mb-2 flex-1 truncate text-lg">
                <span className="font-semibold">Album:</span>{" "}
                {currentSongData.currentlyPlaying.album.name}
              </div>
              <div className="ml-2 text-xl">
                <Link
                  target="_blank"
                  href={currentSongData.currentlyPlaying.external_urls.spotify}
                >
                  <FaExternalLinkAlt className="hover:text-gray-300" />
                </Link>
              </div>
            </div>
            <ProgressBar
              progressMs={currentSongData.progressData.progress_ms}
              durationMs={currentSongData.currentlyPlaying.duration_ms}
            />
          </>
        ) : (
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold">
              No song is currently playing
            </div>
            <button className="text-2xl font-bold" onClick={handleClose}>
              <FaRegWindowClose className="hover:text-gray-300" />
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default CurrentSongInfo;
