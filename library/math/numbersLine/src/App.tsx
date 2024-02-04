import "./App.css";
import Ruler from "./components/Ruler";
import GrassImg from "./components/GrassImg";
import Toolbar from "./components/Toolbar";
import ShowJumps from "./components/ShowJumps";
import { useNumbersLineContext } from "./context/numbersLineContext";
import { useEffect } from "react";

const App = () => {
  const { setIdDraggElementClick } = useNumbersLineContext();

  const handleClickOutside = (event: any) => {
    if (!event.target.classList.contains("dragElement")) {
      false && setIdDraggElementClick(-1);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col h-full justify-between">
      <Toolbar />
      <ShowJumps />

      <div className="flex flex-col justify-end">
        <Ruler />
        <GrassImg />
      </div>
    </div>
  );
};

export default App;
