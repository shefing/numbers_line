import { useEffect, useRef, useState } from "react";
import { getImageSrc } from "@/lib/utils";
import Eye from "./Eye";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

interface IProps {
  iconUrl: string;
}
const IconsToolbar = ({ iconUrl }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    <div ref={wrapperRef}>
      <img
        className="p-3"
        src={getImageSrc(iconUrl, isHovered, isOpen)}
        alt={type + " Toolbar"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
      />
      <DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DropdownMenuTrigger />
        <DropdownMenuContent>{type == "eye" && <Eye setOpen={setIsOpen} />}</DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default IconsToolbar;
