import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { LineRange, fontButtonClassName } from "../../type/Line";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import openMenu from "../../assets/icons/menuButtonOpen.svg";
import closeMenu from "../../assets/icons/menuButtonClose.svg";


const LineDefinition = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setKind } = useNumbersLineContext();
  const wrapperRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      // Close the component if the click is outside the component
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
    setKind(type);
    setIsMenuOpen(false);
  };

  return (
    <button
      ref={wrapperRef}
      className={`flex flex-col items-end  right-0 absolute  mt-[1.8%] mr-[1.8%] rounded-md  ${isMenuOpen && "shadow-2xl bg-[#009FDE]"}`}
    >
      <div className={`cursor-pointer flex  w-259 text-xl font-bold rounded-md ${isMenuOpen && "bg-[#009FDE]"}`} onClick={handleButtonClick}>
        <img className="flex-shrink-0 p-5 pr-5" src={isMenuOpen ? closeMenu : openMenu} />
        <div
          className={`flex-shrink-0 text-capitalize p-2 font-Abraham font-normal h-[17px] text-[32px] text-[#009FDE] font-[Abraham] font-[500] ${
            isMenuOpen && " text-[#ffffff]"
          }`}
        >
          {"הגדרת הישר"}
        </div>
      </div>

      {isMenuOpen && (

        <div className="flex flex-col items-end pt-8 pb-2 rounded-tl-5 right-0 rounded-md opacity-100 bg-#009FDE">
          <Button className={fontButtonClassName} onClick={() => handleMenuButtonClick(LineRange.ten)}>
            {"10-0"}
          </Button>
          <Button className={fontButtonClassName} onClick={() => handleMenuButtonClick(LineRange.twenty)}>
            {"20-0"}
          </Button>
          <Button className={fontButtonClassName} onClick={() => handleMenuButtonClick(LineRange.hundredCircular)}>
            {"(קפיצות של 10) 100-0"}
          </Button>
          <Button className={fontButtonClassName} onClick={() => handleMenuButtonClick(LineRange.hundred)}>
            {"(קפיצות של 1) 100-0 "}
          </Button>
        </div>
      )}
    </button>
  );
};

export default LineDefinition;
