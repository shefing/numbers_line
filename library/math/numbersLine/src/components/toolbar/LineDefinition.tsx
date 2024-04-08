import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { LineRange, RulerLenth } from "../../type/ruler";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { RulerPaddingSides, rulerDefinitionButtonDetials } from "../../consts/elementConsts";
import { IRulerDefinition, TypeCover } from "../../type/toolbar";
import { t } from "i18next";
import { ILanguage } from "../../type/language";
import openMenu from "/assets/icons/menuButtonOpen.svg";
import closeMenu from "/assets/icons/menuButtonClose.svg";

const LineDefinition = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, windowSize, rulerType, setrulerType, setRulerPaddingSides, setLeftPosition, dragElements, visitableDisplayButton, setOpenRestartDialog, setrulerTypeShould } =
    useNumbersLineContext();
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
    if (type == rulerType) return;
    setIsMenuOpen(false);
    if (dragElements.length == 0 && visitableDisplayButton == TypeCover.allDiscover) {
      setrulerType(type);
      rulerType == LineRange.hundred ? setRulerPaddingSides(windowSize.width / RulerLenth.hundred / 2) : RulerPaddingSides;
      setLeftPosition(0);
    } else {
      setrulerTypeShould(type);
      setOpenRestartDialog(true);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`flex flex-col items-end p-2 rounded-md  ${language === ILanguage.AR ? "w-[18rem]" : " w-[16rem]"} w-[16rem] ${isMenuOpen && "shadow-2xl bg-[#009FDE]"} relative`}
    >
      <div className="cursor-pointer flex" onClick={handleButtonClick}>
        <img className="p-3 pr-6" src={isMenuOpen ? closeMenu : openMenu} alt="Menu Arrow" />
        <div className={`pr-3 text-[#009FDE] ${language === ILanguage.AR ? "text-[22px]" : " text-[32px]"} font-[500] font-[Abraham] ${isMenuOpen && " text-white"}`}>
          {t("line_defination")}
        </div>
      </div>

      {isMenuOpen && (
        <div className="flex flex-col items-end pt-5 pb-2 rounded-md">
          {rulerDefinitionButtonDetials.map((item: IRulerDefinition, i: number) => (
            <Button key={i} variant="linedefinition" isChoice={item.choice == rulerType} onClick={() => handleMenuButtonClick(item.choice)}>
              {(item.choice == LineRange.hundredCircular ? t("ruler_jump_size_10") : item.choice == LineRange.hundred ? t("ruler_jump_size_1") : "") + item.type}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
export default LineDefinition;
