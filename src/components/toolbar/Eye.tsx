import { buttonEyeClassName, buttonEyeDisabledClassName } from "@/styles/button";
import { Button } from "../ui/button";
import { useNumbersLineContext } from "@/context/numbersLineContext";
import { TypeCover, TypeShowNumber } from "@/type/elements";
interface IProps {
  setOpen: (val: boolean) => void;
}
const Eye = ({ setOpen }: IProps) => {
  const { isCover, setIsCover, isCoverAll, setIsCoverAll, numbersShow } = useNumbersLineContext();

  const PartiallyButtons = (type: TypeCover) => {
    if ((type == TypeCover.discover && numbersShow != TypeShowNumber.allShow) || (type == TypeCover.cover && numbersShow != TypeShowNumber.nothingSHow)) {
      isCover == type ? setIsCover(TypeCover.nothing) : setIsCover(type);
      setOpen(false);
    }
  };
  const AllButtons = (type: TypeCover) => {
    if ((type == TypeCover.discover && numbersShow != TypeShowNumber.allShow) || (type == TypeCover.cover && numbersShow != TypeShowNumber.nothingSHow)) {
      isCoverAll == type ? setIsCoverAll(TypeCover.nothing) : setIsCoverAll(type);
      setOpen(false);
    }
  };

  return (
    <div className=" flex flex-col  shadow-2xl rounded-[6px] border border-solid border-[#009FDE] p-3 mt-2">
      <Button
        className={numbersShow == TypeShowNumber.nothingSHow ? buttonEyeDisabledClassName : buttonEyeClassName}
        onClick={() => AllButtons(TypeCover.cover)}
      >
        הסתר הכל
      </Button>
      {/* <Button className={buttonEyeClassName}>הסתר חלקית</Button> */}
      <Button
        className={
          numbersShow == TypeShowNumber.nothingSHow
            ? buttonEyeDisabledClassName
            : buttonEyeClassName + (isCover == TypeCover.cover && " bg-[#7BC8EF] text-white")
        }
        onClick={() => PartiallyButtons(TypeCover.cover)}
      >
        הסתר ידנית
      </Button>
      <Button
        className={
          numbersShow == TypeShowNumber.allShow
            ? buttonEyeDisabledClassName
            : buttonEyeClassName + (isCover == TypeCover.discover && " bg-[#7BC8EF] text-white")
        }
        onClick={() => PartiallyButtons(TypeCover.discover)}
      >
        הצג ידנית
      </Button>
      <Button
        className={numbersShow == TypeShowNumber.allShow ? buttonEyeDisabledClassName : buttonEyeClassName}
        onClick={() => AllButtons(TypeCover.discover)}
      >
        הצג הכל
      </Button>
    </div>
  );
};

export default Eye;
