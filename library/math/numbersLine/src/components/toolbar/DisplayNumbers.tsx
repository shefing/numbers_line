import { Button } from "../ui/button";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { TypeCover } from "../../type/elements";
import { MatchButtonClassName } from "../../lib/stylesUtils";
import triangleToMenu from "/assets/icons/TriangleToMenu.png";

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
    <div className="relative flex flex-col items-center justify-center">
      <img className="absolute top-0 " src={triangleToMenu} alt="triple for menu" />
      <div className="m-[18px] flex flex-col shadow-2xl rounded-[6px] border border-solid border-[#009FDE] p-2">
        <Button className={MatchButtonClassName(coverSituation, TypeCover.allCover, TypeCover.allCover)} onClick={() => onClickButtons(TypeCover.allCover)}>
          הסתר הכל
        </Button>
        {/* <Button className={buttonEyeClassName}>הסתר חלקית</Button> */}
        <Button
          className={MatchButtonClassName(coverSituation, TypeCover.allCover, TypeCover.partiallyCover)}
          onClick={() => onClickButtons(TypeCover.partiallyCover)}
        >
          הסתר ידנית
        </Button>
        <Button
          className={MatchButtonClassName(coverSituation, TypeCover.allDiscover, TypeCover.partiallyDiscover)}
          onClick={() => onClickButtons(TypeCover.partiallyDiscover)}
        >
          הצג ידנית
        </Button>
        <Button
          className={MatchButtonClassName(coverSituation, TypeCover.allDiscover, TypeCover.allDiscover)}
          onClick={() => onClickButtons(TypeCover.allDiscover)}
        >
          הצג הכל
        </Button>
      </div>
    </div>
  );
};

export default DisplayNumbers;
