import Home from "./pages/Home.jsx";

export default function App() {
  return (
    <div className="min-h-dvh w-dvw flex flex-col p-6 gap-4 items-center justify-start text-neutral-300 bg-neutral-800 lowercase">
      <h1 className="max-w-5xl w-full text-4xl font-bold px-6"> bottomless-drop </h1>
      <Home />
    </div>
  );
}
