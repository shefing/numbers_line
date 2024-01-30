import { MatchButtonClassName } from "@/styles/button";
import { Button } from "../ui/button";
import { useNumbersLineContext } from "@/context/numbersLineContext";
import { TypeCover } from "@/type/elements";
interface IProps {
  setOpen: (val: boolean) => void;
}
const Eye = ({ setOpen }: IProps) => {
  const { coverSituation, setCoverSituation } = useNumbersLineContext();

  const onClickButtons = (type: TypeCover) => {
    coverSituation == type ? setCoverSituation(TypeCover.nothing) : setCoverSituation(type);
    setOpen(false);
  };

  return (
    <>
      {/* <img className="p-5" src={triangleMenu} alt="Fullscreen Toolbar" /> */}
      <div className="flex flex-col shadow-2xl rounded-[6px] border border-solid border-[#009FDE] p-3 mt-2">
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
    </>
  );
};

export default Eye;
