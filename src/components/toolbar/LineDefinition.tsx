import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { LineRange } from "../../type/Line";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import openMenu from "/assets/icons/menuButtonOpen.svg";
import closeMenu from "/assets/icons/menuButtonClose.svg";
import { buttonLineDefinationClassName } from "@/styles/button";

const LineDefinition = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { type } = useNumbersLineContext();
  const { setType } = useNumbersLineContext();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuButtonClick = (type: LineRange) => {
    setType(type);
    setIsMenuOpen(false);
  };

  return (
    <div ref={wrapperRef} className={`flex flex-col items-end  rounded-md ${isMenuOpen && "shadow-2xl bg-[#009FDE]"}`}>
      <div className={`cursor-pointer flex  w-259 text-xl rounded-md ${isMenuOpen && ""}`} onClick={handleButtonClick}>
        <img className="p-6 pr-6" src={isMenuOpen ? closeMenu : openMenu} alt="Menu Arrow" />
        <div className={`p-2 text-[#009FDE] text-[32px] font-[Abraham] ${isMenuOpen && " text-[#ffffff]"}`}>הגדרת הישר</div>
      </div>

      {isMenuOpen && (
        <div className="flex flex-col items-end pt-5 pb-2 rounded-md">
          <Button className={buttonLineDefinationClassName + (LineRange.ten == type && " bg-[#7BC8EF]")} onClick={() => handleMenuButtonClick(LineRange.ten)}>
            0-10
          </Button>
          <Button
            className={buttonLineDefinationClassName + (LineRange.twenty == type && " bg-[#7BC8EF]")}
            onClick={() => handleMenuButtonClick(LineRange.twenty)}
          >
            0-20
          </Button>
          <Button
            className={buttonLineDefinationClassName + (LineRange.hundredCircular == type && " bg-[#7BC8EF]")}
            onClick={() => handleMenuButtonClick(LineRange.hundredCircular)}
          >
            (קפיצות של 10)0-100
          </Button>
          <Button
            className={buttonLineDefinationClassName + (LineRange.hundred == type && " bg-[#7BC8EF]")}
            onClick={() => handleMenuButtonClick(LineRange.hundred)}
          >
            (קפיצות של 1)0-100
          </Button>
        </div>
      )}
    </div>
  );
};

export default LineDefinition;
