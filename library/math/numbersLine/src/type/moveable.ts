import { ActionTypes } from "./elements";
import { LineRange } from "./ruler";

export interface IElement {
  id: string;
  type: ActionTypes;
  jump?: IJump;
  transform: string;
}

export interface IJump {
  value: number;
  underRuler: boolean;
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
  calculatScreenWidth: () => number;
}
