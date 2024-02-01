import LineDefinition from "./toolbar/LineDefinition";
import fullscreen from "/assets/icons/toolbar/fullscreen.svg";
import IconsToolbar from "./toolbar/ActionIcons";
import jump from "/assets/icons/toolbar/jump.svg";
import text from "/assets/icons/toolbar/text.svg";
import writing from "/assets/icons/toolbar/writing.svg";
import eye from "/assets/icons/toolbar/eye.svg";
import icons from "/assets/icons/toolbar/icons.svg";
import back from "/assets/icons/toolbar/back.svg";
import { TypeActionIconsToolbar } from "@/type/elements";

const Toolbar = () => {
  return (
    <div className="flex justify-between w-full top-0 left-0 h-[80px] bg-[#ECF9FF]">
      <div className="flex-none">
        <img className="p-5" src={fullscreen} alt="Fullscreen Toolbar" />
      </div>
      <div className="flex ml-[4.25rem]">
        <IconsToolbar type={TypeActionIconsToolbar.raload} iconUrl={back} />
        <IconsToolbar type={TypeActionIconsToolbar.naviAndKani} iconUrl={icons} />
        <IconsToolbar type={TypeActionIconsToolbar.displayNumbersLine} iconUrl={eye} />
        <IconsToolbar type={TypeActionIconsToolbar.writing} iconUrl={writing} />
        <IconsToolbar type={TypeActionIconsToolbar.text} iconUrl={text} />
        <IconsToolbar type={TypeActionIconsToolbar.jump} iconUrl={jump} />
      </div>
      <div className="flex-none p-3">
        <LineDefinition />
      </div>
    </div>
  );
};
export default Toolbar;
