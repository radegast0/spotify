"use client";
import React from "react";
import RecentSongsInfo from "./RecentSongsInfo";
import CurrentSongInfo from "./CurrentSongInfo";
import Links from "./Links";
// import AddToQueueButton from "../_components/AddToQueueButton";
import SearchSong from "../_components/SearchSong";

const Overlay = () => {
  // const songUri = "spotify:track:6wQlQrTY5mVS8EGaFZVwVF"; // Hardcoded song URI
  return (
    <div className="text-white">
      <RecentSongsInfo />
      <CurrentSongInfo />
      <Links />
      <SearchSong />
    </div>
  );
};

export default Overlay;
