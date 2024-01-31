
import { TypeCover } from "../type/elements"
import { buttonEyeClassName, buttonEyeDisabledClassName } from "../styles/button"

export const MatchButtonClassName = (coverSituation :TypeCover, isDisable: TypeCover, isChoice: TypeCover) => {
    if(coverSituation == isDisable )
       return buttonEyeClassName+ buttonEyeDisabledClassName;
   if(coverSituation == isChoice)
       return buttonEyeClassName+" bg-[#7BC8EF] text-white"
   return buttonEyeClassName
  };
  