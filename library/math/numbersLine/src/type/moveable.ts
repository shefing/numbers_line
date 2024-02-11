export interface IElement {
    id: number,
    type: TypesElement,
    value: number,
    hideNumber: boolean,
  }

  export enum TypesElement {
    text = 'text', 
    jump = 'jump',
  }
