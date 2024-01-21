import "./App.css";
import Ruler from "./components/Ruler";
import GrassImg from "./components/GrassImg";
import Toolbar from "./components/Toolbar";

const App = () => {
  return (
    <div>
      <Toolbar />
      <Ruler />
      <GrassImg />
    </div>
  );
};

export default App;
