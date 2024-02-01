import React, { useEffect, useState } from "react";
import { LineRange } from "../type/Line";
import { IElement, TypeCover } from "@/type/elements";
interface INumbersLineContextProps {
  type: LineRange;
  setType: (v: LineRange) => void;
  dragElements: IElement[];
  setDragElements: (v: IElement[]) => void;
  coverSituation: TypeCover;
  setCoverSituation: (v: TypeCover) => void;
  disVisitAbleButton: TypeCover;
  setDisVisitAbleButton: (v: TypeCover) => void;
}

export const NumbersLineContext = React.createContext({
  type: {} as LineRange,
  setType: () => null,
  dragElements: {} as IElement[],
  setDragElements: () => null,
  coverSituation: {} as TypeCover,
  setCoverSituation: () => null,
  disVisitAbleButton: {} as TypeCover,
  setDisVisitAbleButton: () => null,
} as INumbersLineContextProps);

export const NumbersLineContexProvider = (props: any) => {
  const [type, setType] = useState(LineRange.ten);
  const [dragElements, setDragElements] = useState<IElement[]>([]);
  const [coverSituation, setCoverSituation] = useState(TypeCover.allDiscover);
  const [disVisitAbleButton, setDisVisitAbleButton] = useState(TypeCover.allDiscover);

  useEffect(() => {
    console.log("dragElements: ", dragElements);
  }, [dragElements]);

  return (
    <NumbersLineContext.Provider
      value={{
        type,
        setType,
        dragElements,
        setDragElements,
        coverSituation,
        setCoverSituation,
        disVisitAbleButton,
        setDisVisitAbleButton,
      }}
    >
      {props.children}
    </NumbersLineContext.Provider>
  );
};

export const useNumbersLineContext = () => React.useContext(NumbersLineContext);
