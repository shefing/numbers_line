import "./App.css";
import Ruler from "./components/Ruler";
import GrassImg from "./components/GrassImg";
import Toolbar from "./components/Toolbar";
import Convexity from "./components/Convexity";

const App = () => {
  return (
    <div>
      <Convexity />
      <Toolbar />
      <Ruler />
      <GrassImg />
    </div>
  );
};

export default App;
