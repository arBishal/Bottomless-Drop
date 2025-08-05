import FolderCard from "./FolderCard";

import useFolderStore from "../store/useFolderStore";

export default function files() {
  const { folders, parentId } = useFolderStore();
  const currentFolder = folders[parentId];

  return (
    <div id="file-collection" className="grid grid-cols-4 gap-2 w-full">
      {currentFolder?.files?.map((file, index) => (
        <div
          key={index}
          className="min-h-14 flex items-center justify-between gap-4 rounded-lg cursor-pointer pl-4 pr-3"
        >
          {file.name}
        </div>
      ))}
    </div>
  );
}
