import React, { useEffect, useState } from "react";
import { LineRange } from "../type/ruler";
import { IWindowSize, TypeCover } from "../type/elements";
import { IElement } from "../type/moveable";
import { RulerPaddingSides } from "@/consts/elementConsts";
interface INumbersLineContextProps {
  windowSize: IWindowSize;
  typeRuler: LineRange;
  setTypeRuler: (v: LineRange) => void;
  typeRulerChange: LineRange;
  setTypeRulerChange: (v: LineRange) => void;
  rulerPaddingSides: number;
  setRulerPaddingSides: (v: number) => void;
  leftPosition: number;
  setLeftPosition: React.Dispatch<React.SetStateAction<number>>;
  dragElements: IElement[];
  setDragElements: (v: IElement[]) => void;
  idDraggElementClick: string;
  setIdDraggElementClick: (v: string) => void;
  coverSituation: TypeCover;
  setCoverSituation: (v: TypeCover) => void;
  visitableDisplayButton: TypeCover;
  setVisitableDisplayButton: (v: TypeCover) => void;
  openRestartDialog: boolean;
  setOpenRestartDialog: (v: boolean) => void;
}

export const NumbersLineContext = React.createContext({
  windowSize: {} as IWindowSize,
  typeRuler: {} as LineRange,
  setTypeRuler: () => null,
  typeRulerChange: {} as LineRange,
  setTypeRulerChange: () => null,
  rulerPaddingSides: {} as number,
  setRulerPaddingSides: () => null,
  leftPosition: {} as number,
  setLeftPosition: () => null,
  dragElements: {} as IElement[],
  setDragElements: () => null,
  idDraggElementClick: {} as string,
  setIdDraggElementClick: () => null,
  coverSituation: {} as TypeCover,
  setCoverSituation: () => null,
  visitableDisplayButton: {} as TypeCover,
  setVisitableDisplayButton: () => null,
  openRestartDialog: {} as boolean,
  setOpenRestartDialog: () => null,
} as INumbersLineContextProps);

export const NumbersLineContexProvider = (props: any) => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({ height: window.innerHeight, width: window.innerWidth });
  const [rulerType, setRulerType] = useState(LineRange.ten);
  const [rulerTypeShould, setRulerTypeShould] = useState(LineRange.ten);
  const [leftPosition, setLeftPosition] = useState(0);
  const [dragElements, setDragElements] = useState<IElement[]>([]);
  const [idDraggElementClick, setIdDraggElementClick] = useState("");
  const [coverSituation, setCoverSituation] = useState(TypeCover.allDiscover);
  const [visitableDisplayButton, setVisitableDisplayButton] = useState(TypeCover.allDiscover);
  const [openRestartDialog, setOpenRestartDialog] = useState(false);
  const [rulerPaddingSides, setRulerPaddingSides] = useState(RulerPaddingSides);

  const Resize = () => {
    setWindowSize({ height: window.innerHeight, width: window.innerWidth });
    setIdDraggElementClick("");
  };

  useEffect(() => {
    window.addEventListener("resize", Resize);
    return () => {
      window.removeEventListener("resize", Resize);
    };
  }, []);

  return (
    <NumbersLineContext.Provider
      value={{
        windowSize,
        typeRuler: rulerType,
        setTypeRuler: setRulerType,
        typeRulerChange: rulerTypeShould,
        setTypeRulerChange: setRulerTypeShould,
        rulerPaddingSides,
        setRulerPaddingSides,
        leftPosition,
        setLeftPosition,
        dragElements,
        setDragElements,
        idDraggElementClick,
        setIdDraggElementClick,
        coverSituation,
        setCoverSituation,
        visitableDisplayButton,
        setVisitableDisplayButton,
        openRestartDialog,
        setOpenRestartDialog,
      }}
    >
      {props.children}
    </NumbersLineContext.Provider>
  );
};

export const useNumbersLineContext = () => React.useContext(NumbersLineContext);
