import { ActionTypes, Colors, NaviKeniIconsTypes } from "./elements";
import { LineRange } from "./ruler";

export interface IElement {
  id: string;
  type: ActionTypes;
  jump?: IJump;
  icons?: IIcons;
  writing?: ILine;
  transform: string;
}

export interface IJump {
  value: number;
  underRuler: boolean;
  width: number;
}
export interface IIcons {
  type: NaviKeniIconsTypes;
  widthRelatively: number;
  heightRelativelyWidth: number;
  footWidthRelatively: number;
}
export interface ILine {
  color: Colors;
  points: { x: number; y: number }[];
}
export interface IAbleProps {
  ButtonViewable: boolean;
  deleteViewAble: boolean;
  onDeleteClick: () => void;
  copyViewAble: boolean;
  onCopyClick: () => void;
  underRuler: boolean;
  typeRuler: LineRange;
  leftPosition: number;
  rulerPaddingSides: number;
  calculatScreenWidth: () => number;
}
