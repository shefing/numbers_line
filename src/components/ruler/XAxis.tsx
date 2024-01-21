import Arrows from "./Arrows";
import { useState } from "react";
import Numbers from "./Numbers";

interface IProps {
  labels: number[];
}
const XAxis = ({ labels }: IProps) => {
  const [startIndex, setStartIndex] = useState(0);

  return (
    <>
      {labels.length == 101 ? (
        <>
          <Arrows startIndex={startIndex} setStartIndex={setStartIndex} />
          <div className="stroke-3 stroke-var-black fixed left-0 right-0 flex justify-between border-t-2 border-gray-900 pt-0 mx-0 items-center pl-8 pr-8 ">
            <Numbers labels={labels} startIndex={startIndex} setStartIndex={setStartIndex} />
          </div>
        </>
      ) : (
        <div className="fixed left-0 right-0 flex justify-between border-t-2 border-gray-900 pt-0 mx-0 items-center pl-8 pr-8 ">
          <Numbers labels={labels} startIndex={startIndex} setStartIndex={setStartIndex} />
        </div>
      )}
    </>
  );
};

export default XAxis;
