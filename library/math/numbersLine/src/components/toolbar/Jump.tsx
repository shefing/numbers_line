import { calculationJumpWidth } from "@/lib/utils";
import jumpArrowPlus from "/assets/icons/jumpArrowPlus.svg";

const Jump = () => {
  return (
    <div className="flex flex-col">
      <img className="" src={jumpArrowPlus} alt="triple for menu" />
      <div className={`bg-[#009FDE] bg-opacity-85 w-[${calculationJumpWidth}px] h-[40px] rounded-[1px] `}></div>
    </div>
  );
};

export default Jump;
