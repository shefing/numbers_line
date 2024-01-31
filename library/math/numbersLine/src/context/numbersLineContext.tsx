import React, { useEffect, useState } from "react";
import { LineRange } from "../type/Line";
import { IElement, TypeCover } from "@/type/elements";
import useLocalStorage from "@/hooks/useElement";
interface INumbersLineContextProps {
  type: LineRange;
  setType: (v: LineRange) => void;
  dragElement: IElement[];
  setDragElement: (v: IElement[]) => void;
  coverSituation: TypeCover;
  setCoverSituation: (v: TypeCover) => void;
  disVisitAble: TypeCover;
  setDisVisitAble: (v: TypeCover) => void;
}

export const NumbersLineContext = React.createContext({
  type: {} as LineRange,
  setType: () => null,
  dragElement: {} as IElement[],
  setDragElement: () => null,
  coverSituation: {} as TypeCover,
  setCoverSituation: () => null,
  disVisitAble: {} as TypeCover,
  setDisVisitAble: () => null,
} as INumbersLineContextProps);

export const NumbersLineContexProvider = (props: any) => {
  const [type, setType] = useState(LineRange.ten);
  const [dragElement, setDragElement] = useState<IElement[]>([]);
  const [coverSituation, setCoverSituation] = useState(TypeCover.allDiscover);
  const [disVisitAble, setDisVisitAble] = useState(TypeCover.allDiscover);
  const { saveData, getData } = useLocalStorage();

  useEffect(() => {
    setDragElement(getData("element"));
  }, []);

  useEffect(() => {
    dragElement.length > 0 && saveData("element", dragElement);
  }, [dragElement]);

  return (
    <NumbersLineContext.Provider
      value={{
        type,
        setType,
        dragElement,
        setDragElement,
        coverSituation,
        setCoverSituation,
        disVisitAble,
        setDisVisitAble,
      }}
    >
      {props.children}
    </NumbersLineContext.Provider>
  );
};

export const useNumbersLineContext = () => React.useContext(NumbersLineContext);
