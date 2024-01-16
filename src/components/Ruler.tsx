import XAxis from "./ruler/XAxis";
const Ruler = () => {
  const labels = Array.from({ length: 21 }, (_, index) => index);
  return (
    <div>
      {" "}
      <XAxis labels={labels} />
    </div>
  );
};

export default Ruler;
// enum
