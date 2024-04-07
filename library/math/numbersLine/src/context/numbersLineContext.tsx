import React, { useEffect, useState } from "react";
import { LineRange } from "../type/ruler";
import { Colors, IColor, IWindowSize, TypeCover, WritingSituation } from "../type/toolbar";
import { IElement } from "../type/moveable";
import { RulerPaddingSides } from "@/consts/elementConsts";
import i18n from "../i18n";
import { ILanguage } from "../type/language";

const params = new URLSearchParams(location.search);
let locale = params.get("locale") || (window as any).locale;
if (locale) i18n.changeLanguage(locale);
if (!locale) {
  locale = ILanguage.HE;
}
interface INumbersLineContextProps {
  language: ILanguage;
  windowSize: IWindowSize;
  rulerType: LineRange;
  setrulerType: (v: LineRange) => void;
  rulerTypeShould: LineRange;
  setrulerTypeShould: (v: LineRange) => void;
  rulerPaddingSides: number;
  setRulerPaddingSides: (v: number) => void;
  leftPosition: number;
  setLeftPosition: React.Dispatch<React.SetStateAction<number>>;
  dragElements: IElement[];
  setDragElements: (v: IElement[]) => void;
  idDraggElementClick: string;
  setIdDraggElementClick: (v: string) => void;
  duplicateElementSpace: number;
  setDuplicateElementSpace: React.Dispatch<React.SetStateAction<number>>;
  coverSituation: TypeCover;
  setCoverSituation: (v: TypeCover) => void;
  visitableDisplayButton: TypeCover;
  setVisitableDisplayButton: (v: TypeCover) => void;
  openRestartDialog: boolean;
  setOpenRestartDialog: (v: boolean) => void;
  color: IColor;
  setColor: (v: IColor) => void;
  zIndexCounter: number;
  setZIndexCounter: React.Dispatch<React.SetStateAction<number>>;
}

export const NumbersLineContext = React.createContext({
  language: locale,
  windowSize: {} as IWindowSize,
  rulerType: {} as LineRange,
  setrulerType: () => null,
  rulerTypeShould: {} as LineRange,
  setrulerTypeShould: () => null,
  rulerPaddingSides: {} as number,
  setRulerPaddingSides: () => null,
  leftPosition: {} as number,
  setLeftPosition: () => null,
  dragElements: {} as IElement[],
  setDragElements: () => null,
  idDraggElementClick: {} as string,
  setIdDraggElementClick: () => null,
  duplicateElementSpace: {} as number,
  setDuplicateElementSpace: () => null,
  coverSituation: {} as TypeCover,
  setCoverSituation: () => null,
  visitableDisplayButton: {} as TypeCover,
  setVisitableDisplayButton: () => null,
  openRestartDialog: {} as boolean,
  setOpenRestartDialog: () => null,
  color: {} as IColor,
  setColor: () => null,
  zIndexCounter: {} as number,
  setZIndexCounter: () => null,
} as INumbersLineContextProps);

export const NumbersLineContexProvider = (props: any) => {
  const [language] = useState<ILanguage>(locale as ILanguage);
  const [windowSize, setWindowSize] = useState<IWindowSize>({ height: window.innerHeight, width: window.innerWidth });
  const [rulerType, setRulerType] = useState(LineRange.ten);
  const [rulerTypeShould, setRulerTypeShould] = useState(LineRange.ten);
  const [leftPosition, setLeftPosition] = useState(0);
  const [dragElements, setDragElements] = useState<IElement[]>([]);
  const [idDraggElementClick, setIdDraggElementClick] = useState("");
  const [duplicateElementSpace, setDuplicateElementSpace] = useState(0);
  const [coverSituation, setCoverSituation] = useState(TypeCover.allDiscover);
  const [visitableDisplayButton, setVisitableDisplayButton] = useState(TypeCover.allDiscover);
  const [openRestartDialog, setOpenRestartDialog] = useState(false);
  const [rulerPaddingSides, setRulerPaddingSides] = useState(RulerPaddingSides);
  const [color, setColor] = useState<IColor>({ description: WritingSituation.non, url: Colors.non });
  const [zIndexCounter, setZIndexCounter] = useState(1);

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
        language,
        windowSize,
        rulerType,
        setrulerType: setRulerType,
        rulerTypeShould,
        setrulerTypeShould: setRulerTypeShould,
        rulerPaddingSides,
        setRulerPaddingSides,
        leftPosition,
        setLeftPosition,
        dragElements,
        setDragElements,
        idDraggElementClick,
        setIdDraggElementClick,
        duplicateElementSpace,
        setDuplicateElementSpace,
        coverSituation,
        setCoverSituation,
        visitableDisplayButton,
        setVisitableDisplayButton,
        openRestartDialog,
        setOpenRestartDialog,
        color,
        setColor,
        zIndexCounter,
        setZIndexCounter,
      }}
    >
      {props.children}
    </NumbersLineContext.Provider>
  );
};

export const useNumbersLineContext = () => React.useContext(NumbersLineContext);
