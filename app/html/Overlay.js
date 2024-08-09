import React from "react";
import RecentSongsInfo from "./RecentSongsInfo";
import CurrentSongInfo from "./CurrentSongInfo";

const Overlay = () => {
  return (
    <div>
      <RecentSongsInfo />
      <CurrentSongInfo />
    </div>
  );
};

export default Overlay;
