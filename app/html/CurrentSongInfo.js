"use client";
import React, { useEffect, useRef } from "react";
import useStore from "../store";
import Link from "next/link";
import { FaExternalLinkAlt, FaRegWindowClose } from "react-icons/fa";
import PropTypes from "prop-types";

const ProgressBar = ({ progressMs, durationMs }) => {
  const percentage = progressMs ? (progressMs / durationMs) * 100 : 0;

  return (
    <div className="h-[6px] w-full rounded-r-full bg-white">
      <div
        className="h-full bg-[#212121] rounded-r-full transition-all duration-4000 ease-linear"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const CurrentSongInfo = () => {
  const currentSongData = useStore((state) => state.currentSongData);
  const isVinylSelected = useStore((state) => state.isVinylSelected);
  const setIsVinylSelected = useStore((state) => state.setIsVinylSelected);
  const setMontiorIndex = useStore((state) => state.setMonitorIndex);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener("mouseup", handleClick);
    return () => {
      document.removeEventListener("mouseup", handleClick);
    };
  }, [modalRef]);

  const handleClose = () => {
    setIsVinylSelected(false);
    setMontiorIndex(null);
  };

  return (
    isVinylSelected && (
      <div
        ref={modalRef}
        className="fixed bottom-10 left-1/2 z-10 w-full max-w-md -translate-x-1/2 bg-white/20 rounded-sm p-6 shadow-2xl"
      >
        {currentSongData ? (
          <>
            <div className="flex items-center justify-between">
              <h1 className="mb-2">Currently Playing</h1>
              <button className="text-2xl font-bold" onClick={handleClose}>
                <FaRegWindowClose className="transition-colors duration-200 hover:text-spotify-green" />
              </button>
            </div>
            <div className="mb-4">
              <h2 className="truncate text-2xl font-bold">
                {currentSongData.currentlyPlaying.name}
              </h2>
            </div>
            <div className="mb-2 truncate text-lg">
              {currentSongData.currentlyPlaying.artists
                .map((artist) => artist.name)
                .join(", ")}
            </div>

            <div className="mb-2 flex">
              <div className="mb-2 flex-1 truncate text-lg">
                <span className="font-semibold">Album:</span>{" "}
                {currentSongData.currentlyPlaying.album.name}
              </div>
              <div className="ml-2 mt-1 text-xl">
                <Link
                  target="_blank"
                  href={currentSongData.currentlyPlaying.external_urls.spotify}
                >
                  <FaExternalLinkAlt className="hover:text-spotify-green" />
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
              <FaRegWindowClose className="hover:text-spotify-green" />
            </button>
          </div>
        )}
      </div>
    )
  );
};

ProgressBar.propTypes = {
  progressMs: PropTypes.number,
  durationMs: PropTypes.number,
};

export default CurrentSongInfo;
