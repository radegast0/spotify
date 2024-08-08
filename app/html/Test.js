"use client";
import React from "react";
import useStore from "../store";

const Test = () => {
  const songs = useStore((state) => state.songs);
  const monitorIndex = useStore((state) => state.monitorIndex);

  const selectedSong =
    monitorIndex !== null && monitorIndex >= 0 && monitorIndex < songs.length
      ? songs[monitorIndex]
      : null;

  // Format the played_at timestamp
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Use toLocaleDateString() for just the date or toLocaleTimeString() for just the time
  };

  return (
    <div className="">
      {selectedSong && (
        <>
          <div className="absolute right-10 top-10 z-10 text-5xl">X</div>
          <div className="absolute bottom-20 left-20 z-10 text-5xl">
            {selectedSong.track.name}

            <div>
              {selectedSong.track.artists
                .map((artist) => artist.name)
                .join(", ")}
            </div>
            <div>{selectedSong.track.album.name}</div>
            <div>Played At: {formatDate(selectedSong.played_at)}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Test;
