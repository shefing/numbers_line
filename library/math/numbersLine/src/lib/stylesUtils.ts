
import { TypeCover } from "../type/elements"
import { buttonEyeClassName, buttonEyeDisabledClassName } from "../styles/button"
import { useNumbersLineContext } from "@/context/numbersLineContext";
import { baseJumpClassName } from "../styles/jump";

export const MatchDisplayButtonClassName = ( isVisitAble: TypeCover, isChoice: TypeCover) => {
  const { coverSituation, visitableDisplayButton } = useNumbersLineContext();

    if(visitableDisplayButton == isVisitAble)
       return buttonEyeClassName+ buttonEyeDisabledClassName;
   if(coverSituation == isChoice)
       return buttonEyeClassName+" bg-[#7BC8EF] text-white"
   return buttonEyeClassName
  };

  export const MatchBaseJumpClassName = (underRuler: boolean) => {
    return underRuler ? baseJumpClassName + " bg-[#F48460] mb-[1rem]" : baseJumpClassName + " bg-[#009FDE] mt-[1rem]";
  };
  


    