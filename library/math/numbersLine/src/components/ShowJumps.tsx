import { TypesElement } from "@/type/elements";
import Jump from "./Jump";
import { useNumbersLineContext } from "@/context/numbersLineContext";
import { useState } from "react";

const ShowJumps = () => {
  const [idClick, setIdClick] = useState(-1);
  const { dragElements } = useNumbersLineContext();

  return dragElements.map(
    (element) =>
      element.type == TypesElement.jump && (
        <div key={element.id} onClick={() => setIdClick(element.id)}>
          <Jump element={element} idClick={idClick} />
        </div>
      )
  );
};
export default ShowJumps;
