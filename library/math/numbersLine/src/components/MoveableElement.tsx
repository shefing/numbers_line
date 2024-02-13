import { useNumbersLineContext } from "../context/numbersLineContext";
import Moveable, { OnResize, OnResizeEnd } from "react-moveable";
import { IAbleProps, IElement } from "../type/moveable";
import { calculatRulerWidth } from "../lib/utils";
import { RulerMargin, RulerPadding, ToolbarHieght } from "../consts/elementConsts";
import { calcJumpPosition } from "../lib/stylesUtils";
import { ButtonViewable } from "@/consts/ButtonViewable";
import { useAction } from "@/hooks/useActionHook";

interface IProps {
  moveableRef: any;
  element: IElement;
  unit: number;
  isJumpUnderRuler: boolean;
  setIsJumpUnderRuler: (v: boolean) => void;
}

const MoveableElement = ({ moveableRef, element, unit, isJumpUnderRuler, setIsJumpUnderRuler }: IProps) => {
  const { windowSize, dragElements, setDragElements } = useNumbersLineContext();
  const { deleteDragElement, duplicateDragJump } = useAction();

  const changeElementValue = (e: OnResizeEnd) => {
    let newValue = Math.round(e.lastEvent.width / unit);
    let newElements = dragElements.map((item: IElement) => (item.id === element.id ? { ...item, value: newValue } : item));
    setDragElements(newElements);
    e.target.style.width = `${newValue * unit}px`;
  };

  const updateTransform = (e: OnResize) => {
    if (
      !(parseFloat(e.target.style.width) / unit < 1 && e.dist[0] < 0) &&
      !(parseFloat(e.target.style.width) > calculatRulerWidth(windowSize.width, RulerPadding) && e.dist[0] > 0)
    ) {
      e.target.style.width = `${e.width}px`;
      e.target.style.transform = e.drag.transform;
    }
  };

  const updateJumpByYLocation = (e: OnResizeEnd) => {
    const match = e.target.style.transform.match(/,\s*(\d+)px\)/);
    if (match) {
      const yTransform = parseFloat(match[1]);
      const yTransformString = match[0];
      const bottonElementPsition = calcJumpPosition(yTransform, windowSize.height, isJumpUnderRuler);
      const grassElement = document.getElementById("grass");
      const rulerPosition = grassElement ? windowSize.height - RulerMargin - grassElement.clientHeight : windowSize.height - RulerMargin;

      if (isJumpUnderRuler != rulerPosition < bottonElementPsition) {
        let newYTransformString = "";
        if (rulerPosition < bottonElementPsition) {
          setIsJumpUnderRuler(true);
          newYTransformString = ", " + Math.round(yTransform + 80).toString() + "px)";
        } else {
          setIsJumpUnderRuler(false);
          newYTransformString = ", " + Math.round(yTransform - 80).toString() + "px)";
        }
        e.target.style.transform = e.target.style.transform.replace(yTransformString, newYTransformString);
      }
    }
  };
  const ableProps: IAbleProps = {
    ButtonViewable: true,
    onDeleteClick: () => deleteDragElement(element.id),
    onCopyClick: () => duplicateDragJump(element),
    underRuler: isJumpUnderRuler,
  };

  return (
    <Moveable
      target={moveableRef}
      ables={[ButtonViewable]}
      props={ableProps || false}
      draggable={true}
      onDrag={(e) => {
        e.target.style.transform = e.transform;
      }}
      onDragEnd={(e) => updateJumpByYLocation(e)}
      resizable={true}
      renderDirections={["w", "e"]}
      onResize={(e) => updateTransform(e)}
      onResizeEnd={(e) => changeElementValue(e)}
      snappable={true}
      bounds={{ left: RulerPadding, top: ToolbarHieght + 32, right: RulerPadding, bottom: 32, position: "css" }}
    />
  );
};

export default MoveableElement;
