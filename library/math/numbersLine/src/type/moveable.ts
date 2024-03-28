import { ActionTypes, Colors, NaviKeniIconsTypes } from "./toolbar";
import { LineRange } from "./ruler";

export interface IElement {
  id: string;
  type: ActionTypes;
  jump?: IJump;
  icons?: IIcons;
  writing?: ILine;
  transform: string;
  zIndex: number;
}

export interface IJump {
  value: number;
  underRuler: boolean;
  width: number;
  minus: boolean;
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
  minus: boolean;
  rulerType: LineRange;
  leftPosition: number;
  rulerPaddingSides: number;
  calculatScreenWidth: () => number;
}
