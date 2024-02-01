import { useEffect, useRef, useState } from "react";
import { getImageSrc } from "@/lib/utils";
import DisplayNumbers from "./DisplayNumbers";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Jump from "./Jump";

interface IProps {
  iconUrl: string;
}
const IconsToolbar = ({ iconUrl }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("type", type);

    const handleOutsideClick = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const dotIndex = iconUrl.indexOf(".");
    const slushIndex = iconUrl.lastIndexOf("/");
    setType(iconUrl.substring(slushIndex + 1, dotIndex));

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center" ref={wrapperRef}>
      <img
        className="m-3 cursor-pointer"
        src={getImageSrc(iconUrl, isHovered, isOpen)}
        alt={type + " Toolbar"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className="relative">
        <DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <DropdownMenuTrigger />
          <DropdownMenuContent>{type == "eye" && <DisplayNumbers setOpen={setIsOpen} />}</DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isOpen && type == "jump" && <Jump />}
    </div>
  );
};

export default IconsToolbar;
