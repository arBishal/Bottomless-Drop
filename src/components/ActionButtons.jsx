export default function ActionButtons({ handleFolderCreation, handleUploadClick}) {
    return (
        <div className="flex h-full">
          <button onClick={handleUploadClick} className="bg-neutral-900 px-6 py-3 w-full h-full hover:bg-neutral-700 font-bold border-l border-b border-neutral-700 cursor-pointer">
            ⤴︎
          </button>
          <button onClick={handleFolderCreation} className="bg-neutral-900 px-6 py-3 w-full h-full rounded-tr-2xl hover:bg-neutral-700 font-bold border-l border-b border-neutral-700 cursor-pointer">
            +
          </button>
        </div>
    )
}

// there is hiccup on the upload. sometimes double click on the file does not work