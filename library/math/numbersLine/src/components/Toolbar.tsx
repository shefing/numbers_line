import LineDefinition from "./toolbar/LineDefinition";
import IconsToolbar from "./toolbar/IconsToolbar";
import { ToolbarHeight, actionIconsDetials } from "../consts/elementConsts";
import { IActionIcon } from "../type/toolbar";
import { useNumbersLineContext } from "@/context/numbersLineContext";

const Toolbar = () => {
  const { windowSize } = useNumbersLineContext();

  return (
    <div className={`flex justify-between w-full bg-[#ECF9FF] z-[999]`} style={{ height: (ToolbarHeight / windowSize.height) < 0.2 ? ToolbarHeight + "px" : "20%" }}>
      <div />
      <div className="flex w-[456px] ml-[1rem]">
        {actionIconsDetials.map((item: IActionIcon, i: number) => (
          <IconsToolbar key={i} typeAction={item.type} iconUrl={item.url} isDragged={item.isDragged} isMenu={item.isMenu} />
        ))}
      </div>
      <div className='flex-none p-3' style={{ padding: (ToolbarHeight / windowSize.height) < 0.2 ? "12px" : "0.5%" }}>
        <LineDefinition />
      </div>
    </div>
  );
};
export default Toolbar;
