import { MoveableManagerInterface } from "react-moveable";
import deleteIcon from "/assets/icons/delete.svg";
import duplicateIcon from "/assets/icons/duplicate.svg";
import duplicateDisable from "/assets/icons/duplicateDisable.svg";
import { IAbleProps } from "../type/moveable";
import { LineRange } from "../type/ruler";
import { buttonsDraggElementWidth } from "./elementConsts";

export const ButtonViewable = {
  name: "ButtonViewable",
  props: ["ButtonViewable"],
  render(moveable: MoveableManagerInterface) {
    const { deleteViewAble, onDeleteClick, copyViewAble, onCopyClick, underRuler, typeRuler, leftPosition, rulerPaddingSides, calculatScreenWidth } =
      moveable.props as unknown as IAbleProps;
    const { cssWidth, inlineTransform } = moveable.state;
    const matchX = inlineTransform.match(/\((.*?)px/);
    let copyApproval = true;
    if (matchX) {
      const xPosition = matchX[1];
      const endXPosition = parseFloat(xPosition) + cssWidth * 2;
      const outOfRange = underRuler ? parseInt(xPosition) - cssWidth : endXPosition - window.innerWidth + rulerPaddingSides - 10;
      //Checking if there is an option to copy in terms of space on the screen for the new jump
      if (!underRuler && outOfRange > 0 && (typeRuler != LineRange.hundred || leftPosition - outOfRange < calculatScreenWidth())) copyApproval = false;
      if (underRuler && outOfRange < 0 && (typeRuler != LineRange.hundred || leftPosition + outOfRange > 0)) copyApproval = false;
    }
    const Icons = moveable.useCSS(
      "div",
      `
    {
        will-change: transform;
        transform-origin: 0px 0px;
    }
    :host:before, :host:after {
        transform: translate(-50%, -50%);
    }
    :host:after {
        transform: translate(-50%, -50%);
    }
    `
    );
    const changeHover = (event: any, isdelete?: boolean) => {
      if (copyApproval || isdelete) {
        const url = isdelete ? deleteIcon : duplicateIcon;
        const dotIndex = url.indexOf(".");
        const beforeDot = url.substring(0, dotIndex);
        event.target.src = beforeDot + "Hover.svg";
      }
    };

    const backNotHover = (event: any, isdelete?: boolean) => {
      if (copyApproval || isdelete) {
        const url = isdelete ? deleteIcon : duplicateIcon;
        event.target.src = url;
      }
    };

    return (
      <Icons
        style={{
          display: "flex",
          justifyContent: "center",
          width: cssWidth,
          position: "absolute",
          top: `${underRuler ? 120 : -35}px`,
          // cursor: "pointer",
        }}
      >
        {deleteViewAble && (
          <div className="m-[1px] cursor-pointer" style={{ width: buttonsDraggElementWidth + "px" }} onClick={onDeleteClick}>
            <img src={deleteIcon} alt="Delete Icon" onMouseEnter={(e) => changeHover(e, true)} onMouseLeave={(e) => backNotHover(e, true)} />
          </div>
        )}
        {copyViewAble && (
          <div className="m-[1px] cursor-pointer" style={{ width: buttonsDraggElementWidth + "px" }} onClick={copyApproval ? onCopyClick : () => {}}>
            <img
              id="jump-copy"
              src={copyApproval ? duplicateIcon : duplicateDisable}
              alt="DuplicateIcon Icon"
              onMouseEnter={(e) => changeHover(e)}
              onMouseLeave={(e) => backNotHover(e)}
            />
          </div>
        )}
      </Icons>
    );
  },
} as const;
