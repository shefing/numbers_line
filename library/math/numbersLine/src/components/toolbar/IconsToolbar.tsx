import { useEffect, useRef, useState } from "react";
import { calculatUnitsAmount, getSrc } from "../../lib/utils";
import DisplayNumbers from "./DisplayNumbers";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { ActionTypes, TypeCover } from "../../type/elements";
import { v4 as uuidv4 } from "uuid";
import { IElement } from "../../type/moveable";
import { useHelpers } from "../../hooks/useHelpers";
import { textWidth } from "../../consts/elementConsts";
import NaviKanyMenu from "./NaviKaniMenu";

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
  const {
    windowSize,
    rulerPaddingSides,
    typeRuler,
    dragElements,
    setDragElements,
    idDraggElementClick,
    setIdDraggElementClick,
    openRestartDialog,
    setOpenRestartDialog,
    visitableDisplayButton,
  } = useNumbersLineContext();
  const { calculatRulerWidth } = useHelpers();
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

  const addDraggableElement = () => {
    const elementWidth =
      typeAction == ActionTypes.jump ? calculatRulerWidth() / calculatUnitsAmount(typeRuler) : typeAction == ActionTypes.text ? textWidth : 50;
    const xTranslate = (windowSize.width - elementWidth) / 2 + duplicateElementPlace;
    const yTranslate = windowSize.height / 4 + duplicateElementPlace;

    let newElement: IElement = {
      id: uuidv4(),
      type: typeAction,
      transform: `translate(${xTranslate}px, ${yTranslate}px)`,
      width: elementWidth,
    };

    if (typeAction === ActionTypes.jump) {
      newElement.jump = { value: 1, underRuler: false };
    }
    setDragElements([...dragElements, newElement]);
    setDuplicateElementPlace((prevPixels) => prevPixels + 10);
    const outOfRange =
      xTranslate > windowSize.width - windowSize.width / calculatUnitsAmount(typeRuler) - rulerPaddingSides ||
      yTranslate > windowSize.height - rulerPaddingSides;

    outOfRange && setDuplicateElementPlace(0);
  };

  const actionButtonClick = () => {
    isDragged && addDraggableElement();
    isMenu && setIsOpen((prevOpen) => !prevOpen);
    typeAction == ActionTypes.restart && (setOpenRestartDialog(true), setIdDraggElementClick(""));
  };

  return (
    <div className="flex flex-col items-center" ref={wrapperRef}>
      <img
        className={`m-3 cursor-pointer ${
          typeAction === ActionTypes.restart && dragElements.length == 0 && visitableDisplayButton == TypeCover.allDiscover && "pointer-events-none"
        }`}
        src={getSrcLocal()}
        alt={typeAction + " Toolbar"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => actionButtonClick()}
      />
      <div className="relative">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger />
          <DropdownMenuContent>
            {typeAction === ActionTypes.displayNumbersLine ? (
              <DisplayNumbers setOpen={setIsOpen} />
            ) : typeAction === ActionTypes.naviAndKani ? (
              false && <NaviKanyMenu />
            ) : (
              <></>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default IconsToolbar;
