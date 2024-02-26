import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { LineRange, RulerLenth } from "../../type/ruler";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import openMenu from "/assets/icons/menuButtonOpen.svg";
import closeMenu from "/assets/icons/menuButtonClose.svg";
import { RulerPaddingSides, rulerDefinitionButtonDetials } from "../../consts/elementConsts";
import { IRulerDefinition, TypeCover } from "../../type/elements";

const LineDefinition = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    windowSize,
    typeRuler,
    setTypeRuler,
    setRulerPaddingSides,
    setLeftPosition,
    dragElements,
    visitableDisplayButton,
    setOpenReloadDialog,
    setTypeRulerChange,
  } = useNumbersLineContext();
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
    if (type == typeRuler) return;
    setIsMenuOpen(false);
    if (dragElements.length == 0 && visitableDisplayButton == TypeCover.allDiscover) {
      setTypeRuler(type);
      typeRuler == LineRange.hundred ? setRulerPaddingSides(windowSize.width / RulerLenth.hundred / 2) : RulerPaddingSides;
      setLeftPosition(0);
    } else {
      setTypeRulerChange(type);
      setOpenReloadDialog(true);
    }
  };

  return (
    <div ref={wrapperRef} className={`flex flex-col items-end p-2 rounded-md w-[16rem] ${isMenuOpen && "shadow-2xl bg-[#009FDE]"} relative`}>
      <div className="cursor-pointer flex" onClick={handleButtonClick}>
        <img className="p-3 pr-6" src={isMenuOpen ? closeMenu : openMenu} alt="Menu Arrow" />
        <div className={`pr-3 text-[#009FDE] text-[32px] font-[500] font-[Abraham] ${isMenuOpen && " text-white"}`}>הגדרת הישר</div>
      </div>

      {isMenuOpen && (
        <div className="flex flex-col items-end pt-5 pb-2 rounded-md">
          {rulerDefinitionButtonDetials.map((item: IRulerDefinition, i: number) => (
            <Button key={i} variant="linedefinition" isChoice={item.choice == typeRuler} onClick={() => handleMenuButtonClick(item.choice)}>
              {item.type}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
export default LineDefinition;
