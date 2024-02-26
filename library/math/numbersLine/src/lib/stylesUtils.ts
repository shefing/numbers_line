import { baseJumpClassName } from "../styles/jump";

export const MatchBaseJumpClassName = (underRuler: boolean) => {
  return underRuler ? baseJumpClassName + " bg-[#F48460] mb-[1rem]" : baseJumpClassName + " bg-[#009FDE] mt-[1rem]";
};
