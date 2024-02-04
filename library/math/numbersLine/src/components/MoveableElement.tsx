import Moveable from "react-moveable";

interface IProps {
  targetRef: any;
}

const MoveableElement = ({ targetRef }: IProps) => {
  return (
    <Moveable
      className="bg-red"
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
      }}
    />
  );
};

export default MoveableElement;
// cursor-move
