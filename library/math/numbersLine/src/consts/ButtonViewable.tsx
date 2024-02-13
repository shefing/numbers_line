import { MoveableManagerInterface } from "react-moveable";
import deleteIcon from "/assets/icons/delete.svg";
import duplicateIcon from "/assets/icons/duplicate.svg";
import { IAbleProps } from "../type/moveable";

export const ButtonViewable = {
  name: "ButtonViewable",
  props: ["ButtonViewable"],
  render(moveable: MoveableManagerInterface) {
    const { onDeleteClick, onCopyClick, underRuler } = moveable.props as unknown as IAbleProps;

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
          <img src={deleteIcon} alt="Delete Icon" />
        </div>
        <div style={{ width: "30px", margin: "1px" }} onClick={onCopyClick}>
          <img src={duplicateIcon} alt="DuplicateIcon Icon" />
        </div>
      </Icons>
    );
  },
} as const;
