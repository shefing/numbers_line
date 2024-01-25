import { RadiusIcon } from "lucide-react";
import { useState } from "react";

const Jump = () => {
  const [startNumber, setStartNumber] = useState(0);
  const [range, setRange] = useState(1);
  const inputNumbersClassName = "pl-4 m-[5%] h-[34px] w-[74px] rounded-[2px] font-[Abraham] text-[26px] font-[400] border border-solid border-black ";
  const textClassName = " m-[5%]";
  const lineClassName = "w-[241px] h-[1px] bg-[#7BC8EF]";
  return (
    <>
      <div className="flex flex-col shadow-2xl rounded-[4px] border border-solid border-[#009FDE] p-1">
        <div className="flex flex-row">
          <input
            className={inputNumbersClassName}
            type="number"
            value={startNumber}
            onChange={(e) => setStartNumber(Math.min(99, Math.max(0, parseInt(e.target.value, 10))))}
          />
          <div className={textClassName}>נקודת התחלה</div>
        </div>
        <div className={lineClassName}></div>
        <div className="flex flex-row">
          <input
            className={inputNumbersClassName}
            type="number"
            value={range}
            onChange={(e) => setRange(Math.min(21, Math.max(1, parseInt(e.target.value, 10))))}
          />
          <div className={textClassName}>נקודת התחלה</div>
        </div>
        <div className={lineClassName}></div>
        <div className="flex flex-col">
          <div>כיוון קפיצה</div>
          <div className="flex flex-row">
            <div>שמאלה</div>
            <div> ימינה</div>
          </div>
        </div>
        <div className={lineClassName}></div>
        <button>מקם קפיצה</button>
      </div>
    </>
  );
};

export default Jump;
