"use client";
import { useEffect } from "react";
import useApiFetch from "../_hooks/useApiFetch";
import useStore from "../store";

const useCurrentSong = () => {
  const { data: currentSong } = useApiFetch("/api/spotify", 2000);
  const setCurrentSongData = useStore((state) => state.setCurrentSongData);
  const setCurrentImageHigh = useStore((state) => state.setCurrentImageHigh);
  const setCurrentImageLow = useStore((state) => state.setCurrentImageLow);

  useEffect(() => {
    if (currentSong && currentSong.currentlyPlaying) {
      setCurrentImageHigh(currentSong.currentlyPlaying.album.images[0].url);
      setCurrentImageLow(currentSong.currentlyPlaying.album.images[1].url);
      setCurrentSongData(currentSong);
      // console.log("currentSongData:", currentSongData);
      // console.log("currentSongData:", currentSongData.progressData.progress_ms);
    }
  }, [
    currentSong,
    setCurrentImageHigh,
    setCurrentImageLow,
    setCurrentSongData,
  ]);
};

export default useCurrentSong;
