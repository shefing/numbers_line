import { TypesElement } from "@/type/elements";
import Jump from "./Jump";
import { useNumbersLineContext } from "@/context/numbersLineContext";
import { useEffect, useRef, useState } from "react";

const ShowJumps = () => {
  const [idClick, setIdClick] = useState(-1);
  const { dragElements } = useNumbersLineContext();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIdClick(-1);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [idClick]);

  return dragElements.map(
    (element) =>
      element.type == TypesElement.jump && (
        <div ref={wrapperRef} key={element.id} onClick={() => setIdClick(element.id)}>
          <Jump element={element} idClick={idClick} />
        </div>
      )
  );
};
export default ShowJumps;
