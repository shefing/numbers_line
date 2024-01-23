export enum LineRange {
  ten = 11,
  twenty = 21,
  hundred = 101,
  hundredCircular = 100,
}
export const fontButtonClassName:string = "bg-white text-block m-[0.5rem] ml-[1rem] mr-[1rem] hover:bg-sky-100 transition rounded-[20px] font-[Abraham] text-[24px] font-[400] h-[48px]"
export type RulerItem = {
  value: number;
  isMainLine: boolean;
};