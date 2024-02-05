import "./App.css";
import Ruler from "./components/Ruler";
import GrassImg from "./components/GrassImg";
import Toolbar from "./components/Toolbar";
import ShowElements from "./components/ShowElements";

const App = () => {
  return (
    <div className="flex flex-col h-full justify-between">
      <Toolbar />
      <ShowElements />
      <Ruler />
      <div className="flex flex-col justify-end">
        <GrassImg />
      </div>
    </div>
  );
};

export default App;
