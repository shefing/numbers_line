import LineDefinition from "./toolbar/LineDefinition";
import fullscreen from "/assets/icons/toolbar/fullscreen.svg";
import IconsToolbar from "./toolbar/ActionIcons";
import { ToolbarHieght, actionIconsDetials } from "../consts/elementConsts";
import { IActionIcon } from "../type/elements";

const Toolbar = () => {
  return (
    <div className={`flex justify-between w-full top-0 left-0 bg-[#ECF9FF]`} style={{ height: ToolbarHieght + "px" }}>
      <div className="flex-none">
        <img className="p-5" src={fullscreen} alt="Fullscreen Toolbar" />
      </div>
      <div className="flex ml-[4.25rem]">
        {actionIconsDetials.map((item: IActionIcon, i: number) => (
          <IconsToolbar key={i} typeAction={item.type} iconUrl={item.url} />
        ))}
      </div>
      <div className="flex-none p-3">
        <LineDefinition />
      </div>
    </div>
  );
};
export default Toolbar;
