import { useEffect, useRef, useState } from "react";
import { calculatUnitsAmount, getImageSrc } from "@/lib/utils";
import DisplayNumbers from "./DisplayNumbers";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { TypeActionIconsToolbar, TypeCover } from "../../type/elements";
import { TypesElement } from "../../type/moveable";
import { v4 as uuidv4 } from "uuid";
import { calcHeightStartPosition, calcWidthStartPosition } from "../../lib/stylesUtils";

interface IProps {
  typeAction: string;
  iconUrl: string;
}
const IconsToolbar = ({ typeAction, iconUrl }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newJumpPixels, setNewJumpPixels] = useState(0);
  const { windowSize, typeRuler, dragElements, setDragElements, idDraggElementClick, isOpenDialog, setIsOpenDialog, visitableDisplayButton } =
    useNumbersLineContext();
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

  const getSrc = () => {
    return getImageSrc(
      iconUrl,
      isHovered,
      typeAction === TypeActionIconsToolbar.reload ? isOpenDialog : isOpen,
      typeAction === TypeActionIconsToolbar.reload && dragElements.length == 0 && visitableDisplayButton == TypeCover.allDiscover
    );
  };

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
        setIsOpenDialog(true);
      } else setIsOpen((prevOpen) => !prevOpen);
    }
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
