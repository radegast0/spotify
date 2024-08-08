"use client";
import React, { useEffect } from "react";
import useStore from "../store";

const RecentSongsInfo = () => {
  const songs = useStore((state) => state.songs);
  const monitorIndex = useStore((state) => state.monitorIndex);
//   console.log(songs);
  

//   useEffect(() => {
//     if (monitorIndex !== null && songs[monitorIndex]) {
//       const selectedSong = songs[monitorIndex];
//       console.log("Selected Song Information:");
//       console.log("Title:", selectedSong.name);
//       console.log("Artist:", selectedSong.artists.map((artist) => artist.name).join(", "));
//       console.log("Album:", selectedSong.album.name);
//       console.log("Album Cover:", selectedSong.album.images[1].url);
//     } else {
//       console.log("No song selected");
//     }
//   }, [monitorIndex, songs]);

  return null; // No UI rendering
};

export default RecentSongsInfo;
