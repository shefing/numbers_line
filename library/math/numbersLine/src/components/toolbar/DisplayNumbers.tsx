import { Button } from "../ui/button";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { IDisplayRuller, TypeCover } from "../../type/elements";
import triangleToMenu from "/assets/icons/TriangleToMenu.png";
import { displayRulerButtonDetials } from "../../consts/elementConsts";

interface IProps {
  setOpen: (val: boolean) => void;
}
const DisplayNumbers = ({ setOpen }: IProps) => {
  const { coverSituation, visitableDisplayButton, setCoverSituation } = useNumbersLineContext();

  const onClickButtons = (type: TypeCover) => {
    coverSituation == type ? setCoverSituation(TypeCover.nothing) : setCoverSituation(type);
    setOpen(false);
  };

  return (
    <div className="relative flex flex-col items-center bg-white relative">
      <img className="absolute top-0 " src={triangleToMenu} alt="triple for menu" />
      <div className="m-[18px] flex flex-col items-end shadow-2xl rounded-[6px] border border-solid border-[#009FDE] p-2">
        {displayRulerButtonDetials.map((item: IDisplayRuller, i: number) => (
          <Button
            key={i}
            variant="displayRulerNumber"
            isChoice={item.choice == coverSituation}
            isVisitDisable={item.visitDisable == visitableDisplayButton}
            onClick={() => onClickButtons(item.choice)}
          >
            {item.type}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DisplayNumbers;
