import LineDefinition from "./toolbar/LineDefinition";
import jump from "../assets/icons/jump.svg";
import text from "../assets/icons/text.svg";
import writing from "../assets/icons/writing.svg";
import eye from "../assets/icons/eye.svg";
import icons from "../assets/icons/icons.svg";
import back from "../assets/icons/back.svg";
import fullscreen from "../assets/icons/fullscreen.svg";

const Toolbar = () => {
  return (
    <div className="flex justify-between absolute w-full top-0 left-0 h-[80px] bg-[#ECF9FF]">
      <div className="flex-none">
        <img className="p-5" src={fullscreen} alt="Fullscreen Toolbar" />
      </div>
      <div className="flex ">
        <img className="p-3" src={back} alt="Back Toolbar" />
        <img className="p-3" src={icons} alt="Icons Toolbar" />
        <img className="p-3" src={eye} alt="Eye Toolbar" />
        <img className="p-3" src={writing} alt="Writing Toolbar" />
        <img className="p-3" src={text} alt="Text Toolbar" />
        <img className="p-3" src={jump} alt="Jump Toolbar" />
      </div>
      <div className="flex-none">
        <LineDefinition />
      </div>
    </div>
  );
};
export default Toolbar;
