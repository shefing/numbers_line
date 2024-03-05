import { useEffect, useRef, useState } from "react";
import { getSrc } from "../../lib/utils";
import DisplayNumbers from "./DisplayNumbers";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { ActionTypes, TypeCover } from "../../type/elements";

import NaviKanyMenu from "./NaviKeniMenu";
import { useDraggableElementAction } from "@/hooks/useDraggableElementAction";

interface IProps {
  typeAction: ActionTypes;
  iconUrl: string;
  isDragged?: boolean;
  isMenu?: boolean;
}
const IconsToolbar = ({ typeAction, iconUrl, isDragged, isMenu }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [duplicateElementPlace, setDuplicateElementPlace] = useState(0);
  const { dragElements, idDraggElementClick, setIdDraggElementClick, openRestartDialog, setOpenRestartDialog, visitableDisplayButton } =
    useNumbersLineContext();
  const { addDraggableElement } = useDraggableElementAction();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    setDuplicateElementPlace(0);
  }, [idDraggElementClick]);
  useEffect(() => {
    setIdDraggElementClick("");
  }, [isOpen]);

  const getSrcLocal = () => {
    const isClicked = typeAction === ActionTypes.restart ? openRestartDialog : isOpen;
    const isDisabled = typeAction === ActionTypes.restart && dragElements.length == 0 && visitableDisplayButton == TypeCover.allDiscover;
    return getSrc(iconUrl, isHovered, isClicked, isDisabled);
  };

  const actionButtonClick = () => {
    isDragged && addDraggableElement(typeAction, duplicateElementPlace, setDuplicateElementPlace);
    isMenu && setIsOpen((prevOpen) => !prevOpen);
    typeAction == ActionTypes.restart && (setOpenRestartDialog(true), setIdDraggElementClick(""));
  };

  return (
    <div className="flex flex-col items-center relative" ref={wrapperRef}>
      <img
        className={`m-3 cursor-pointer z-10 ${
          typeAction === ActionTypes.restart && dragElements.length == 0 && visitableDisplayButton == TypeCover.allDiscover && "pointer-events-none"
        }`}
        src={getSrcLocal()}
        alt={typeAction + " Toolbar"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => actionButtonClick()}
      />

      {isOpen &&
        (typeAction === ActionTypes.displayNumbersLine ? (
          <DisplayNumbers setOpen={setIsOpen} />
        ) : typeAction === ActionTypes.naviAndKeni ? (
          <NaviKanyMenu setOpen={setIsOpen} duplicateElementPlace={duplicateElementPlace} setDuplicateElementPlace={setDuplicateElementPlace} />
        ) : (
          <></>
        ))}
    </div>
  );
};

export default IconsToolbar;
