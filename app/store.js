import { create } from "zustand";

const useStore = create((set) => ({
  images: [],
  currentImageLow: null,
  currentImageHigh: null,
  songs: [],
  currentSong: null,
  montiorIndex: null,
  setImages: (images) => set({ images }),
  setCurrentImageLow: (imageUrl) => set({ currentImageLow: imageUrl }),
  setCurrentImageHigh: (imageUrl) => set({ currentImageHigh: imageUrl }),
  setSongs: (songs) => set({ songs }),
  setCurrentSong: (song) => set({ currentSong: song }),
  setMonitorIndex: (index) => set({ monitorIndex: index }),
}));

export default useStore;
