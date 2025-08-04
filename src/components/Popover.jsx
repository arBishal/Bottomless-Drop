import useFolderStore from "../store/useFolderStore";

export default function Popover({ id, closePopover}) {
    const { folders, setFolders } = useFolderStore();
    
    const handleRename = () => {
        console.log("renaming");
        const newName = prompt("Enter meow name!");
        if(newName?.trim()) {
            setFolders((prev) => ({
                ...prev,
                [id]: {
                    ...prev[id], name: newName
                },
            })
            );
        }
        closePopover();
    }

    const handleRemove = () => {
        console.log("removing");
        const updatedFolders = {...folders};
        delete updatedFolders[id];
        setFolders(updatedFolders);
        closePopover();
    }
    return (
        <div className="flex flex-col">
            <span 
            onClick={handleRename}
            className="px-4 py-2 rounded-t cursor-pointer bg-neutral-950 hover:bg-neutral-700">
                Rename
            </span>
            <hr className="border-[1px] border-neutral-800"/>
            <span 
            onClick={handleRemove}
            className="px-4 py-2 rounded-b cursor-pointer bg-neutral-950 hover:bg-neutral-700">
                Remove
            </span>
        </div>
    );
}