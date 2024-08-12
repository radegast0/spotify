import React from "react";
import RecentSongsInfo from "./RecentSongsInfo";
import CurrentSongInfo from "./CurrentSongInfo";
import Links from "./Links";
import { Suspense } from "react";

const Overlay = () => {
  return (
    <div className="text-white">
      <RecentSongsInfo />
      <CurrentSongInfo />
      <Links />
    </div>
  );
};

export default Overlay;
