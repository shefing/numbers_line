import { useEffect, useRef, useState } from "react";
import { getImageSrc } from "@/lib/utils";
import Jump from "./Jump";

interface IProps {
  kind: string;
}
const IconsToolbar = ({ kind }: IProps) => {
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

  return (
    <div ref={wrapperRef}>
      <img
        className="p-3"
        src={getImageSrc(kind, isHovered, isOpen)}
        alt={kind + " Toolbar"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && <Jump />}
    </div>
  );
};

export default IconsToolbar;
