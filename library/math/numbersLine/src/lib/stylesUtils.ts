
import { TypeCover } from "../type/elements"
import { buttonEyeClassName, buttonEyeDisabledClassName } from "../styles/button"
import { useNumbersLineContext } from "@/context/numbersLineContext";

export const MatchDisplayButtonClassName = ( isVisitAble: TypeCover, isChoice: TypeCover) => {
  const { coverSituation, visitableDisplayButton } = useNumbersLineContext();

    if(visitableDisplayButton == isVisitAble)
       return buttonEyeClassName+ buttonEyeDisabledClassName;
   if(coverSituation == isChoice)
       return buttonEyeClassName+" bg-[#7BC8EF] text-white"
   return buttonEyeClassName
  };

    