import { useState } from "react";
import { useNumbersLineContext } from "../../context/numbersLineContext";

import { iconsNaviKani } from "../../consts/elementConsts";
import { IIconsNaviKani } from "../../type/elements";
import { getSrc } from "../../lib/utils";

const NaviKanyMenu = () => {
  const [urlHovered, setUrlHovered] = useState("");
  const {} = useNumbersLineContext();

  return (
    <div className="flex flex-col items-end pt-5 pb-2 rounded-md">
      {iconsNaviKani.map((item: IIconsNaviKani, i: number) => (
        <img
          key={i}
          className="m-3 cursor-pointer"
          src={getSrc(item.url, urlHovered == item.url)}
          alt={item.type}
          onMouseEnter={() => setUrlHovered(item.url)}
          onMouseLeave={() => setUrlHovered("")}
          // onClick={() => actionButtonClick()}
        />
      ))}
    </div>
  );
};
export default NaviKanyMenu;
