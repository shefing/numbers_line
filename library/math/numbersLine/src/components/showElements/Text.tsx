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
  const { deleteDragElement, updateDragElementsLayers } = useDraggableElementAction();
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
    inputFocused ? textInput.current?.focus() : textInput.current?.blur();
  }, [inputFocused]);

  const updateValue = (v: string) => {
    onChange();
    let startIndex = textInput.current.selectionStart;
    const endIndex = textInput.current.selectionEnd;
    if (v === "⌫") {
      if (startIndex == endIndex) startIndex -= 1;
      textInput.current.value = textInput.current.value.substring(0, startIndex) + textInput.current.value.substring(endIndex);
    } else {
      textInput.current.value = textInput.current.value.substring(0, startIndex) + v + textInput.current.value.substring(endIndex);
      startIndex += 1;
    }
    textInput.current.setSelectionRange(startIndex, startIndex);
  };

  const onKeyPress = (button: string, event: any) => {
    if (event.which && event.which == 3) {
      event.preventDefault();
      return;
    }
    updateValue(button == "⏎" ? "\n" : button);
  };

  const onChange = () => {
    updateDragElementsLayers(element);
    setIdDraggElementClick("");
    textInput.current.style.height = textInput.current.scrollHeight + "px";
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
          autoFocus
          onChange={onChange}
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
