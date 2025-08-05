import FolderCard from "./FolderCard";

export default function Folders({
  folders,
  parentId,
}) {
  return (
    <div id="folder-collection" className="grid grid-cols-4 gap-2 w-full">
      {Object.entries(folders).map(([id, folder]) => {
        if (folder.parent !== parentId) {
          return null;
        }

        return (
          <FolderCard
            key={id}
            id={id}
            folder={folder}
          />
        );
      })}
    </div>
  );
}
