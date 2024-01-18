import { createContext, ReactNode, Dispatch, SetStateAction, useState } from "react";

export enum LineRange {
  ten = 11,
  twenty = 21,
  hundred = 101,
  hundredCircular = 10,
}

const KindLine = createContext<{ kind: LineRange; setKind: Dispatch<SetStateAction<LineRange>> } | undefined>({
  kind: LineRange.ten,
  setKind: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

function Provider({ children }: ProviderProps) {
  const [kind, setKind] = useState(LineRange.ten);

  const kindShare = {
    kind,
    setKind,
  };

  return <KindLine.Provider value={kindShare}>{children}</KindLine.Provider>;
}

export { Provider };
export default KindLine;
