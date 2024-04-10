import { MoveableManagerInterface } from "react-moveable";
import deleteIcon from "/assets/icons/delete.svg";
import deleteIconHover from "/assets/icons/deleteHover.svg";
import duplicateIcon from "/assets/icons/duplicate.svg";
import duplicateIconHover from "/assets/icons/duplicateHover.svg";
import duplicateDisable from "/assets/icons/duplicateDisable.svg";
import { IAbleProps } from "../type/moveable";
import { LineRange } from "../type/ruler";
import { buttonsDraggElementWidth } from "./elementConsts";

export const ButtonViewable = {
  name: "ButtonViewable",
  props: ["ButtonViewable"],
  render(moveable: MoveableManagerInterface) {
    const { deleteViewAble, onDeleteClick, copyViewAble, onCopyClick, underRuler, minus, rulerType, leftPosition, rulerPaddingSides, calculatScreenWidth } =
      moveable.props as unknown as IAbleProps;
    const { cssWidth, inlineTransform } = moveable.state;
    const matchX = inlineTransform.match(/\((.*?)px/);
    let copyApproval = true;
    if (matchX) {
      const xPosition = matchX[1];
      const endXPosition = parseFloat(xPosition) + cssWidth * 2;
      const outOfRange = minus ? parseInt(xPosition) - cssWidth : endXPosition - window.innerWidth + rulerPaddingSides - 10;
      //Checking if there is an option to copy in terms of space on the screen for the new jump
      if (!minus && outOfRange > 0 && (rulerType != LineRange.hundred || leftPosition - outOfRange < calculatScreenWidth())) copyApproval = false;
      if (minus && outOfRange < 0 && (rulerType != LineRange.hundred || leftPosition - outOfRange > 0)) copyApproval = false;
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
            <img src={deleteIcon} alt="Delete Icon" onMouseEnter={(e: any) => (e.target.src = deleteIconHover)} onMouseLeave={(e: any) => (e.target.src = deleteIcon)} />
          </div>
        )}
        {copyViewAble && (
          <div
            className={`m-[1px] cursor-pointer  ${!copyApproval && "pointer-events-none"}`}
            style={{ width: buttonsDraggElementWidth + "px" }}
            onClick={copyApproval ? onCopyClick : () => {}}
          >
            <img
              id="jump-copy"
              src={copyApproval ? duplicateIcon : duplicateDisable}
              alt="DuplicateIcon Icon"
              onMouseEnter={(e: any) => copyApproval && (e.target.src = duplicateIconHover)}
              onMouseLeave={(e: any) => copyApproval && (e.target.src = duplicateIcon)}
            />
          </div>
        )}
      </Icons>
    );
  },
} as const;
