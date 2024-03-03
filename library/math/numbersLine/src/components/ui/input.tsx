import * as React from "react";

import { cn } from "../../lib/utils";
import { IElement } from "../../type/moveable";
import { textHeight } from "../../consts/elementConsts";
import { useAction } from "../../hooks/useAction";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  element: IElement;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, element, value, ...props }, ref) => {
  const [size, setSize] = React.useState(25);
  const { deleteDragElement, updateDragElements } = useAction();

  const updateValueAndSize = (e: any) => {
    setSize(e.target.value.length > 25 ? (e.target.value.length > 50 ? 50 : e.target.value.length) : 25);
    console.log(e.target.width);

    updateDragElements(element.id, { ...element, text: { ...element.text, data: e.target.value } });
  };

  const deleteIfEmpty = (e: { target: { value: string } }) => {
    console.log("here");

    if (e.target.value == "") {
      deleteDragElement(element.id);
      console.log("delete");
    }
  };

  return (
    <>
      <input
        type={type}
        value={element.text?.data}
        size={size}
        onChange={updateValueAndSize}
        onBlur={deleteIfEmpty}
        className={cn(
          "flex bg-transparent px-2 text-xl focus-visible:outline-none focus-visible:border-[1.5px] focus-visible:border-[#009FDE] ",
          element.width && ` h-[${textHeight}px]`,
          className
        )}
        ref={ref}
        {...props}
        autoFocus
      />
    </>
  );
});
Input.displayName = "Input";

export { Input };
