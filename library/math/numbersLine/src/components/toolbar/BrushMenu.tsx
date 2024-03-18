import { writingSituationList } from "../../consts/elementConsts";
import { IWritingSituation } from "../../type/elements";
import { useNumbersLineContext } from "../../context/numbersLineContext";

interface IProps {
  setOpen: (val: boolean) => void;
}
const BrushMenu = ({ setOpen }: IProps) => {
  const { setColor } = useNumbersLineContext();

  const onClickButtons = (item: IWritingSituation) => {
    setOpen(false);
    setColor(item.type);
  };

  return (
    <div className={`flex flex-col mt-[-4rem] pt-[4rem] w-[50] h-[248] pb-2 relative z-0 rounded-3xl bg-[#009FDE] shadow-xl`}>
      {writingSituationList.map((item: IWritingSituation, i: number) => (
        <img key={i} className="m-1.5 mb-0 cursor-pointer" src={item.url} alt={item.type.description} onClick={() => onClickButtons(item)} />
      ))}
    </div>
  );
};
export default BrushMenu;
