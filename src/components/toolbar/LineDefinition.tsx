import { useState } from "react";
import { Button } from "../ui/button";
import { LineRange } from "../../type/Line";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import openMenu from "../../assets/icons/menuButtonOpen.svg";
import closeMenu from "../../assets/icons/menuButtonClose.svg";


const LineDefinition = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { setKind } = useNumbersLineContext();

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuButtonClick = (type: LineRange) => {
    setKind(type);
    setIsMenuOpen(false);
  };

  return (
    <div className=" absolute m-2 relative  rounded-md" style={isMenuOpen ? { background: "#009FDE" } : { background: "var(--cyan-100)" }}>
      <Button
        className={`mt-[0.3rem]  w-259 text-xl font-bold ${isMenuOpen && "text-white bg-sky-100"}`}
        variant="ghost"
        onClick={handleButtonClick}
        style={isMenuOpen ? { background: "#009FDE" } : { background: "var(--cyan-100)" }}
      >
        <img className="m-5" src={isMenuOpen ? closeMenu : openMenu} alt="open/close" />
        <div
          className={`ml-6 text-capitalize font-Abraham text-32 font-normal font-Abraham text-2xl font-semibold ${isMenuOpen ? 'text-white' : 'text-[#009FDE]'}`}
        >
          הגדרת הישר
        </div>
      </Button>

      {isMenuOpen && (
        <div className="flex flex-col items-end mt-0 rounded-tl-5 right-0  rounded-md p-2 m-2 bg- [#009FDE]">
          <Button
            className="bg-white text-block mb-4 hover:bg-sky-100 transition rounded-[20px] font-[Abraham] text-[20px] font-[800] mt-6"
            onClick={() => {
              handleMenuButtonClick(LineRange.ten);
            }}
          >
            0 - 10
          </Button>
          <Button
            className="bg-white text-block mb-4 hover:bg-sky-100 transition rounded-[20px] font-[Abraham] text-[20px] font-[800]"
            onClick={() => {
              handleMenuButtonClick(LineRange.twenty);
            }}
          >
            0 - 20
          </Button>
          <Button
            className="bg-white text-block mb-4 hover:bg-sky-100 transition rounded-[20px] font-[Abraham] text-[20px] font-[800]"
            onClick={() => {
              handleMenuButtonClick(LineRange.hundred);
            }}
          >
            (קפיצות של 1) 100 - 0
          </Button>
          <Button
            className="bg-white text-block mb-4 hover:bg-sky-100 transition rounded-[20px] font-[Abraham] text-[20px] font-[800]"
            onClick={() => {
              handleMenuButtonClick(LineRange.hundredCircular);
            }}
          >
            (קפיצות של 10) 100 - 0
          </Button>
        </div>
      )}
    </div>
  );
};

export default LineDefinition;
