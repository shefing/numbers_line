import { useEffect, useRef, useState } from "react";
import { calcHeightStartPosition, calcWidthStartPosition, calculatUnitsAmount } from "../../lib/utils";
import DisplayNumbers from "./DisplayNumbers";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { ActionTypes, TypeCover } from "../../type/elements";
import { v4 as uuidv4 } from "uuid";
import { IElement } from "@/type/moveable";

interface IProps {
  typeAction: ActionTypes;
  iconUrl: string;
  isDragged?: boolean;
}
const IconsToolbar = ({ typeAction, iconUrl, isDragged }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newJumpPixels, setNewJumpPixels] = useState(0);
  const {
    windowSize,
    rulerPaddingSides,
    typeRuler,
    dragElements,
    setDragElements,
    idDraggElementClick,
    openReloadDialog,
    setOpenReloadDialog,
    visitableDisplayButton,
  } = useNumbersLineContext();
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
    setNewJumpPixels(0);
  }, [idDraggElementClick]);

  const getSrc = () => {
    const isClicked = typeAction === ActionTypes.reload ? openReloadDialog : isOpen;
    const isDisabled = typeAction === ActionTypes.reload && dragElements.length == 0 && visitableDisplayButton == TypeCover.allDiscover;
    const dotIndex = iconUrl.indexOf(".");
    const beforeDot = iconUrl.substring(0, dotIndex);
    return isClicked ? beforeDot + "Open.svg" : isHovered ? beforeDot + "Hover.svg" : isDisabled ? beforeDot + "Disable.svg" : iconUrl;
  };

  const addDraggableElement = () => {
    const xTranslate = calcWidthStartPosition(2, windowSize.width, typeRuler) + newJumpPixels;
    const yTranslate = calcHeightStartPosition(4, windowSize.height) + newJumpPixels;

    let newElement: IElement = {
      id: uuidv4(),
      type: typeAction,
      transform: `translate(${xTranslate}px, ${yTranslate}px)`,
    };

    if (typeAction === ActionTypes.jump) {
      newElement.jump = { value: 1, underRuler: false };
    }

    setDragElements([...dragElements, newElement]);
    setNewJumpPixels((prevPixels) => prevPixels + 10);
    const outOfRange =
      xTranslate > windowSize.width - windowSize.width / calculatUnitsAmount(typeRuler) - rulerPaddingSides ||
      yTranslate > windowSize.height - rulerPaddingSides;

    outOfRange && setNewJumpPixels(0);
  };

  const actionButtonClick = () => {
    if (isDragged) {
      addDraggableElement();
      return;
    }
    typeAction == ActionTypes.reload ? setOpenReloadDialog(true) : setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="flex flex-col items-center" ref={wrapperRef}>
      <img
        className="m-3 cursor-pointer"
        src={getSrc()}
        alt={typeAction + " Toolbar"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => actionButtonClick()}
      />
      {typeAction === ActionTypes.displayNumbersLine && (
        <div className="relative">
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger />
            <DropdownMenuContent>
              <DisplayNumbers setOpen={setIsOpen} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default IconsToolbar;
