interface IProps {
  icon: string;
  handleClick?: () => void;
  className?: string;
}

export const SvgIcon = ({ icon, handleClick, className }: IProps) => {
  return (
    <div onClick={handleClick} className={className + " cursor-pointer"}>
      <img src={icon} />
    </div>
  );
};
