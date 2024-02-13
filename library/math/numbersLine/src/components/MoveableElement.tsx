import { useNumbersLineContext } from "../context/numbersLineContext";
import Moveable, { OnResize, OnResizeEnd } from "react-moveable";
import { IAbleProps, IElement } from "../type/moveable";
import { calculatRulerWidth } from "../lib/utils";
import { RulerMargin, RulerPadding } from "../consts/elementConsts";
import { calcJumpPosition } from "../lib/stylesUtils";
import { ButtonViewable } from "@/consts/ButtonViewable";
import { useAction } from "@/hooks/useHookAction";
import { useState } from "react";

interface IProps {
  moveableRef: any;
  element: IElement;
  unit: number;
  isJumpUnderRuler: boolean;
  setIsJumpUnderRuler: (v: boolean) => void;
}

const MoveableElement = ({ moveableRef, element, unit, isJumpUnderRuler, setIsJumpUnderRuler }: IProps) => {
  const { windowSize, dragElements, setDragElements } = useNumbersLineContext();
  const { deleteDragElement, duplicateDragElement } = useAction();
  const [deleteHovered, setDeleteHovered] = useState(false);
  const [duplicateHovered, setDuplicateHovered] = useState(false);

  const hideValueElement = () => {
    let newElements = dragElements.map((item: IElement) => (item.id === element.id ? { ...item, hideNumber: true } : item));
    setDragElements(newElements);
  };
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

  const updateJumpByYLocation = (e: any) => {
    const originalTransform = e.target.style.transform;
    const match = originalTransform.match(/,\s*(\d+)px\)/);
    const yTransform = match[1];
    const yTransformString = match[0];
    const bottonElementPsition = calcJumpPosition(yTransform, windowSize.height, isJumpUnderRuler); //e.clientY
    const grassElement = document.getElementById("grass");
    const rulerLocation = grassElement ? windowSize.height - RulerMargin - grassElement.clientHeight : windowSize.height - RulerMargin;

    if (isJumpUnderRuler != rulerLocation < bottonElementPsition) {
      const newYTransform = parseFloat(yTransform && yTransform);
      let newYTransformString = "";
      if (rulerLocation < bottonElementPsition) {
        setIsJumpUnderRuler(true);
        newYTransformString = ", " + Math.round(newYTransform + 80).toString() + "px)";
      } else {
        setIsJumpUnderRuler(false);
        newYTransformString = ", " + Math.round(newYTransform - 80).toString() + "px)";
      }
      e.target.style.transform = e.target.style.transform.replace(yTransformString, newYTransformString);
    }
  };
  const ableProps: IAbleProps = {
    ButtonViewable: true,
    onDeleteClick: () => deleteDragElement(element.id),
    deleteHovered: deleteHovered,
    setDeleteHovered: setDeleteHovered,
    onCopyClick: () => duplicateDragElement(element),
    underRuler: isJumpUnderRuler,
    duplicateHovered: duplicateHovered,
    setDuplicateHovered: setDuplicateHovered,
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
      onResizeStart={() => hideValueElement()}
      onResize={(e) => updateTransform(e)}
      onResizeEnd={(e) => changeElementValue(e)}
    />
  );
};

export default MoveableElement;
