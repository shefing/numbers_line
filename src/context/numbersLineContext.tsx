import React, { useEffect, useState } from "react";
import { LineRange } from "../type/Line";
import { IElement, TypeCover, TypeShowNumber } from "@/type/elements";
import useLocalStorage from "@/hooks/useElement";
interface INumbersLineContextProps {
  type: LineRange;
  setType: (v: LineRange) => void;
  dragElement: IElement[];
  setDragElement: (v: IElement[]) => void;
  isCover: TypeCover;
  setIsCover: (v: TypeCover) => void;
  isCoverAll: TypeCover;
  setIsCoverAll: (v: TypeCover) => void;
  numbersShow: TypeShowNumber;
  setNumbersShow: (v: TypeShowNumber) => void;
}

export const NumbersLineContext = React.createContext({
  type: {} as LineRange,
  setType: () => null,
  dragElement: {} as IElement[],
  setDragElement: () => null,
  isCover: {} as TypeCover,
  setIsCover: () => null,
  isCoverAll: {} as TypeCover,
  setIsCoverAll: () => null,
  numbersShow: {} as TypeShowNumber,
  setNumbersShow: () => null,
} as INumbersLineContextProps);

export const NumbersLineContexProvider = (props: any) => {
  const [type, setType] = useState(LineRange.ten);
  const [dragElement, setDragElement] = useState<IElement[]>([]);
  const [isCover, setIsCover] = useState(TypeCover.nothing);
  const [isCoverAll, setIsCoverAll] = useState(TypeCover.discover);
  const [numbersShow, setNumbersShow] = useState(TypeShowNumber.allShow);
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
        isCover,
        setIsCover,
        isCoverAll,
        setIsCoverAll,
        numbersShow,
        setNumbersShow,
      }}
    >
      {props.children}
    </NumbersLineContext.Provider>
  );
};

export const useNumbersLineContext = () => React.useContext(NumbersLineContext);
