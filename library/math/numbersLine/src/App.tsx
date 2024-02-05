import "./App.css";
import Ruler from "./components/Ruler";
import GrassImg from "./components/GrassImg";
import Toolbar from "./components/Toolbar";
import ShowElements from "./components/ShowElements";
import { useNumbersLineContext } from "./context/numbersLineContext";
import { useEffect } from "react";

const App = () => {
  const { setIdDraggElementClick } = useNumbersLineContext();

  const handleClickOutside = (event: any) => {
    if (!event.target.parentNode.classList.contains("dragElement")) {
      setIdDraggElementClick(-1);
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
      <ShowElements />
      <Ruler />
      <div className="flex flex-col justify-end">
        <GrassImg />
      </div>
    </div>
  );
};

export default App;
