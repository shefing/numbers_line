import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const KeyboardCET = () => {
  return (
    <>
      <Keyboard
        layout={{
          default: ["q w e r t y u i o p", "a s d f g h j k l", "{shift} z x c v b n m {backspace}"],
        }}
        onChange={() => console.log("Keyboard input changed")}
        onKeyPress={() => console.log("Key pressed")}
        className="keyboard-container" // Add custom CSS class if needed
      />
    </>
  );
};
export default KeyboardCET;
