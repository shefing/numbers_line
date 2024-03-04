import { useState } from "react";
import { iconsNaviKani } from "../../consts/elementConsts";
import { ActionTypes, IIconsNaviKani, NaviKaniIconsTypes } from "../../type/elements";
import { getSrc } from "../../lib/utils";
import { useDraggableElementAction } from "../../hooks/useDraggableElementAction";

interface IProps {
  setOpen: (val: boolean) => void;
  duplicateElementPlace: number;
  setDuplicateElementPlace: React.Dispatch<React.SetStateAction<number>>;
}
const NaviKanyMenu = ({ setOpen, duplicateElementPlace, setDuplicateElementPlace }: IProps) => {
  const [urlHovered, setUrlHovered] = useState("");
  const { addDraggableElement } = useDraggableElementAction();

  const onClickButtons = (type: NaviKaniIconsTypes) => {
    addDraggableElement(ActionTypes.naviAndKani, duplicateElementPlace, setDuplicateElementPlace, type);
    setOpen(false);
  };

  return (
    <div className={`flex flex-col mt-[-4rem] pt-[4rem] pb-2 relative z-0 rounded-3xl bg-[#009FDE]`}>
      {iconsNaviKani.map((item: IIconsNaviKani, i: number) => (
        <img
          key={i}
          className="m-1.5 mb-0 cursor-pointer"
          src={getSrc(item.url, urlHovered == item.url)}
          alt={item.type}
          onMouseEnter={() => setUrlHovered(item.url)}
          onMouseLeave={() => setUrlHovered("")}
          onClick={() => onClickButtons(item.type)}
        />
      ))}
    </div>
  );
};
export default NaviKanyMenu;
