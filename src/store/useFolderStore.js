import { create } from "zustand";

const getInitialFolders = () => {
  const storedFolders = localStorage.getItem("folders");
  if (storedFolders) {
    return JSON.parse(storedFolders);
  }

  return {
    0: {
      id: 0,
      name: "root",
      parent: null,
      children: [],
      files: [],
    },
  };
};

const generateUniqueId = () => Date.now() + Math.floor(Math.random() * 1000);

const useFolderStore = create((set) => ({
  // initial state
  parentId: 0,
  folders: getInitialFolders(),
  selectedFolderId: null,

  // setters
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
  createFolder: (parentId, folderName) =>
    set((state) => {
      const id = generateUniqueId();
      const newFolder = {
        id: id,
        name: folderName,
        parent: parentId,
        children: [],
        files: [],
      };

      const updatedParent = {
        ...state.folders[parentId],
        children: [...state.folders[parentId].children, id],
      };

      const updatedFolders = {
        ...state.folders,
        [id]: newFolder,
        [parentId]: updatedParent,
      };

      localStorage.setItem("folders", JSON.stringify(updatedFolders));
      return { folders: updatedFolders };
    }),

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

      const parentId = updated[id].parent;
      if (parentId !== null) {
        updated[parentId].children = updated[parentId].children.filter(
          (childId) => childId !== id
        );
      }

      delete updated[id];

      localStorage.setItem("folders", JSON.stringify(updated));
      return { folders: updated };
    }),

  addFileToFolder: (id, file) =>
    set((state) => {
      const targetFolder = state.folders[id];
      if (!targetFolder) {
        return {};
      }

      const updatedFolder = {
        ...targetFolder,
        files: [...(targetFolder.files || []), file],
      };

      const updatedFolders = {
        ...state.folders,
        [id]: updatedFolder,
      };

      localStorage.setItem("folders", JSON.stringify(updatedFolders));
      return { folders: updatedFolders };
    }),
}));

export default useFolderStore;
