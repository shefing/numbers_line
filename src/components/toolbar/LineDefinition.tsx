import { useState } from "react";
import { Button } from "../ui/button";
import { LineRange } from "../../type/Line";
import { useNumbersLineContext } from "../../context/numbersLineContext";

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
    <div className="relative">
      <Button className={`m-1 text-xl font-bold ${isMenuOpen ? "text-blue-600" : "text-sky-600"}`} variant="ghost" onClick={handleButtonClick}>
        <span className="mr-3">&#x25BC;</span> הגדרת הישר
      </Button>

      {isMenuOpen && (
        <div className="absolute top-8 right-0 bg-sky-100 border border-gray-300 rounded-md p-2">
          <Button
            className="block mb-2 text-blue-600 font-bold"
            onClick={() => {
              handleMenuButtonClick(LineRange.ten);
            }}
          >
            0 -10
          </Button>
          <Button
            className="block mb-2 text-blue-600 font-bold"
            onClick={() => {
              handleMenuButtonClick(LineRange.twenty);
            }}
          >
            0 - 20
          </Button>
          <Button
            className="block mb-2 text-blue-600 font-bold"
            onClick={() => {
              handleMenuButtonClick(LineRange.hundred);
            }}
          >
            0 - 100 (קפיצות של 1)
          </Button>
          <Button
            className="block text-blue-600 font-bold"
            onClick={() => {
              handleMenuButtonClick(LineRange.hundredCircular);
            }}
          >
            O0 - 100 (קפיצות של 10)
          </Button>
        </div>
      )}
    </div>
  );
};

export default LineDefinition;
