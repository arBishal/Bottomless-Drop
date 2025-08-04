import React, { useState, useRef, useEffect } from "react";

import useFolderStore from "../store/useFolderStore";

import Popover from "./Popover";

export default function FolderCard({
  id,
  folder,
}) {
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef(null);

  const { setParentId } = useFolderStore();

  const handleFolderClick = () => {
    setParentId(id);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowPopover(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      key={id}
      onClick={handleFolderClick}
      className="min-h-14 flex items-center justify-between gap-4 hover:bg-neutral-700 rounded-lg cursor-pointer pl-4 pr-3"
    >
      {/* left elements */}
      <div className="flex items-center gap-4">
        <div id="folder-icon" className="w-fit h-fit">
          <div className="relative h-6 w-8">
            <span className="absolute bottom-0 left-0 h-6 w-6 bg-neutral-500 rounded-xs"></span>
            <span className="absolute bottom-0 left-0 h-5 w-8 bg-neutral-400 rounded-xs"></span>
          </div>
        </div>

        <span id="folder-label" className="text-center text-sm text-ellipsis">
          {folder.name}
        </span>
      </div>

      {/* right elements */}
      <div className="h-full relative">
        <span
          id="folder-option"
          onClick={(e) => {
            e.stopPropagation();
            setShowPopover(!showPopover);
          }}
          className="flex items-center text-lg text-center h-full px-2 hover:bg-neutral-600"
        >
          ⁝
        </span>

        {/* trigger popover */}
        {showPopover && (
          <div
            ref={popoverRef}
            onClick={(e) => e.stopPropagation()}
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Popover
              id={id}
              closePopover={() => setShowPopover(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
