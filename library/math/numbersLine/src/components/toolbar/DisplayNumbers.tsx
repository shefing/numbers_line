import { Button } from "../ui/button";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { IDisplayRuller, TypeCover } from "../../type/elements";
import { MatchDisplayButtonClassName } from "../../lib/stylesUtils";
import triangleToMenu from "/assets/icons/TriangleToMenu.png";
import { displayRulerButtonDetials } from "../../consts/elementConsts";

interface IProps {
  setOpen: (val: boolean) => void;
}
const DisplayNumbers = ({ setOpen }: IProps) => {
  const { coverSituation, setCoverSituation } = useNumbersLineContext();

  const onClickButtons = (type: TypeCover) => {
    coverSituation == type ? setCoverSituation(TypeCover.nothing) : setCoverSituation(type);
    setOpen(false);
  };

  return (
    <div className="relative flex flex-col items-center">
      <img className="absolute top-0 " src={triangleToMenu} alt="triple for menu" />
      <div className="m-[18px] flex flex-col items-end shadow-2xl rounded-[6px] border border-solid border-[#009FDE] p-2">
        {displayRulerButtonDetials.map((item: IDisplayRuller, i: number) => (
          <Button key={i} className={MatchDisplayButtonClassName(item.visitAble, item.choice)} onClick={() => onClickButtons(item.choice)}>
            {item.type}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DisplayNumbers;
