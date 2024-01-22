import LineDefinition from "./toolbar/LineDefinition";

const Toolbar = () => {
  return (
    <div className="flex justify-between absolute w-full top-0 left-0 h-[11%] bg-[#ECF9FF]">
      <div className="flex-none">{/* TODO: add butotns */}</div>
      <div className="flex ">{/* TODO: add butotns */}</div>
      <div className="flex-none">
        <LineDefinition />
      </div>
    </div>
  );
};
export default Toolbar;
