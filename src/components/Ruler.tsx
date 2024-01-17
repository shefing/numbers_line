import XAxis from "./ruler/XAxis";
const Ruler = () => {
  const labels = Array.from({ length: 11 }, (_, index) => index);
  return (
    <div className="absolute w-full bottom-[20%] left-0">
      <XAxis labels={labels} />
    </div>
  );
};

export default Ruler;
