import React, { useEffect } from "react";
import useApiFetch from "./useApiFetch";
import useStore from "../store";

const useRecentlyPlayed = () => {
  const { data: recentSongs } = useApiFetch("/api/spotify", 60000);
  const setImages = useStore((state) => state.setImages);

  useEffect(() => {
    if (recentSongs) {
      const images = recentSongs.recentlyPlayed.map(
        (song) => song.track.album.images[1].url,
      );
      setImages(images);
    }
  }, [recentSongs, setImages]);
};

export default useRecentlyPlayed;
