
import { TypeCover } from "../type/elements"
import { buttonEyeClassName, buttonEyeDisabledClassName } from "../styles/button"
import { useNumbersLineContext } from "@/context/numbersLineContext";

export const MatchButtonClassName = ( isVisitAble: TypeCover, isChoice: TypeCover) => {
  const { coverSituation, disVisitAble } = useNumbersLineContext();

    if(disVisitAble == isVisitAble)
       return buttonEyeClassName+ buttonEyeDisabledClassName;
   if(coverSituation == isChoice)
       return buttonEyeClassName+" bg-[#7BC8EF] text-white"
   return buttonEyeClassName
  };
  