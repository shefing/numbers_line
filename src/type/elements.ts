 export interface IElement {
    type: TypesElement,
    value: string,
    transform: string,
  }

  export enum TypesElement {
    text = 'text', 
  }
export enum TypeCover {
  nothing = 0,
  partiallyCover = -1,
  partiallyDiscover = 1,
  allCover = -100,
  allDiscover = 100,
}
