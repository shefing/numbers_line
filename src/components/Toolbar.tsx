import LineDefinition from "./toolbar/LineDefinition";

const Toolbar = () => {
  return (
    <div className="flex justify-between bg-sky-100 absolute w-full top-0 left-0 ">
      <div className="flex-none">{/* TODO: add butotns */}</div>
      <div className="flex ">{/* TODO: add butotns */}</div>
      <div className="flex-none">
        <LineDefinition />
      </div>
    </div>
  );
};
export default Toolbar;
