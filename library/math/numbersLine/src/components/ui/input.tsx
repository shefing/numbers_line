import * as React from "react";

import { cn } from "@/lib/utils";
import { IElement } from "@/type/moveable";
import { useAction } from "@/hooks/useAction";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  element: IElement;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, element, value, ...props }, ref) => {
  const { updateDragElements } = useAction();

  const handleChange = (e: { target: { value: any } }) => {
    updateDragElements(element.id, { ...element, text: { ...element.text, data: e.target.value } });
  };
  return (
    <input
      type={type}
      value={element.text?.data}
      onChange={handleChange}
      className={cn(
        // "flex h-[50px] w-full bg-transparent px-2 text-xl",
        "flex h-[50px] w-full bg-transparent px-2 text-xl focus-visible:outline-none focus-visible:border-[1.5px] focus-visible:border-[#009FDE] ",
        // " border-[1.5px] border-[1.5px] border-[#009FDE] w-[315px]  text-right focus:outline-none focus:shadow-outline p-1  absolute",
        element.width && ` w-[${element.width}px]`,
        className
      )}
      ref={ref}
      {...props}
      autoFocus
    />
  );
});
Input.displayName = "Input";

export { Input };
