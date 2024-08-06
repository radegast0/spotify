const { create } = require("zustand");

const useStore = create((set) => ({
  images: [],
  currentImage: null, // Default image
  setImages: (images) => set({ images }),
  setCurrentImage: (imageUrl) => set({ currentImage: imageUrl }),
}));

export default useStore;
