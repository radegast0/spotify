import React from "react";
import RecentSongsInfo from "./RecentSongsInfo";
import CurrentSongInfo from "./CurrentSongInfo";
import Links from "./Links";

const Overlay = () => {
  return (
    <div>
      <RecentSongsInfo />
      <CurrentSongInfo />
      <Links />
    </div>
  );
};

export default Overlay;
