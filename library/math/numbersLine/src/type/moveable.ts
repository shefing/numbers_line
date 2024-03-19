import { ActionTypes, Colors, NaviKeniIconsTypes } from "./toolbar-Menu";
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
  rulerType: LineRange;
  leftPosition: number;
  rulerPaddingSides: number;
  calculatScreenWidth: () => number;
}
