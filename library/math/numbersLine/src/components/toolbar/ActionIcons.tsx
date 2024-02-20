import { useEffect, useRef, useState } from "react";
import { calculatUnitsAmount, getImageSrc } from "@/lib/utils";
import DisplayNumbers from "./DisplayNumbers";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { TypeActionIconsToolbar } from "../../type/elements";
import { TypesElement } from "../../type/moveable";
import { v4 as uuidv4 } from "uuid";
import { calcHeightStartPosition, calcWidthStartPosition } from "@/lib/stylesUtils";

interface IProps {
  typeAction: string;
  iconUrl: string;
}
const IconsToolbar = ({ typeAction, iconUrl }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newJumpPixels, setNewJumpPixels] = useState(0);
  const { windowSize, typeRuler, dragElements, setDragElements, idDraggElementClick, initializationDialog, setInitializationDialog } = useNumbersLineContext();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    setNewJumpPixels(0);
  }, [idDraggElementClick]);

  const addDraggableElement = () => {
    const xTranslate = calcWidthStartPosition(2, windowSize.width, typeRuler) + newJumpPixels;
    const yTranslate = calcHeightStartPosition(4, windowSize.height) + newJumpPixels;
    let newText = {
      id: uuidv4(),
      type: TypeActionIconsToolbar.jump == typeAction ? TypesElement.jump : TypesElement.text,
      value: 1,
      transform: `translate(${xTranslate}px, ${yTranslate}px)`,
      underRuler: false,
    };
    let arr = [...dragElements, newText];
    setDragElements(arr);
    setNewJumpPixels((prevPixels) => prevPixels + 10);
    if (xTranslate > windowSize.width - windowSize.width / calculatUnitsAmount(typeRuler) - 50 || yTranslate > windowSize.height - 50) setNewJumpPixels(0);
  };

  const actionButtonClick = () => {
    if (typeAction == TypeActionIconsToolbar.jump || typeAction == TypeActionIconsToolbar.text) addDraggableElement();
    else {
      if (typeAction == TypeActionIconsToolbar.reload) {
        setInitializationDialog(true);
      } else setIsOpen(!isOpen);
    }
  };

  return (
    <div className="flex flex-col items-center" ref={wrapperRef}>
      <img
        className="m-3 cursor-pointer"
        src={getImageSrc(iconUrl, isHovered, typeAction === TypeActionIconsToolbar.reload ? initializationDialog : isOpen)}
        alt={typeAction + " Toolbar"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => actionButtonClick()}
      />
      <div className="relative">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger />
          <DropdownMenuContent>{typeAction === TypeActionIconsToolbar.displayNumbersLine && <DisplayNumbers setOpen={setIsOpen} />}</DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default IconsToolbar;
