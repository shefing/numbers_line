import { writingSituationList } from "../../consts/elementConsts";
import { IWritingSituation, WritingSituation } from "../../type/elements";
import { useNumbersLineContext } from "@/context/numbersLineContext";

interface IProps {
  setOpen: (val: boolean) => void;
  setWritingSituation: (val: WritingSituation) => void;
}
const BrushMenu = ({ setOpen, setWritingSituation }: IProps) => {
  const { setColor } = useNumbersLineContext();
  const onClickButtons = (item: IWritingSituation) => {
    setWritingSituation(item.type);
    setOpen(false);
    item.color ? setColor(item.color) : setColor("");
  };

  return (
    <>
      <div className={`flex flex-col mt-[-4rem] pt-[4rem] pb-2 relative z-0 rounded-3xl bg-[#009FDE] shadow-xl`}>
        {writingSituationList.map((item: IWritingSituation, i: number) => (
          <img key={i} className="m-1.5 mb-0 cursor-pointer" src={item.url} alt={item.type} onClick={() => onClickButtons(item)} />
        ))}
      </div>
    </>
  );
};
export default BrushMenu;
