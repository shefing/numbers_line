import urlImg from "/assets/icons/grass.png";

const GrassImg = () => {
  return (
    <div id="grass" className="w-full">
      <img src={urlImg} alt="Grass" className="absolute bottom-0 left-0 z-[-5]" />
    </div>
  );
};

export default GrassImg;
