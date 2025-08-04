import { create } from "zustand";

const useFolderStore = create((set) => ({
    parentId: 0,
    
  setParentId: (id) => set({ parentId: id }),

  folders: JSON.parse(localStorage.getItem("folders")) || {
    0: {
      id: 0,
      name: "Root",
      parent: null,
      children: [],
    },
  },

  setFolders: (updater) =>
    set((state) => {
      const nextFolders =
        typeof updater === "function"
          ? updater(state.folders)
          : updater;

      localStorage.setItem("folders", JSON.stringify(nextFolders));
      return { folders: nextFolders };
    }),

  // Rename a folder
  renameFolder: (id, newName) =>
    set((state) => {
      const updated = {
        ...state.folders,
        [id]: { ...state.folders[id], name: newName },
      };
      localStorage.setItem("folders", JSON.stringify(updated));
      return { folders: updated };
    }),

  // Remove a folder
  removeFolder: (id) =>
    set((state) => {
      const updated = { ...state.folders };
      delete updated[id];
      localStorage.setItem("folders", JSON.stringify(updated));
      return { folders: updated };
    }),
}));

export default useFolderStore;
