import React, { useState, useEffect } from "react";

export default function Folders({
  folders,
  setFolders,
  parentId,
  setParentId,
}) {
  return (
    <div className="grid grid-cols-8 w-full">
      {Object.entries(folders).map(([id, folder]) => {
        if (folder.parent !== parentId) {
          return null;
        }

        return (
            <div key = {id} className="flex flex-col items-center gap-2 hover:bg-neutral-700 rounded-xl cursor-pointer py-6 px-2">
                <div onClick={() => setParentId(id)}
                    className="cursor-pointer size-12 rounded bg-neutral-300">
                </div>
                <span className="text-center text-sm text-ellipsis">{folder.name}</span>
            </div>
        );
      })}
    </div>
  );
}
