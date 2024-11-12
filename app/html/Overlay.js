"use client";
import React from "react";
import RecentSongsInfo from "./RecentSongsInfo";
import CurrentSongInfo from "./CurrentSongInfo";
import Links from "./Links";
import SearchSong from "../_components/SearchSong";

const Overlay = () => {
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
