import {IElement} from "../../type/moveable";
import {useRef, useState} from "react";
import MoveableElement from "./MoveableElement";
import {useNumbersLineContext} from "../../context/numbersLineContext";
import {useDraggableElementAction} from "../../hooks/useDraggableElementAction";
import {dragElementID, maxTextBoxSize, textBoxSize} from "../../consts/elementConsts";
import {calcXTransform} from "../../lib/utils";
import DDKB from "./DDKB";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import {SvgIcon} from "./SvgIcon";
import x2 from "./icons/x2.svg";

interface IProps {
    element: IElement;
}

const Text = ({element}: IProps) => {
    const {windowSize, idDraggElementClick, setIdDraggElementClick} = useNumbersLineContext();
    const {deleteDragElement, updateDragElements, updateDragElementsLayers} = useDraggableElementAction();
    const [size, setSize] = useState(textBoxSize);
    const [dragging, setDragging] = useState(false);
    const moveableRef = useRef<any>(null);
    const keyboard = useRef();

    const updateValueAndSize = (e: any) => {
        updateDragElementsLayers(element);
        setIdDraggElementClick("");
        setSize(e.target.value.length > textBoxSize ? (e.target.value.length > maxTextBoxSize ? maxTextBoxSize : e.target.value.length) : textBoxSize);
        const inputWidth = e.target.offsetWidth;
        const startPosition = calcXTransform(element.transform);
        const endPosition = startPosition + inputWidth;
        const outOfRange = windowSize.width - endPosition;
        if (outOfRange < 0) {
            const newStartPosition = startPosition + outOfRange;
            const newTransform = element.transform.replace("(" + startPosition, "(" + newStartPosition);
            updateDragElements(element.id, {...element, transform: newTransform});
            e.target.style.transform = newTransform;
        }
        keyboard.current.setInput(input);
    };

    // const {cleanCanvasCounter, isDragElement} = useAssetContext();
    const onChangeKB = input => {
        moveableRef.current.value=input;
        console.log("Input changed", input);
    };

    const deleteIfEmpty = (e: { target: { value: string } }) => {
        !e.target.value.length && deleteDragElement(element.id);
    };
    return (
        <>
            <textarea
                ref={moveableRef}
                id={`dragElement-${element.id}`}
                type="text"
                size={size}
                onChange={updateValueAndSize}
                onBlur={deleteIfEmpty}
                className={`drag-element text-box ${dragging && "outline-none border-[1.5px] border-[#009FDE]"}`}
                autoFocus
                style={{
                    transform: element.transform,
                    zIndex: element.zIndex,
                }}
            />
            <div
                 className="bg-[#ECEFF2] flex direction-row-reverse absolute z-[9999999] p-[10px] rounded-[0.4em] mt-1">
                <SvgIcon
                    className="absolute w-[23.5px] h-[23.5px] -top-[10px] -right-[10px] rounded-full cursor-pointer bg-white shadow-md hover:bg-opacity-75 transition border border-transparent hover:border-solid hover:border-gray-300 shadow-sm "
                    icon={x2}
/*                    handleClick={() => setKeyboardVisibility(false)}*/
                />
                {(
            <Keyboard
                // ref={keyboard}
                keyboardRef={r => (keyboard.current = r)}
                layoutName="default"
                layout={{
                    default: ["q w e r t y u i o p", "a s d f g h j k l", "{shift} z x c v b n m {backspace}"],
                }}
                onChange={onChangeKB}
            />
                )}
            </div>

            {idDraggElementClick == element.id && (
                <div id={`${dragElementID}-text`}>
                    <MoveableElement moveableRef={moveableRef} element={element} unit={0} dragging={dragging}
                                     setDragging={setDragging}/>
                </div>
            )}
        </>
    );
};
export default Text;
