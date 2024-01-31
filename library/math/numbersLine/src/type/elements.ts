 export interface IElement {
    type: TypesElement,
    value: string,
    transform: string,
  }

  export enum TypesElement {
    text = 'text', 
  }
export enum TypeCover {
  nothing = "nothing",
  partiallyCover = "partiallyCover",
  partiallyDiscover = "partiallyDiscover",
  allCover = "allCover",
  allDiscover = "allDiscover",
  randomly = "randomly", 
}

