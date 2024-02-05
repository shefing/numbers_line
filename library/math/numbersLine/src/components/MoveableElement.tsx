import { useNumbersLineContext } from "../context/numbersLineContext";
import Moveable, { OnResize, OnResizeEnd } from "react-moveable";
import { IElement } from "../type/elements";
interface IProps {
  targetRef: any;
  element: IElement;
  unit: number;
}

const MoveableElement = ({ targetRef, element, unit }: IProps) => {
  const { windowWidth, dragElements, setDragElements } = useNumbersLineContext();

  const hideValueElement = () => {
    let newelements = dragElements.map((item: IElement) => (item.id === element.id ? { ...item, hideNumber: true } : item));
    setDragElements(newelements);
  };
  const changeElementValue = (e: OnResizeEnd) => {
    let newValue = Math.round(e.lastEvent.width / unit);
    let newelements = dragElements.map((item: IElement) => (item.id === element.id ? { ...item, value: newValue } : item));
    setDragElements(newelements);
    e.target.style.width = `${newValue * unit}px`;
  };

  const updateTransform = (e: OnResize) => {
    if (!(parseFloat(e.target.style.width) / unit < 1 && e.dist[0] < 0) && !(parseFloat(e.target.style.width) > windowWidth - 4 * 16 && e.dist[0] > 0)) {
      e.target.style.width = `${e.width}px`;
      e.target.style.transform = e.drag.transform;
    }
  };

  return (
    <Moveable
      target={targetRef}
      draggable={true}
      onDrag={(e) => {
        e.target.style.transform = e.transform;
      }}
      resizable={true}
      renderDirections={["w", "e"]}
      onResizeStart={() => hideValueElement()}
      onResize={(e) => updateTransform(e)}
      onResizeEnd={(e) => changeElementValue(e)}
    />
  );
};

export default MoveableElement;
