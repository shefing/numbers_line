import { Smile } from "lucide-react";
import LineDefinition from "./toolbar/LineDefinition";

const Toolbar = () => {
  return (
    <div className="flex justify-between bg-sky-100">
      <div className="flex-none">
        <Smile className="m-4 h-4 w-4" />
      </div>
      <div className="flex ">
        <Smile className="m-4 h-4 w-4" />
        <Smile className="m-4 h-4 w-4" />
        <Smile className="m-4 h-4 w-4" />
        <Smile className="m-4 h-4 w-4" />
        <Smile className="m-4 h-4 w-4" />
        <Smile className="m-4 h-4 w-4" />
      </div>
      <div className="flex-none">
        <LineDefinition />
      </div>
    </div>
  );
};
export default Toolbar;
