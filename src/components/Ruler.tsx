import { useContext } from "react";
import XAxis from "./ruler/XAxis";
import KindLine, { LineRange } from "./context/kindNumberLine";
const Ruler = () => {
  const context = useContext(KindLine);
  if (!context) {
    return null;
  }
  const { kind, setKind } = context;

  var labels = [];
  if (kind == LineRange.hundredCircular) labels = Array.from({ length: 11 }, (_, index) => index * 10);
  else labels = Array.from({ length: kind }, (_, index) => index);

  return (
    <div className="absolute w-full bottom-[30%] left-0 right-0">
      <XAxis labels={labels} />
    </div>
  );
};

export default Ruler;
