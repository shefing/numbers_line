import { useState } from "react";
import { iconsNaviKeni } from "../../consts/elementConsts";
import { ActionTypes, IIconsNaviKeni, NaviKeniIconsTypes } from "../../type/toolbar";
import { useDraggableElementAction } from "../../hooks/useDraggableElementAction";

interface IProps {
  setOpen: (val: boolean) => void;
}
const NaviKanyMenu = ({ setOpen }: IProps) => {
  const [urlHovered, setUrlHovered] = useState("");
  const { addDraggableElement } = useDraggableElementAction();

  const onClickButtons = (type: NaviKeniIconsTypes) => {
    addDraggableElement(ActionTypes.naviAndKeni, type);
    setOpen(false);
  };

  return (
    <div className={`flex flex-col mt-[-4rem] pt-[4rem] w-[50] h-[162] pb-2 relative z-0 rounded-3xl bg-[#009FDE] shadow-2xl ease-in-out`}>
      {iconsNaviKeni.map((item: IIconsNaviKeni, i: number) => (
        <img
          key={i}
          className="m-1.5 mb-0 cursor-pointer"
          src={urlHovered == item.type ? item.urlHover : item.url}
          alt={item.type}
          onMouseEnter={() => setUrlHovered(item.type)}
          onMouseLeave={() => setUrlHovered("")}
          onClick={() => onClickButtons(item.type)}
        />
      ))}
    </div>
  );
};
export default NaviKanyMenu;
