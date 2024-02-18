import { useEffect, useRef, useState } from "react";
import { getImageSrc } from "@/lib/utils";
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
  const { windowSize, typeRuler, dragElements, setDragElements } = useNumbersLineContext();
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

  const addDraggableElement = () => {
    let newText = {
      id: uuidv4(),
      type: TypeActionIconsToolbar.jump == typeAction ? TypesElement.jump : TypesElement.text,
      value: 1,
      hideNumber: true,
      transform: `translate(${calcWidthStartPosition(2, windowSize.width, typeRuler)}px, ${calcHeightStartPosition(4, windowSize.height)}px)`,
      underRuler: false,
    };
    let arr = [...dragElements, newText];
    setDragElements(arr);
  };
  const actionButtonClick = () => {
    typeAction == TypeActionIconsToolbar.jump || typeAction == TypeActionIconsToolbar.text ? addDraggableElement() : setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center" ref={wrapperRef}>
      <img
        className="m-3 cursor-pointer"
        src={getImageSrc(iconUrl, isHovered, isOpen)}
        alt={typeAction + " Toolbar"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => actionButtonClick()}
      />
      <div className="relative">
        <DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <DropdownMenuTrigger />
          <DropdownMenuContent>{typeAction == TypeActionIconsToolbar.displayNumbersLine && <DisplayNumbers setOpen={setIsOpen} />}</DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default IconsToolbar;
