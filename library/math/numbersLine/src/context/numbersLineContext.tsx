import React, { useEffect, useState } from "react";
import { LineRange } from "../type/ruler";
import { IWindowSize, TypeCover } from "../type/elements";
import { IElement } from "../type/moveable";
import { calculatScreenWidth } from "@/lib/utils";
interface INumbersLineContextProps {
  windowSize: IWindowSize;
  typeRuler: LineRange;
  setTypeRuler: (v: LineRange) => void;
  leftPosition: number;
  setLeftPosition: (v: number) => void;
  setLeftPositionValid: (v: number) => void;
  dragElements: IElement[];
  setDragElements: (v: IElement[]) => void;
  idDraggElementClick: string;
  setIdDraggElementClick: (v: string) => void;
  coverSituation: TypeCover;
  setCoverSituation: (v: TypeCover) => void;
  visitableDisplayButton: TypeCover;
  setVisitableDisplayButton: (v: TypeCover) => void;
}

export const NumbersLineContext = React.createContext({
  windowSize: {} as IWindowSize,
  typeRuler: {} as LineRange,
  setTypeRuler: () => null,
  leftPosition: {} as number,
  setLeftPosition: () => null,
  setLeftPositionValid: () => null,
  dragElements: {} as IElement[],
  setDragElements: () => null,
  idDraggElementClick: {} as string,
  setIdDraggElementClick: () => null,
  coverSituation: {} as TypeCover,
  setCoverSituation: () => null,
  visitableDisplayButton: {} as TypeCover,
  setVisitableDisplayButton: () => null,
} as INumbersLineContextProps);

export const NumbersLineContexProvider = (props: any) => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({ height: window.innerHeight, width: window.innerWidth });
  const [typeRuler, setTypeRuler] = useState(LineRange.ten);
  const [leftPosition, setLeftPosition] = useState(0);
  const setLeftPositionValid = (v: number) => setLeftPosition((prevLeft: number) => Math.max(calculatScreenWidth(windowSize.width), Math.min(0, prevLeft + v)));
  const [dragElements, setDragElements] = useState<IElement[]>([]);
  const [idDraggElementClick, setIdDraggElementClick] = useState("");
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
    setLeftPosition(0);
  }, [typeRuler]);

  return (
    <NumbersLineContext.Provider
      value={{
        windowSize,
        typeRuler,
        setTypeRuler,
        leftPosition,
        setLeftPosition,
        setLeftPositionValid,
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
