import LineDefinition from "./toolbar/LineDefinition";
import fullscreen from "/assets/icons/toolbar/fullscreen.svg";
import IconsToolbar from "./toolbar/ActionIcons";
import jump from "/assets/icons/toolbar/jump.svg";
// import text from "/assets/icons/toolbar/text.svg";
import writing from "/assets/icons/toolbar/writing.svg";
import eye from "/assets/icons/toolbar/eye.svg";
import icons from "/assets/icons/toolbar/icons.svg";
import back from "/assets/icons/toolbar/back.svg";

const Toolbar = () => {
  return (
    <div className="flex justify-between absolute w-full top-0 left-0 h-[80px] bg-[#ECF9FF]">
      <div className="flex-none">
        <img className="p-5" src={fullscreen} alt="Fullscreen Toolbar" />
      </div>
      <div className="flex ">
        <IconsToolbar kind={back} />
        <IconsToolbar kind={icons} />
        <IconsToolbar kind={eye} />
        <IconsToolbar kind={writing} />
        {/* <IconsToolbar kind={text} /> */}
        <IconsToolbar kind={jump} />
      </div>
      <div className="flex-none">
        <LineDefinition />
      </div>
    </div>
  );
};
export default Toolbar;
