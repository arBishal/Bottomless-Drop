import ItemCard from "./ItemCard";
import useFolderStore from "../store/useFolderStore";

export default function Folders() {
  const { folders, parentId } = useFolderStore();
  const currentFolder = folders[parentId];
  return (
    <div id="folder-collection" className="w-full flex-grow">
      {currentFolder?.children?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {currentFolder.children.map((id) => (
            <ItemCard key={id} id={id} item={folders[id]} type={"folder"} />
          ))}
        </div>
      ) : (
        <p className="text-center text-neutral-500 mt-4">
          no folders here. try creating one!
        </p>
      )}
    </div>
  );
}
