import Arrows from "./ruler/Arrows";
import XAxis from "./ruler/XAxis";
import { rulerLocation } from "../consts/elementConsts";

const Ruler = () => {
  return (
    <div style={{ position: "absolute", bottom: rulerLocation * 100 + "%", width: "100%" }}>
      <Arrows />
      <XAxis />
    </div>
  );
};

export default Ruler;
