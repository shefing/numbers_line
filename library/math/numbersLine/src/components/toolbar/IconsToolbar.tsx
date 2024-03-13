import DisplayNumbers from "./DisplayNumbers";
import BrushMenu from "./BrushMenu";
import NaviKanyMenu from "./NaviKeniMenu";
import { useDraggableElementAction } from "../../hooks/useDraggableElementAction";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { useEffect, useRef, useState } from "react";
import { getSrc } from "../../lib/utils";
import { ActionTypes, Colors, TypeCover, WritingSituation } from "../../type/elements";
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
    color,
    setColor,
  } = useNumbersLineContext();
  const { addDraggableElement } = useDraggableElementAction();
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [iconSrc, setIconSrc] = useState(getSrc(iconUrl, isHovered));
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

  // Effect to update the icon source depending on various state changes:
  // isOpen: Indicates whether the toolbar menu is open or closed.
  // isHovered: Indicates whether the mouse is currently hovering over the toolbar icon.
  // openRestartDialog: Indicates whether the restart dialog is open - for Restrt.
  // dragElements: Array of draggable elements - for Restrt.
  // visitableDisplayButton: Indicates the visibility status of the display button - for Restrt.
  // color: The current drawing color - for Writing.
  useEffect(() => {
    const isClicked = typeAction === ActionTypes.restart ? openRestartDialog : isOpen;
    let isDisabled = typeAction === ActionTypes.restart && dragElements.length == 0 && visitableDisplayButton == TypeCover.allDiscover;
    typeAction === ActionTypes.writing && color.description != WritingSituation.non && color.description != WritingSituation.delete
      ? setIconSrc(getSrc(iconUrl, isHovered, isClicked, isDisabled, color.description))
      : setIconSrc(getSrc(iconUrl, isHovered, isClicked, isDisabled));
  }, [isOpen, isHovered, openRestartDialog, dragElements, visitableDisplayButton, color]);

  const actionButtonClick = () => {
    isDragged && addDraggableElement(typeAction);
    isMenu && setIsOpen((prevOpen) => !prevOpen);
    typeAction == ActionTypes.restart && (setOpenRestartDialog(true), setIdDraggElementClick(""));
    setColor({ description: WritingSituation.non, color: Colors.non });
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
        //Opening an appropriate menu depending on the type of button
        (typeAction === ActionTypes.displayNumbersLine ? (
          <DisplayNumbers setOpen={setIsOpen} />
        ) : typeAction === ActionTypes.naviAndKeni ? (
          <NaviKanyMenu setOpen={setIsOpen} />
        ) : (
          <BrushMenu setOpen={setIsOpen} />
        ))}
    </div>
  );
};

export default IconsToolbar;
