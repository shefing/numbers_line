import "./App.css";
import Ruler from "./components/Ruler";
import GrassImg from "./components/GrassImg";
import Toolbar from "./components/Toolbar";

const App = () => {
  return (
    <div className="flex flex-col h-full justify-between">
      <Toolbar />
      <div className="flex flex-col justify-end">
        <Ruler />
        <GrassImg />
      </div>
    </div>
  );
};

export default App;
