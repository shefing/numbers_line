import { IElement } from "../../type/moveable";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import MoveableElement from "./MoveableElement";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { useDraggableElementAction } from "../../hooks/useDraggableElementAction";
import { dragElementID } from "../../consts/elementConsts";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

interface IProps {
  element: IElement;
}

const Text = ({ element }: IProps) => {
  const { idDraggElementClick, setIdDraggElementClick } = useNumbersLineContext();
  const { deleteDragElement, updateDragElements, updateDragElementsLayers } = useDraggableElementAction();
  const [dragging, setDragging] = useState(false);
  const [inputFocused, setInputFocused] = useState(true);
  const [value, setValue] = useState("");
  const moveableRef = useRef<any>(null);
  const textInput = useRef<any>(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      moveableRef.current.contains(event.target) ? setInputFocused(true) : setInputFocused(false);
      moveableRef.current.contains(event.target) ? console.log("ture") : console.log("false");
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    inputFocused ? textInput.current?.focus() : textInput.current?.blur();
  }, [inputFocused]);

  useEffect(() => {
    updateDragElements(element.id, { ...element, text: { value } });
    autoheight();
  }, [value]);

  const autoheight = () => {
    textInput.current.style.height = "5px";
    textInput.current.style.height = textInput.current.scrollHeight + "px";
  };

  const onchange = (e: any) => {
    updateDragElementsLayers(element);
    setIdDraggElementClick("");

    if (e.key === "Backspace" || e.key === "Delete") {
      setValue(value.slice(0, -1));
    } else if (e.key === "Enter") {
      setValue(value + "\n");
    } else {
      setValue(value + e.key);
    }
  };

  const onChangeKB = (button: any) => {
    updateDragElementsLayers(element);
    setIdDraggElementClick("");
    if (button === "{bksp}") {
      setValue(value.slice(0, -1));
    } else if (button === "{enter}") {
      setValue(value + "\n");
    } else {
      setValue(value + button);
    }
  };

  const onBlur = (e: { target: { value: string } }) => {
    // setTimeout(() => {
    //   if (inputFocused) setInputFocused(false);
    // }, 300);
    textInput.current?.focus();
    !e.target.value.length && deleteDragElement(element.id);
  };
  return (
    <>
      <div
        id={`dragElement-keyboardCET-${element.id}`}
        ref={moveableRef}
        className={`drag-element ${inputFocused ? "flex-col bg-white rounded-[6px] border border-[#009FDE] p-2 " : ""}`}
        style={{
          transform: element.transform,
          zIndex: element.zIndex,
        }}
      >
        <textarea
          ref={textInput}
          id={`dragElement-${element.id}`}
          value={element.text?.value}
          autoFocus
          onKeyDown={onchange}
          onBlur={onBlur}
          className={`text-box max-h-50${dragging && "outline-none border-[1.5px] border-[#009FDE]"}`}
          style={{
            zIndex: element.zIndex,
            resize: "none",
            overflow: "auto",
          }}
          //onFocus={() => setInputFocused(true)}
        />
        {inputFocused && (
          <Keyboard
            id="keyboardCET"
            layoutName="default"
            layout={{
              default: ["7 8 9 - = {bksp}", "4 5 6 + < >", "1 2 3 x <= >=", ", 0 . / {enter}"],
            }}
            onKeyPress={(input) => onChangeKB(input)}
          />
        )}
      </div>
      {idDraggElementClick == element.id && (
        <div id={`${dragElementID}-text`}>
          <MoveableElement moveableRef={moveableRef} element={element} unit={0} dragging={dragging} setDragging={setDragging} />
        </div>
      )}
    </>
  );
};
export default Text;
