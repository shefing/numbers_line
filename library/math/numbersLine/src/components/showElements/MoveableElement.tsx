import { useNumbersLineContext } from "../../context/numbersLineContext";
import Moveable, { OnDragEnd, OnResize, OnResizeEnd } from "react-moveable";
import { IElement } from "../../type/moveable";
import { calcXTransform, calcYTransform } from "../../lib/utils";
import { rulerMargin, ToolbarHeight, buttonsDraggElementWidth, jumpBaseHeight, jumpHeight } from "../../consts/elementConsts";
import { calcPosition } from "../../lib/utils";
import { ButtonViewable } from "../../consts/ButtonViewable";
import { useDraggableElementAction } from "../../hooks/useDraggableElementAction";
import { useHelpers } from "../../hooks/useHelpers";
import { ActionTypes, WritingSituation } from "../../type/toolbar";

interface IProps {
  moveableRef: any;
  element: IElement;
  unit: number;
  dragging?: boolean;
  setDragging?: (v: boolean) => void;
}
const MoveableElement = ({ moveableRef, element, unit, dragging, setDragging }: IProps) => {
  const { windowSize, rulerType, rulerPaddingSides, leftPosition, idDraggElementClick, setIdDraggElementClick, color } = useNumbersLineContext();
  const { deleteDragElement, duplicateDragJump, updateDragElements, updateDragElementsLayers } = useDraggableElementAction();
  const { calculatScreenWidth, calculatUnitsAmount } = useHelpers();

  const ableProps = {
    ButtonViewable: true,
    deleteViewAble: idDraggElementClick === element.id && !dragging,
    onDeleteClick: () => deleteDragElement(element.id),
    copyViewAble: element.type === ActionTypes.jump && idDraggElementClick === element.id,
    onCopyClick: () => duplicateDragJump(element, unit),
    underRuler: element.jump?.underRuler,
    minus: element.jump?.minus,
    rulerType: rulerType,
    leftPosition: leftPosition,
    rulerPaddingSides: rulerPaddingSides,
    calculatScreenWidth: () => calculatScreenWidth(),
  };

  const updateXLocation = (e: any) => {
    const unitsAmount = calculatUnitsAmount();
    const unitPresent = element.type == ActionTypes.jump ? unit : unit / 2;
    const xPosition = calcXTransform(e.target.style.transform);
    const IconsFootLength = element.icons ? unit * element.icons.widthRelatively * element.icons.footWidthRelatively : 0;
    const elementWidth = element.icons ? unit * element.icons.widthRelatively : unit * element.jump!.value;
    // few pixels for the precise position of the element, the calculation is done relative to the position on the axis.
    const sidesPixels = element.type == ActionTypes.jump ? (unitsAmount / 2 - Math.round(xPosition - rulerPaddingSides) / unitPresent) / unitsAmount : 0;
    let newXPosition = Math.round((xPosition + IconsFootLength - rulerPaddingSides) / unitPresent) * unitPresent + rulerPaddingSides - IconsFootLength + sidesPixels;
    if (newXPosition + elementWidth > windowSize.width) newXPosition -= unitPresent;
    if (newXPosition < 0) newXPosition += unitPresent;
    e.target.style.transform = e.target.style.transform.replace("(" + xPosition, "(" + newXPosition);
  };

  const onDragStart = () => {
    updateDragElementsLayers(element);
    if (element.type == ActionTypes.text) setDragging!(true);
  };

  const onDragEnd = (e: OnDragEnd) => {
    if (element.type == ActionTypes.text) {
      updateDragElements(element.id, { ...element, transform: e.target.style.transform });
      setDragging!(false);
      setIdDraggElementClick("");
      return;
    }
    const yTransform = calcYTransform(e.target.style.transform);
    const rulerPosition = windowSize.height * (1 - rulerMargin);
    let elementPsition = calcPosition(yTransform, element, unit);
    // Change the position of the element relative to the integers, provided that the position is close to the axis.
    if (Math.abs(rulerPosition - elementPsition) < 50) updateXLocation(e);
    // Change the type of jump if its position has changed relative to the ruler.
    if (!element?.jump) {
      updateDragElements(element.id, { ...element, transform: e.target.style.transform });
      return;
    }
    let isUnderRuler = element.jump.underRuler;
    if (element.jump.underRuler != rulerPosition < elementPsition) {
      let newYPositionString = "";
      if (rulerPosition < elementPsition) {
        isUnderRuler = true;
        newYPositionString = Math.round(yTransform + jumpHeight - jumpBaseHeight) + "px)";
      } else {
        isUnderRuler = false;
        newYPositionString = Math.round(yTransform - jumpHeight + jumpBaseHeight) + "px)";
      }
      e.target.style.transform = e.target.style.transform.replace(yTransform + "px)", newYPositionString);
    }
    updateDragElements(element.id, { ...element, transform: e.target.style.transform, jump: { ...element.jump, underRuler: isUnderRuler } });
  };

  const onResize = (e: OnResize) => {
    //not use direction   use position !
    if (!element.jump) return;
    // e.target.style.width = `${e.width}px`;
    const rightDirection = e.direction[0] == 1;
    const xPosition = calcXTransform(e.target.style.transform);
    const newWidth = rightDirection ? e.clientX - xPosition : element.jump.width + xPosition - e.clientX; //check
    if (!(newWidth < 0) && ((rightDirection && element.jump.minus) || (!rightDirection && !element.jump.minus)) && newWidth <= unit) return;
    // rightDirection ? console.log("right", e.width, e) : console.log("left", e.width, e.direction);
    console.log(rightDirection ? "right\n" : "left\n", " e.clientX:", e.clientX, " xPosition: ", xPosition, "e.width: ", e.width, " newWidth ", newWidth);

    if (e.width == 0) {
      e.target.style.width = `${1}px`;
      rightDirection && (e.target.style.transform = e.target.style.transform.replace("(" + xPosition, "(" + e.clientX));
    } else {
      if ((rightDirection && e.clientX - xPosition < 0) || (!rightDirection && e.clientX - xPosition > 0)) {
        console.log("scale!");
        rightDirection ? (e.target.style.width = `${e.width + xPosition - e.clientX}px`) : (e.target.style.width = `${e.clientX - xPosition}px`);
        rightDirection && (e.target.style.transform = e.target.style.transform.replace("(" + xPosition, "(" + e.clientX));
      } else {
        // e.target.style.width = `${e.width}px`;
        // e.target.style.transform = e.drag.transform;
      }
      e.target.style.width = `${e.width}px`;
      e.target.style.transform = e.drag.transform;
    }
    updateDragElements(element.id, {
      ...element,
      transform: e.target.style.transform,
      jump: { ...element.jump, width: newWidth < 0 ? -newWidth : e.width, minus: newWidth < 0 ? (rightDirection ? true : false) : element.jump.minus },
    }); //in tje end and add transtion
    // console.log("elelemnt: ", element.jump.minus);
    // console.log("minus: ", newWidth < 0, "widths: ", newWidth, e.width);

    // updateDragElements(element.id, { ...element, jump: { ...element.jump, width: e.width } });
  };

  const onResizeEnd = (e: OnResizeEnd) => {
    if (!element.jump || !e.lastEvent) return;
    // Changes the width of the jump according to the axis.
    const newValue = Math.round(element.jump.width / unit);
    const newWidth = newValue * unit;
    e.target.style.width = `${newWidth}px`;
    const xPosition = calcXTransform(e.target.style.transform);
    //Change position when jump out of range.
    if (xPosition + newWidth > windowSize.width - rulerPaddingSides) {
      const range = xPosition + newWidth - windowSize.width + rulerPaddingSides;
      const newXPosition = "(" + (xPosition - range);
      e.target.style.transform = e.target.style.transform.replace("(" + xPosition, newXPosition);
    }
    //Change position when jump reSize on the left.
    let newTransform = e.target.style.transform;
    const rightDirection = e.lastEvent.direction[0] == 1;
    if (!rightDirection) {
      const range = element.jump.width - newWidth;
      const newXPosition = "(" + (xPosition + range);
      newTransform = e.target.style.transform.replace("(" + xPosition, newXPosition);
      e.target.style.transform = newTransform;
    }
    updateDragElements(element.id, { ...element, transform: newTransform, jump: { ...element.jump, width: newWidth, value: newValue } });
  };
  // const onScale = (e: OnScale) => {
  //   if (!element.jump) return;
  //   //width:
  //   const rightDirection = e.direction[0] == 1;
  //   const xPosition = calcXTransform(e.target.style.transform);
  //   const endPosition = xPosition + element.jump.width;
  //   let newWidth = element.jump.width;
  //   rightDirection ? (newWidth += e.clientX - endPosition) : (newWidth += xPosition - e.clientX); //check
  //   e.target.style.width = `${newWidth}px`;
  //   updateDragElements(element.id, { ...element, jump: { ...element.jump!, width: newWidth } }); //in tje end and add transtion
  //   //position:
  //   const scaleMatch = e.drag.transform.match(/scale\(([^)]+)\)/);
  //   const scaleString = scaleMatch ? scaleMatch[0] : "";
  //   if (!rightDirection) {
  //     //do it only if dragg from left
  //     console.log("before", e.target.style.transform);
  //     let transform = e.drag.transform.replace(scaleString, "");
  //     e.target.style.transform = transform.replace("(" + xPosition, "(" + e.clientX);
  //     // e.target.style.transform = e.target.style.transform.replace("(" + xPosition, "(" + newXPosition);
  //     console.log("after", e.target.style.transform);
  //   }
  //   //change jumo to minus:
  //   if (newWidth < 0 && rightDirection) {
  //     e.target.style.width = `${-newWidth}px`;
  //     e.target.style.transform = e.drag.transform.replace(scaleString, "") + "scale(-1,1)"; //nicere
  //   }
  // };
  // e.target.style.transform = e.target.style.transform.replace("(" + xPosition, newXPosition + "");
  return (
    <Moveable
      target={moveableRef}
      ables={[ButtonViewable]}
      props={ableProps || false}
      draggable={element.type != ActionTypes.text && color.description == WritingSituation.non}
      edgeDraggable={element.type == ActionTypes.text && idDraggElementClick === element.id}
      onDragStart={onDragStart}
      onDrag={(e) => (e.target.style.transform = e.transform)}
      onDragEnd={(e) => onDragEnd(e)}
      resizable={element.jump}
      // onResizeStart={(e) => e.setMin([unit])}
      renderDirections={idDraggElementClick === element.id && ["w", "e"]}
      onResize={(e) => onResize(e)}
      onResizeEnd={(e) => onResizeEnd(e)}
      // scalable={element.jump}
      // onScale={(e) => onScale(e)}
      snappable={true}
      bounds={{
        left: element.jump ? rulerPaddingSides : 1,
        top: ToolbarHeight + buttonsDraggElementWidth,
        right: element.jump ? rulerPaddingSides : 1,
        bottom: element.jump ? (element.jump.underRuler ? buttonsDraggElementWidth : jumpHeight - jumpBaseHeight + buttonsDraggElementWidth) : 1,
        position: "css",
      }}
    />
  );
};

export default MoveableElement;
