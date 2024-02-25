import Arrows from "./ruler/Arrows";
import XAxis from "./ruler/XAxis";
import { RulerMargin, RulerPadding } from "../consts/elementConsts";

const Ruler = () => {
  return (
    <div style={{ paddingBottom: RulerMargin - RulerPadding + "px" }}>
      <Arrows />
      <XAxis />
    </div>
  );
};

export default Ruler;
