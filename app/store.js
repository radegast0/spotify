import { create } from "zustand";

const useStore = create((set) => ({
  images: [],
  currentImageLow: null,
  currentImageHigh: null,
  songs: [],
  currentSongData: null,
  monitorIndex: null,
  isVinylSelected: false,
  setIsVinylSelected: (isVinylSelected) => set({ isVinylSelected }),
  setImages: (images) => set({ images }),
  setCurrentImageLow: (imageUrl) => set({ currentImageLow: imageUrl }),
  setCurrentImageHigh: (imageUrl) => set({ currentImageHigh: imageUrl }),
  setSongs: (songs) => set({ songs }),
  setCurrentSongData: (song) => set({ currentSongData: song }),
  setMonitorIndex: (index) => set({ monitorIndex: index }),
}));

export default useStore;
