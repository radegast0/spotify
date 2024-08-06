const { create } = require("zustand");

const useStore = create((set) => ({
  images: [],
  setImages: (images) => set({ images }),
}));

export default useStore;
