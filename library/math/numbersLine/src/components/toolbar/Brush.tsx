import { writingSituationList } from "../../consts/elementConsts";
import { IWritingSituation, WritingSituation } from "../../type/elements";

interface IProps {
  setOpen: (val: boolean) => void;
  setWritingSituation: (val: WritingSituation) => void;
}
const Brush = ({ setOpen, setWritingSituation }: IProps) => {
  const onClickButtons = (type: WritingSituation) => {
    setWritingSituation(type);
    setOpen(false);
  };

  return (
    <div className={`flex flex-col mt-[-4rem] pt-[4rem] pb-2 relative z-0 rounded-3xl bg-[#009FDE] shadow-xl`}>
      {writingSituationList.map((item: IWritingSituation, i: number) => (
        <img key={i} className="m-1.5 mb-0 cursor-pointer" src={item.url} alt={item.type} onClick={() => onClickButtons(item.type)} />
      ))}
    </div>
  );
};
export default Brush;
