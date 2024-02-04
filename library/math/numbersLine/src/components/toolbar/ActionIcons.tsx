import { useEffect, useRef, useState } from "react";
import { getImageSrc } from "@/lib/utils";
import DisplayNumbers from "./DisplayNumbers";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useNumbersLineContext } from "@/context/numbersLineContext";
import { TypeActionIconsToolbar, TypesElement } from "@/type/elements";

interface IProps {
  iconUrl: string;
  type: TypeActionIconsToolbar;
}
const IconsToolbar = ({ type, iconUrl }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const { dragElements, setDragElements } = useNumbersLineContext();

  const addDraggableElement = () => {
    let newText = {
      id: dragElements.length,
      type: TypeActionIconsToolbar.jump == type ? TypesElement.jump : TypesElement.text,
      transform: "(-50%, -50%)",
      value: 1,
      hideNumber: true,
    };

    let arr = [...dragElements, newText];
    setDragElements(arr);
  };
  const actionButtonClick = () => {
    type == TypeActionIconsToolbar.jump || type == TypeActionIconsToolbar.text ? addDraggableElement() : setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center" ref={wrapperRef}>
      <img
        className="m-3 cursor-pointer"
        src={getImageSrc(iconUrl, isHovered, isOpen)}
        alt={type + " Toolbar"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => actionButtonClick()}
      />
      <div className="relative">
        <DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <DropdownMenuTrigger />
          <DropdownMenuContent>{type == TypeActionIconsToolbar.displayNumbersLine && <DisplayNumbers setOpen={setIsOpen} />}</DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default IconsToolbar;
