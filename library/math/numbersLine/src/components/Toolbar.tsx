import LineDefinition from "./toolbar/LineDefinition";
import fullscreen from "../assets/icons/toolbar/fullscreen.svg";
import IconsToolbar from "./toolbar/IconsToolbar";
import { ToolbarHeight, actionIconsDetials } from "../consts/elementConsts";
import { IActionIcon } from "../type/toolbar";

const Toolbar = () => {
  return (
    <div className={`flex justify-between w-full bg-[#ECF9FF] z-[999]`} style={{ height: ToolbarHeight + "px" }}>
      <img className="p-5 flex-none" src={fullscreen} alt="Fullscreen Toolbar" />
      <div className="flex w-[456px] ml-[4.25rem]">
        {actionIconsDetials.map((item: IActionIcon, i: number) => (
          <IconsToolbar key={i} typeAction={item.type} iconUrl={item.url} isDragged={item.isDragged} isMenu={item.isMenu} />
        ))}
      </div>
      <div className="flex-none p-3">
        <LineDefinition />
      </div>
    </div>
  );
};
export default Toolbar;
