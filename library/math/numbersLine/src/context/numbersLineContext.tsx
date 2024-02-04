import React, { useState } from "react";
import { LineRange } from "../type/Line";
import { IElement, TypeCover } from "@/type/elements";
interface INumbersLineContextProps {
  type: LineRange;
  setType: (v: LineRange) => void;
  dragElements: IElement[];
  setDragElements: (v: IElement[]) => void;
  coverSituation: TypeCover;
  setCoverSituation: (v: TypeCover) => void;
  visitableDisplayButton: TypeCover;
  setVisitableDisplayButton: (v: TypeCover) => void;
}

export const NumbersLineContext = React.createContext({
  type: {} as LineRange,
  setType: () => null,
  dragElements: {} as IElement[],
  setDragElements: () => null,
  coverSituation: {} as TypeCover,
  setCoverSituation: () => null,
  visitableDisplayButton: {} as TypeCover,
  setVisitableDisplayButton: () => null,
} as INumbersLineContextProps);

export const NumbersLineContexProvider = (props: any) => {
  const [type, setType] = useState(LineRange.ten);
  const [dragElements, setDragElements] = useState<IElement[]>([]);
  const [coverSituation, setCoverSituation] = useState(TypeCover.allDiscover);
  const [visitableDisplayButton, setVisitableDisplayButton] = useState(TypeCover.allDiscover);

  return (
    <NumbersLineContext.Provider
      value={{
        type,
        setType,
        dragElements,
        setDragElements,
        coverSituation,
        setCoverSituation,
        visitableDisplayButton,
        setVisitableDisplayButton,
      }}
    >
      {props.children}
    </NumbersLineContext.Provider>
  );
};

export const useNumbersLineContext = () => React.useContext(NumbersLineContext);
