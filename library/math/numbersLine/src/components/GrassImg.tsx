import { grassHeight } from "@/consts/elementConsts";
import urlImg from "/assets/icons/grass.png";

const GrassImg = () => {
  return (
    <div id="grass" className="w-full" style={{ height: grassHeight }}>
      <img src={urlImg} alt="Grass" className="absolute bottom-0 left-0 z-[-5]" />
    </div>
  );
};

export default GrassImg;
