import { LineRange } from "./ruler";

export interface IElement {
  id: string;
  type: TypesElement;
  value: number;
  transform: string;
  underRuler: boolean;
}

export enum TypesElement {
  text = "text",
  jump = "jump",
}
export interface IAbleProps {
  ButtonViewable: boolean;
  onDeleteClick: () => void;
  copyViewAble: boolean;
  onCopyClick: () => void;
  underRuler: boolean;
  typeRuler: LineRange;
  leftPosition: number;
  rulerPaddingSides: number;
}
