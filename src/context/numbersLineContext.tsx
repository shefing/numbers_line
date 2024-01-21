import React, { useState } from "react";
import { LineRange } from "../type/Line";

interface INumbersLineContextProps {
  kind: LineRange;
  setKind: (v: LineRange) => void;
}

export const NumbersLineContext = React.createContext({
  kind: {} as LineRange,
  setKind: () => null,
} as INumbersLineContextProps);

export const NumbersLineContexProvider = (props: any) => {
  const [kind, setKind] = useState(LineRange.ten);

  return (
    <NumbersLineContext.Provider
      value={{
        kind,
        setKind,
      }}
    >
      {props.children}
    </NumbersLineContext.Provider>
  );
};

export const useNumbersLineContext = () => React.useContext(NumbersLineContext);
