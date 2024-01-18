import "./App.css";
import Ruler from "./components/Ruler";
import Toolbar from "./components/Toolbar";
import GrassImg from "./components/GrassImg";

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
