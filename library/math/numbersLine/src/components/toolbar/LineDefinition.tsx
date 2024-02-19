import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { LineRange } from "../../type/ruler";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import openMenu from "/assets/icons/menuButtonOpen.svg";
import closeMenu from "/assets/icons/menuButtonClose.svg";
import { buttonLineDefinationClassName } from "../../styles/button";

const LineDefinition = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { typeRuler, setTypeRuler } = useNumbersLineContext();
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
    setTypeRuler(type);
    setIsMenuOpen(false);
  };

  return (
    <div ref={wrapperRef} className={`flex flex-col items-end p-2 rounded-md w-[16rem] ${isMenuOpen && "shadow-2xl bg-[#009FDE]"} relative`}>
      <div className="cursor-pointer flex" onClick={handleButtonClick}>
        <img className="p-3 pr-6" src={isMenuOpen ? closeMenu : openMenu} alt="Menu Arrow" />
        <div className={`pr-3 text-[#009FDE] text-[32px] font-[500] font-[Abraham] ${isMenuOpen && " text-[#ffffff]"}`}>הגדרת הישר</div>
      </div>

      {isMenuOpen && (
        <div className="flex flex-col items-end pt-5 pb-2 rounded-md">
          <Button
            className={buttonLineDefinationClassName + (LineRange.ten == typeRuler && " bg-[#7BC8EF]")}
            onClick={() => handleMenuButtonClick(LineRange.ten)}
          >
            0-10
          </Button>
          <Button
            className={buttonLineDefinationClassName + (LineRange.twenty == typeRuler && " bg-[#7BC8EF]")}
            onClick={() => handleMenuButtonClick(LineRange.twenty)}
          >
            0-20
          </Button>
          <Button
            className={buttonLineDefinationClassName + (LineRange.hundredCircular == typeRuler && " bg-[#7BC8EF]")}
            onClick={() => handleMenuButtonClick(LineRange.hundredCircular)}
          >
            (קפיצות של 10) 0-100
          </Button>
          <Button
            className={buttonLineDefinationClassName + (LineRange.hundred == typeRuler && " bg-[#7BC8EF]")}
            onClick={() => handleMenuButtonClick(LineRange.hundred)}
          >
            (קפיצות של 1) 0-100
          </Button>
        </div>
      )}
    </div>
  );
};

export default LineDefinition;
