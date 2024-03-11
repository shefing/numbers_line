import "./App.css";
import Ruler from "./components/Ruler";
import GrassImg from "./components/GrassImg";
import Toolbar from "./components/Toolbar";
import ShowElements from "./components/ShowElements";
import { useNumbersLineContext } from "./context/numbersLineContext";
import { useEffect } from "react";
import Restart from "./components/Restart";
import { Brush } from "lucide-react";

const App = () => {
  const { setIdDraggElementClick } = useNumbersLineContext();

  const handleClickOutside = (event: any) => {
    !event.target.id.includes("dragElement") && setIdDraggElementClick("");
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Brush />
      <ShowElements />
      <Restart />
      <div className="flex flex-col h-full justify-between">
        <Toolbar />
        <div>
          <Ruler />
          <GrassImg />
        </div>
      </div>
    </>
  );
};

export default App;
