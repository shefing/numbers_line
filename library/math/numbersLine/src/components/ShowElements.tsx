import { IElement, TypesElement } from "../type/moveable";
import Jump from "./Jump";
import { useNumbersLineContext } from "../context/numbersLineContext";

const ShowElements = () => {
  const { dragElements, setIdDraggElementClick } = useNumbersLineContext();

  return dragElements.map((element: IElement) => (
    <div key={element.id} onClick={() => setIdDraggElementClick(element.id)}>
      {element.type == TypesElement.jump && <Jump element={element} />}
    </div>
  ));
};
export default ShowElements;
