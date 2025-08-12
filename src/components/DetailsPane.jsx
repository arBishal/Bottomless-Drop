export default function DetailsPane() {
  return (
    <div className="bg-neutral-900 h-full w-full hidden lg:flex lg:flex-col lg:gap-4 px-6 py-4 rounded-l-2xl">
      <h2 className="text-base xl:text-lg font-bold">details</h2>
      <p className="text-sm xl:text-base">
        please select a folder or file to preview the details.
      </p>
    </div>
  );
}
