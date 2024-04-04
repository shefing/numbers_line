import { Button } from "../ui/button";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { IDisplayRuller, TypeCover } from "../../type/toolbar";
import { ToolbarHeight, displayRulerButtonDetials } from "../../consts/elementConsts";
import { t } from "i18next";
import triangleToMenu from "/assets/icons/TriangleToMenu.png";

interface IProps {
  setOpen: (val: boolean) => void;
}
const DisplayNumbersMenu = ({ setOpen }: IProps) => {
  const { coverSituation, visitableDisplayButton, setCoverSituation } = useNumbersLineContext();

  const onClickButtons = (type: TypeCover) => {
    coverSituation == type ? setCoverSituation(TypeCover.nothing) : setCoverSituation(type);
    setOpen(false);
  };

  return (
    <div className="fixed ">
      <div className="flex flex-col items-center" style={{ margin: ToolbarHeight - 10 + "px" }}>
        <img className="relative mb-[-3px] " src={triangleToMenu} alt="triple for menu" />
        <div className="flex flex-col items-end bg-white rounded-[6px] border border-[#009FDE] p-2 ">
          {displayRulerButtonDetials.map((item: IDisplayRuller, i: number) => (
            <Button
              key={i}
              variant="displayRulerNumber"
              isChoice={item.choice == coverSituation}
              isVisitDisable={item.visitDisable == visitableDisplayButton}
              onClick={() => onClickButtons(item.choice)}
            >
              {t(item.type)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayNumbersMenu;
