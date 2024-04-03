import { IElement } from "../../type/moveable";
import { useEffect, useRef, useState } from "react";
import MoveableElement from "./MoveableElement";
import { useNumbersLineContext } from "../../context/numbersLineContext";
import { useDraggableElementAction } from "../../hooks/useDraggableElementAction";
import { dragElementID, keboardDifferentlButton, keboardLayers, keboardNormalButtons } from "../../consts/elementConsts";
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
  const [cursorPosition, setCursorPosition] = useState(0);
  const moveableRef = useRef<any>(null);
  const textInput = useRef<any>(null);

  useEffect(() => {
    document.addEventListener("mousedown", closeKeyboard);
    textInput.current.addEventListener("click", updateCursorPosition);
    return () => {
      document.removeEventListener("mousedown", closeKeyboard);
      textInput.current.removeEventListener("click", updateCursorPosition);
    };
  }, []);
  useEffect(() => {
    inputFocused ? textInput.current?.focus() : textInput.current?.blur();
  }, [inputFocused]);
  useEffect(() => {
    updateDragElements(element.id, { ...element, text: { value } });
  }, [value]);

  const closeKeyboard = (event: any) => {
    moveableRef.current.contains(event.target) ? setInputFocused(true) : setInputFocused(false);
  };

  const updateCursorPosition = () => {
    setCursorPosition(textInput.current.selectionStart);
  };

  const autoheight = () => {
    textInput.current.style.height = textInput.current.scrollHeight + "px";
  };

  const updateValue = (v: string) => {
    if (!element.text) return;
    updateCursorPosition();
    updateDragElementsLayers(element);
    setIdDraggElementClick("");
    if (v === "Backspace" || v === "Delete" || v === "⌫") {
      console.log("cursorPosition", cursorPosition);
      console.log("first", element.text.value.substring(0, cursorPosition - 1), "secound", element.text.value.substring(cursorPosition));
      const newValue = element.text.value.substring(0, cursorPosition - 1) + element.text.value.substring(cursorPosition);
      setValue(newValue);
      setCursorPosition(cursorPosition - 1);
    } else if (v === "Enter" || v == "⏎") {
      setValue(value + "\n");
    } else {
      setValue(value + v);
    }
    autoheight();
  };

  const onKeyDown = (e: any) => {
    if (keboardLayers.some((item) => item.includes(e.key)) || e.key === "Backspace" || e.key === "Delete" || e.key === "Enter") updateValue(e.key);
  };

  const onKeyPress = (button: string, event: any) => {
    if (event.which && event.which == 3) {
      event.preventDefault();
      return;
    }
    updateValue(button);
  };

  const onBlur = (e: { target: { value: string } }) => {
    textInput.current?.focus();
    !e.target.value.length && !inputFocused && deleteDragElement(element.id);
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
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          className={`text-box max-h-50${dragging && "outline-none border-[1.5px] border-[#009FDE]"}`}
          style={{
            zIndex: element.zIndex,
            resize: "none",
            overflow: "auto",
          }}
        />
        {inputFocused && (
          <Keyboard
            id="keyboardCET"
            layoutName="default"
            onKeyPress={(input, event) => onKeyPress(input, event)}
            layout={{
              default: keboardLayers,
            }}
            theme={"hg-theme-default hg-layout-default keyboard-background"}
            buttonTheme={[
              {
                class: "keyboard-buttons keyboard-buttons-enter",
                buttons: keboardDifferentlButton,
              },
              {
                class: "keyboard-buttons",
                buttons: keboardNormalButtons,
              },
            ]}
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
