 export interface IElement {
    type: TypesElement,
    value: string,
    transform: string,
  }

  export enum TypesElement {
    text = 'text', 
  }
export enum TypeCover {
  cover = -1,
  discover = 1,
  nothing = 0
}

export enum TypeShowNumber {
  allShow = 1,
  nothingSHow = -1,
  partially = 0
}
