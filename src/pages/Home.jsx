import React, { useState } from "react";

import Breadcrumbs from "../components/Breadcrumbs";
import Folders from "../components/Folders";

export default function Home() {
  const [parentId, setParentId] = useState(0);
  const [folders, setFolders] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("folders")) || {
        0: {
          id: 0,
          name: "Root",
          parent: null,
          children: [],
        },
      }
    );
  });

  const defaultFolderName = "Meow Folder";

  function handleCreateFolder() {
    const folderName = prompt("Enter folder name:", defaultFolderName);
    if (folderName) {
      console.log(`Creating folder: ${folderName}`);

      let folderId = "id" + Math.floor(Math.random() * 1000);
      let updatedFolders = { ...folders };

      if (updatedFolders[parentId]) {
        updatedFolders[parentId].children.push(folderId);
      } else {
        console.warn(`Parent folder with id "${parentId}" not found.`);
      }

      updatedFolders[folderId] = {
        id: folderId,
        name: folderName,
        parent: parentId,
        children: [],
      };
      setFolders(updatedFolders);
      console.log(folders);
    } else {
      console.log("No name provided.");
      return;
    }
  }

  return (
    <div className="h-full w-full max-w-5xl flex flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumbs
          currentFolder={parentId}
          setCurrentFolder={setParentId}
          folders={folders}
        />
        <div className="flex h-full">
          <button className="bg-neutral-900 px-6 py-3 w-full h-full hover:bg-neutral-700 font-bold border-l border-b border-neutral-700 cursor-pointer">
            ⤴︎
          </button>
          <button onClick={handleCreateFolder} className="bg-neutral-900 px-6 py-3 w-full h-full rounded-tr-2xl hover:bg-neutral-700 font-bold border-l border-b border-neutral-700 cursor-pointer">
            +
          </button>
        </div>
      </div>
      <div className="bg-neutral-900 rounded-b-2xl p-6 w-full h-full">
        <Folders
          folders={folders}
          setFolders={setFolders}
          parentId={parentId}
          setParentId={setParentId}
        />
      </div>
    </div>
  );
}
