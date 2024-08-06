"use client";
import React, { useEffect } from "react";
import useApiFetch from "../_hooks/useApiFetch";
import useStore from "../store";

const GetSongs = () => {
  const { data: currentSongData } = useApiFetch("/api/spotify", 2000);
  const setCurrentImage = useStore((state) => state.setCurrentImage);

  useEffect(() => {
    if (currentSongData && currentSongData.currentlyPlaying) {
      setCurrentImage(currentSongData.currentlyPlaying.album.images[0].url);
    }
  }, [currentSongData]);

  return null;
};

export default GetSongs;
