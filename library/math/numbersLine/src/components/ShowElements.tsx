import { TypesElement } from "@/type/elements";
import Jump from "./Jump";
import { useNumbersLineContext } from "@/context/numbersLineContext";

const ShowElements = () => {
  const { dragElements, setIdDraggElementClick } = useNumbersLineContext();

  return dragElements.map((element) => (
    <div className="dragElement" key={element.id} onClick={() => setIdDraggElementClick(element.id)}>
      {element.type == TypesElement.jump && <Jump element={element} />}
    </div>
  ));
};
export default ShowElements;
