import { TypesElement } from "@/type/elements";
import Jump from "./Jump";
import { useNumbersLineContext } from "@/context/numbersLineContext";
// import { useRef } from "react";

const ShowJumps = () => {
  const { dragElements, setIdDraggElementClick } = useNumbersLineContext();
  // const wrapperRef = useRef<HTMLDivElement>(null);

  return dragElements.map(
    (element) =>
      element.type == TypesElement.jump && (
        <div
          className="dragElement"
          key={element.id}
          onClick={() => {
            setIdDraggElementClick(element.id);
          }}
        >
          <Jump element={element} />
        </div>
      )
  );
};
export default ShowJumps;
