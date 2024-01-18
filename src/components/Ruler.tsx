import XAxis from "./ruler/XAxis";
const Ruler = () => {
  const labels = Array.from({ length: 101 }, (_, index) => index);
  return (
    <div className="absolute w-full bottom-[30%] left-0 right-0">
      <XAxis labels={labels} />
    </div>
  );
};

export default Ruler;
