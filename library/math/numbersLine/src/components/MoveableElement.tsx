import Moveable, { OnScale } from "react-moveable";
interface IProps {
  targetRef: any;
  length: number;
}

const MoveableElement = ({ targetRef, length }: IProps) => {
  const updateTransform = (e: OnScale) => {
    if (length == 1 && e.direction[0] * e.drag.beforeTranslate[0] > 0) {
      e.target.style.transform = e.drag.transform;
    }
  };

  return (
    <Moveable
      target={targetRef}
      draggable={true}
      throttleDrag={1}
      edgeDraggable={false}
      startDragRotate={0}
      throttleDragRotate={0}
      onDrag={(e) => {
        e.target.style.transform = e.transform;
      }}
      scalable={true}
      renderDirections={["w", "e"]}
      onScale={(e) => {
        e.target.style.transform = e.drag.transform;
        updateTransform(e);
        console.log(e);
      }}
    />
  );
};

export default MoveableElement;
