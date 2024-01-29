
import { IElement } from "@/type/elements.js";
const useLocalStorage = () => {
  const saveData = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const getData = (key: string) => {
    let vals: IElement[] = [];
    let values = localStorage.getItem(key);
    vals = values ? JSON.parse(values) : vals;
    return vals;
  };

  return {
    saveData,
    getData,
  };
};
export default useLocalStorage;