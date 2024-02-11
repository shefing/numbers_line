import React, { useEffect, useState } from "react";
import { LineRange } from "../type/line";
import { IWindowSize, TypeCover } from "../type/elements";
import { IElement } from "../type/moveable";
interface INumbersLineContextProps {
  windowSize: IWindowSize;
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
}

export const NumbersLineContext = React.createContext({
  windowSize: {} as IWindowSize,
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
} as INumbersLineContextProps);

export const NumbersLineContexProvider = (props: any) => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({ height: window.innerHeight, width: window.innerWidth });
  const [type, setType] = useState(LineRange.ten);
  const [dragElements, setDragElements] = useState<IElement[]>([]);
  const [idDraggElementClick, setIdDraggElementClick] = useState(-1);
  const [coverSituation, setCoverSituation] = useState(TypeCover.allDiscover);
  const [visitableDisplayButton, setVisitableDisplayButton] = useState(TypeCover.allDiscover);

  const Resize = () => {
    setWindowSize({ height: window.innerHeight, width: window.innerWidth });
  };
  useEffect(() => {
    window.addEventListener("resize", Resize);

    return () => {
      window.removeEventListener("resize", Resize);
    };
  }, []);

  useEffect(() => {
    setDragElements([]);
    setCoverSituation(TypeCover.allDiscover);
  }, [type]);

  return (
    <NumbersLineContext.Provider
      value={{
        windowSize,
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
      }}
    >
      {props.children}
    </NumbersLineContext.Provider>
  );
};

export const useNumbersLineContext = () => React.useContext(NumbersLineContext);
