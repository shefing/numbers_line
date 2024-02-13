import { MoveableManagerInterface } from "react-moveable";
import deleteIcon from "/assets/icons/delete.svg";
import duplicateIcon from "/assets/icons/duplicate.svg";
import deleteHoverIcon from "/assets/icons/deleteHover.svg";
import duplicateHoverIcon from "/assets/icons/duplicateHover.svg";
import { IAbleProps } from "../type/moveable";

export const ButtonViewable = {
  name: "ButtonViewable",
  props: ["ButtonViewable"],
  render(moveable: MoveableManagerInterface) {
    const { onDeleteClick, onCopyClick, underRuler, deleteHovered, setDeleteHovered, duplicateHovered, setDuplicateHovered } =
      moveable.props as unknown as IAbleProps;

    const { cssWidth } = moveable.state;

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
          cursor: "pointer",
        }}
      >
        <div style={{ width: "30px", margin: "1px" }} onClick={onDeleteClick}>
          <img
            src={deleteHovered ? deleteHoverIcon : deleteIcon}
            alt="Delete Icon"
            onMouseEnter={() => setDeleteHovered(true)}
            onMouseLeave={() => setDeleteHovered(false)}
          />
        </div>
        <div style={{ width: "30px", margin: "1px" }} onClick={onCopyClick}>
          <img
            src={duplicateHovered ? duplicateHoverIcon : duplicateIcon}
            alt="DuplicateIcon Icon"
            onMouseEnter={() => setDuplicateHovered(true)}
            onMouseLeave={() => setDuplicateHovered(false)}
          />
        </div>
      </Icons>
    );
  },
} as const;
