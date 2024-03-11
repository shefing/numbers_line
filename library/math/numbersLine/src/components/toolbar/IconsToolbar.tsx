import { useEffect, useRef, useState } from "react";
import { getSrc } from "../../lib/utils";
import DisplayNumbers from "./DisplayNumbers";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { ActionTypes, TypeCover, WritingSituation } from "../../type/elements";

import NaviKanyMenu from "./NaviKeniMenu";
import { useDraggableElementAction } from "../../hooks/useDraggableElementAction";
import BrushMenu from "./BrushMenu";

interface IProps {
  typeAction: ActionTypes;
  iconUrl: string;
  isDragged?: boolean;
  isMenu?: boolean;
}
const IconsToolbar = ({ typeAction, iconUrl, isDragged, isMenu }: IProps) => {
  const {
    dragElements,
    idDraggElementClick,
    setIdDraggElementClick,
    setDuplicateElementSpace,
    openRestartDialog,
    setOpenRestartDialog,
    visitableDisplayButton,
    setColor,
  } = useNumbersLineContext();
  const { addDraggableElement } = useDraggableElementAction();
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [iconSrc, setIconSrc] = useState(getSrc(iconUrl, isHovered));
  const [writingSituation, setWritingSituation] = useState(WritingSituation.nothing);
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
    idDraggElementClick != "" && setDuplicateElementSpace(0);
  }, [idDraggElementClick]);
  useEffect(() => {
    setIdDraggElementClick("");
  }, [isOpen]);
  useEffect(() => {
    const isClicked = typeAction === ActionTypes.restart ? openRestartDialog : isOpen;
    const isDisabled = typeAction === ActionTypes.restart && dragElements.length == 0 && visitableDisplayButton == TypeCover.allDiscover;
    writingSituation == WritingSituation.nothing
      ? setIconSrc(getSrc(iconUrl, isHovered, isClicked, isDisabled))
      : setIconSrc(getSrc(iconUrl, isHovered, isClicked, isDisabled, writingSituation));
  }, [isOpen, isHovered, openRestartDialog, dragElements, visitableDisplayButton, writingSituation]);

  const actionButtonClick = () => {
    isDragged && addDraggableElement(typeAction);
    isMenu && setIsOpen((prevOpen) => !prevOpen);
    typeAction == ActionTypes.restart && (setOpenRestartDialog(true), setIdDraggElementClick(""));
    setColor("");
    setWritingSituation(WritingSituation.nothing);
  };

  return (
    <div className="flex flex-col items-center relative" ref={wrapperRef}>
      <img
        className={`m-3 cursor-pointer z-10 ${
          typeAction === ActionTypes.restart && dragElements.length == 0 && visitableDisplayButton == TypeCover.allDiscover && "pointer-events-none"
        }`}
        src={iconSrc}
        alt={typeAction + " Toolbar"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => actionButtonClick()}
      />

      {isOpen &&
        (typeAction === ActionTypes.displayNumbersLine ? (
          <DisplayNumbers setOpen={setIsOpen} />
        ) : typeAction === ActionTypes.naviAndKeni ? (
          <NaviKanyMenu setOpen={setIsOpen} />
        ) : (
          <BrushMenu setOpen={setIsOpen} setWritingSituation={setWritingSituation} />
        ))}
    </div>
  );
};

export default IconsToolbar;
