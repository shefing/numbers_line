interface IProps {
  labels: number[];
}
const XAxis = ({ labels }: IProps) => {
  return (
    <>
      <div className="flex justify-between border-t-2 border-gray-900 pt-0 mx-0 pl-8 pr-8">
        {labels.map((label) => (
          <div key={label} className={`text-xl text-color flex flex-col items-center ${label % 5 == 0 && "font-bold"}`}>
            <div className="h-3 border-l-2 border-gray-900 w-px" />
            {label}
          </div>
        ))}
      </div>
    </>
  );
};

export default XAxis;
