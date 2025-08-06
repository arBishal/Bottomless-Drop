import Home from "./pages/Home.jsx";

export default function App() {
  return (
    <div className="min-h-dvh w-dvw flex flex-col p-6 gap-4 items-center justify-start text-neutral-300 bg-neutral-800 lowercase">
      <Home />
    </div>
  );
}

// home not taking full available height