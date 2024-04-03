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
  const moveableRef = useRef<any>(null);
  const textInput = useRef<any>();

  useEffect(() => {
    const closeKeyboard = (event: any) => {
      moveableRef.current.contains(event.target) ? setInputFocused(true) : setInputFocused(false);
    };
    document.addEventListener("mousedown", closeKeyboard);
    return () => {
      document.removeEventListener("mousedown", closeKeyboard);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      console.log("ok!", event.key);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    inputFocused ? textInput.current?.focus() : textInput.current?.blur();
  }, [inputFocused]);

  const updateValue = (v: string) => {
    if (!element.text) return;
    updateDragElementsLayers(element);
    setIdDraggElementClick("");
    if (v === "⌫") {
      textInput.current.value = textInput.current.value.substring(0, textInput.current.selectionStart - 1) + textInput.current.value.substring(textInput.current.selectionStart);
      // textInput.current.focus();
      // textInput.current.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "Backspace" }));
    } else {
      textInput.current.value = textInput.current.value.substring(0, textInput.current.selectionStart) + v + textInput.current.value.substring(textInput.current.selectionStart);
      //textInput.current.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: v }));
    }
    textInput.current.style.height = textInput.current.scrollHeight + "px";
  };

  const onChangeKB = (button: string, event: any) => {
    if (event.which && event.which == 3) {
      event.preventDefault();
      return;
    }
    event.target.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: button }));
    updateValue(button == "⏎" ? "\n" : button);
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
          //value={element.text?.value}
          autoFocus
          //onKeyDown={onChange}
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
            onKeyPress={(input, event) => onChangeKB(input, event)}
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
