import React, { useEffect, useState } from "react";
import { LineRange } from "../type/Line";
import { IElement, TypeCover } from "../type/elements";
interface INumbersLineContextProps {
  windowWidth: number;
  setWindowWidth: (v: number) => void;
  type: LineRange;
  setType: (v: LineRange) => void;
  dragElements: IElement[];
  setDragElements: (v: IElement[]) => void;
  idDraggElementClick: number;
  setIdDraggElementClick: (v: number) => void;
  coverSituation: TypeCover;
  setCoverSituation: (v: TypeCover) => void;
  visitableDisplayButton: TypeCover;
  setVisitableDisplayButton: (v: TypeCover) => void;
  RulerPadding: number;
}

export const NumbersLineContext = React.createContext({
  windowWidth: {} as number,
  setWindowWidth: () => null,
  type: {} as LineRange,
  setType: () => null,
  dragElements: {} as IElement[],
  setDragElements: () => null,
  idDraggElementClick: {} as number,
  setIdDraggElementClick: () => null,
  coverSituation: {} as TypeCover,
  setCoverSituation: () => null,
  visitableDisplayButton: {} as TypeCover,
  setVisitableDisplayButton: () => null,
  RulerPadding: {} as number,
} as INumbersLineContextProps);

export const NumbersLineContexProvider = (props: any) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [type, setType] = useState(LineRange.ten);
  const [dragElements, setDragElements] = useState<IElement[]>([]);
  const [idDraggElementClick, setIdDraggElementClick] = useState(-1);
  const [coverSituation, setCoverSituation] = useState(TypeCover.allDiscover);
  const [visitableDisplayButton, setVisitableDisplayButton] = useState(TypeCover.allDiscover);
  const RulerPadding = 32;

  const ResizeWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", ResizeWidth);

    return () => {
      window.removeEventListener("resize", ResizeWidth);
    };
  }, []);

  useEffect(() => {
    setDragElements([]);
    setCoverSituation(TypeCover.allDiscover);
  }, [type]);

  return (
    <NumbersLineContext.Provider
      value={{
        windowWidth,
        setWindowWidth,
        type,
        setType,
        dragElements,
        setDragElements,
        idDraggElementClick,
        setIdDraggElementClick,
        coverSituation,
        setCoverSituation,
        visitableDisplayButton,
        setVisitableDisplayButton,
        RulerPadding,
      }}
    >
      {props.children}
    </NumbersLineContext.Provider>
  );
};

export const useNumbersLineContext = () => React.useContext(NumbersLineContext);
