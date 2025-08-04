import { create } from "zustand";

const useFolderStore = create((set) => ({
  // initial state
  parentId: 0,
  folders: JSON.parse(localStorage.getItem("folders")) || {
    0: {
      id: 0,
      name: "Root",
      parent: null,
      children: [],
    },
  },
  selectedFolderId: null,

  //   setters
  setParentId: (id) => set({ parentId: id }),
  setFolders: (updater) =>
    set((state) => {
      const nextFolders =
        typeof updater === "function" ? updater(state.folders) : updater;

      localStorage.setItem("folders", JSON.stringify(nextFolders));
      return { folders: nextFolders };
    }),
  setSelectedFolderId: (id) => set({ selectedFolderId: id }),

  // actions
  renameFolder: (id, newName) =>
    set((state) => {
      const updated = {
        ...state.folders,
        [id]: { ...state.folders[id], name: newName },
      };
      localStorage.setItem("folders", JSON.stringify(updated));
      return { folders: updated };
    }),

  removeFolder: (id) =>
    set((state) => {
      const updated = { ...state.folders };
      delete updated[id];
      localStorage.setItem("folders", JSON.stringify(updated));
      return { folders: updated };
    }),
}));

export default useFolderStore;
