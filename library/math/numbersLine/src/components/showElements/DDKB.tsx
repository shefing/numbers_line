import {useEffect, useRef, useState} from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import {SvgIcon} from "./SvgIcon";
import x2 from "./icons/x2.svg";

interface IProps {
    maxLength?: number;
    closeOnKeyPress?: boolean;
    layout?: string[];
    inputStyle?: any;
    moveableProps?: any;
}

const DDKB = ({
                        maxLength,
                        closeOnKeyPress = false,
                        layout,
                        inputStyle,
                        moveableProps,
                    }: IProps) => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [keyboardVisibility, setKeyboardVisibility] = useState(true);
    const inputTextBox = useRef<HTMLTextAreaElement>(null);
    const keyboard:any = useRef();

    const keyboardRef = useRef<HTMLDivElement>(null);
    // const {cleanCanvasCounter, isDragElement} = useAssetContext();
    const onChange = input => {
        setInput(input);
        console.log("Input changed", input);
    };

    const onChangeInput = event => {
        const input = event.target.value;
        setInput(input);
        keyboard.current.setInput(input);
    };
    useEffect(() => {
        if (moveableProps)
            inputTextBox.current?.focus()
    }, []);

    // useEffect(() => {
    //     if (isDragElement) {
    //         setKeyboardVisibility(false);
    //     }
    // }, [isDragElement]);

    const cleanValue = () => {
        inputTextBox?.current && (inputTextBox.current.value = "");
        setInput("");
    };

    useEffect(() => {
        const clickHandler = (e: MouseEvent) => {
            if (!inputTextBox.current?.contains(e.target as Node) && (!keyboardRef.current?.contains(e.target as Node) || closeOnKeyPress)) {
                setKeyboardVisibility(false);
            } else {
                setKeyboardVisibility(true);
            }
        };
        const tabHandler = (e: KeyboardEvent) => {
            if (e.key === "Tab") {
                setKeyboardVisibility(false);
            }
        };

        window.addEventListener("click", clickHandler);
        window.addEventListener("keydown", tabHandler);

        return () => {
            inputTextBox.current && setInput(inputTextBox.current.value);
            window.removeEventListener("click", clickHandler);
            window.removeEventListener("keydown", tabHandler);
        };
    }, []);

    useEffect(() => {
        if (moveableProps?.checked) {
            setKeyboardVisibility(true);
        }
    }, [])
    return (
        <div className="h-full w-full">
            <textarea
                value={input}
                ref={inputTextBox}
                onChange={onChangeInput}
                className=" my-class h-full flex flex-1 items-center content-editable overflow-hidden"
                style={{
                    ...inputStyle,
                    justifyContent: inputStyle?.textAlign ?? "center",
                    paddingLeft: inputStyle?.textAlign == "left" && "4px",
                    paddingRight: inputStyle?.textAlign == "right" && "4px",
                    // cursor: isDragElement ? "grabbing" : "auto"
                }}
                // onFocus={getCursorHeight}
            />

            {true && (
                <div ref={keyboardRef}
                     className="bg-[#ECEFF2] flex direction-row-reverse absolute z-[9999999] p-[10px] rounded-[0.4em] mt-1">
                    <SvgIcon
                        className="absolute w-[23.5px] h-[23.5px] -top-[10px] -right-[10px] rounded-full cursor-pointer bg-white shadow-md hover:bg-opacity-75 transition border border-transparent hover:border-solid hover:border-gray-300 shadow-sm "
                        icon={x2}
                        handleClick={() => setKeyboardVisibility(false)}
                    />
                    {(
                        <Keyboard
                            ref={keyboard}
                            layoutName="default"
                            layout={{
                                default: ["q w e r t y u i o p", "a s d f g h j k l", "{shift} z x c v b n m {backspace}"],
                            }}
                            onChange={onChange}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default DDKB;
