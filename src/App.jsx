import Home from "./pages/Home.jsx";
import IntroPane from "./components/IntroPane.jsx";
import DetailsPane from "./components/DetailsPane.jsx";

export default function App() {
  return (
    <div className="h-dvh w-dvw flex flex-col lg:grid lg:grid-cols-6 gap-4 lg:gap-6 px-6 lg:px-0 lg:py-6 text-neutral-300 bg-neutral-800 lowercase">
      <div className="lg:col-span-1">
        <IntroPane />
      </div>
      <div className="lg:col-span-4">
        <Home />
      </div>
      <div className="lg:col-span-1">
        <DetailsPane />
      </div>
    </div>
  );
}

// home not taking full available height
