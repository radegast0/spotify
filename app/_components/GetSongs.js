"use client";
import React, { useEffect } from "react";
import useApiFetch from "../_hooks/useApiFetch";
import useStore from "../store";

const GetSongs = () => {
  const { data: currentSongData } = useApiFetch("/api/spotify", 2000);
  const setCurrentImageHigh = useStore((state) => state.setCurrentImageHigh);
  const setCurrentImageLow = useStore((state) => state.setCurrentImageLow);

  useEffect(() => {
    if (currentSongData && currentSongData.currentlyPlaying) {
      setCurrentImageHigh(currentSongData.currentlyPlaying.album.images[0].url);
      setCurrentImageLow(currentSongData.currentlyPlaying.album.images[1].url);
    }
  }, [currentSongData]);

  return null;
};

export default GetSongs;
