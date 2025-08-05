import { useRef } from "react";

import useFolderStore from "../store/useFolderStore";

import Breadcrumbs from "../components/Breadcrumbs";
import ActionButtons from "../components/ActionButtons";
import Folders from "../components/Folders";
import Files from "../components/Files";

export default function Home() {
  const { parentId, setParentId, folders, createFolder, addFileToFolder } = useFolderStore();
  const fileInputRef = useRef(null);
  const defaultFolderName = "meow folder";

  const handleFolderCreation = () => {
    const folderName = prompt("enter folder name:", defaultFolderName);
    if (folderName) {
      createFolder(parentId, folderName);
      console.log("folder created:", folderName);
      return;
    } else {
      console.log("no name provided");
      return;
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current.click();
    console.log("upload button clicked");
  }

  const handleFileUpload = (e) => {
    const files = e.target.files;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileObject = {
          name: file.name,
          type: file.type,
          size: file.size,
          content: file.result,
          timestamp: Date.now(),
        };
        addFileToFolder(parentId, fileObject);
        console.log("file uploaded:", fileObject);
      };
      reader.readAsDataURL(file);
      console.log("file read:", file.name);
    });
  };

  return (
    <div className="h-full w-full max-w-5xl flex flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumbs
          currentFolder={parentId}
          setCurrentFolder={setParentId}
          folders={folders}
        />
        <ActionButtons handleFolderCreation={handleFolderCreation} handleUploadClick={handleUploadClick} />
        <input
        type="file"
        ref={fileInputRef}
        multiple
        className="hidden"
        onChange={handleFileUpload}
        />
      </div>
      <div className="bg-neutral-900 rounded-b-2xl p-6 w-full h-full flex flex-col gap-8">
        <Folders
          folders={folders}
          parentId={parentId}
        />
        <Files />
      </div>
    </div>
  );
}
