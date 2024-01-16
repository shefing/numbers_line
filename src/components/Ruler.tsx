import "../App.css";

const Ruler = ({}) => {
  // const xAxisData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // return axis(d3.scaleLinear()).ticks(10).render();
  const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="flex justify-between border-t-2 border-gray-200 pt-2">
      {labels.map((label, index) => (
        <div key={index} className="text-sm text-gray-500">
          <div className="h-2 border-l-2 border-gray-200"></div>
          {label}
        </div>
      ))}
    </div>
  );
};

export default Ruler;
