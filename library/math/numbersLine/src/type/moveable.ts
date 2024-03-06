import { ActionTypes, NaviKeniIconsTypes } from "./elements";
import { LineRange } from "./ruler";

export interface IElement {
  id: string;
  type: ActionTypes;
  jump?: IJump;
  icons?: IIcons;
  transform: string;
  width: number;
}

export interface IJump {
  value: number;
  underRuler: boolean;
}
export interface IIcons {
  type: NaviKeniIconsTypes;
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
