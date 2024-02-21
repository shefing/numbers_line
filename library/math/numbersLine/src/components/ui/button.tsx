import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { blue1, blue2, gray1, lightBlye } from "@/consts/elementConsts";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "w-12 h-12 m-3 cursor-pointer rounded-full ",
        action: `h-[25px] w-[100px] px-4 py-4 ml-[2rem] mr-[2rem] bg-[${blue1}] hover:bg-[${blue2}] transition rounded-[20px] text-white text-[22px] font-[400] font-[Abraham] `,
        cancel: `h-[25px] w-[100px] px-4 py-4 ml-[2rem] mr-[2rem] bg-[${lightBlye}] hover:bg-[${blue2}] transition rounded-[20px] text-[${blue1}] text-[22px] font-[400] font-[Abraham] `,
        linedefinition: `h-[48px] px-4 py-2 m-[0.5rem] bg-white hover:bg-[${lightBlye}] transition rounded-[20px] text-[24px] font-[400] font-[Abraham] border border-solid border-[${blue1}]`,
        displayRulerNumber: `h-[33px] px-4 py-2 m-[0.5rem] ml-[1rem] mr-[1rem] hover:bg-[${lightBlye}] transition rounded-[20px] text-[26px] font-[400] font-[Abraham] border border-solid border-[${blue1}]] `,
      },
      isChoice: {
        true: ` bg-[${blue2}]  text-white`,
      },
      isVisitDisable: {
        true: ` bg-write text-block hover:bg-white text-[${gray1}] border-[${gray1}] pointer-events-none`,
      },
    },
    defaultVariants: {
      variant: "default",
      isChoice: false,
      isVisitDisable: false,
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, asChild = false, isChoice, isVisitDisable, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, isChoice, isVisitDisable, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
