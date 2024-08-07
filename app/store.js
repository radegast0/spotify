import { create } from "zustand";

const useStore = create((set) => ({
  images: [],
  currentImageLow: null,
  currentImageHigh: null,
  setImages: (images) => set({ images }),
  setCurrentImageLow: (imageUrl) => set({ currentImageLow: imageUrl }),
  setCurrentImageHigh: (imageUrl) => set({ currentImageHigh: imageUrl }),
}));

export default useStore;
